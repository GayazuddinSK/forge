// Configuration
const GAS_URL = "https://script.google.com/macros/s/AKfycbybueIUmUX1R0DmHbuHxrp7R6Zmw-y3MIWnFYM1VDh3Di4ZBk1WzlvSkdELkPu5Uhk/exec"; 

// Local State
let currentUser = null;
let tasks = [];
let consistencyChart = null;

// DOM Elements
const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userGreeting = document.getElementById('user-greeting');
const currentDateDisplay = document.getElementById('current-date-display');
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksContainer = document.getElementById('tasks-container');
const maxStreakStat = document.getElementById('global-streak');
const completionRateStat = document.getElementById('global-consistency');
const chartCtx = document.getElementById('consistency-chart');
const themeBtn = document.getElementById('theme-btn');

// Theme Management
const themes = ['dark', 'light', 'uv'];
let currentTheme = localStorage.getItem('consistency_theme') || 'dark';

function applyTheme(t) {
    currentTheme = t;
    localStorage.setItem('consistency_theme', t);
    document.documentElement.setAttribute('data-theme', t);
    
    // Icon
    if (t === 'light') themeBtn.textContent = '☀️';
    else if (t === 'uv') themeBtn.textContent = '👓';
    else themeBtn.textContent = '🌙';

    // Rerender chart with new text colors
    if (consistencyChart) {
        consistencyChart.destroy();
        consistencyChart = null;
        updateDashboardMetrics();
    }
}

// Utils
const getTodayStr = () => new Date().toISOString().split('T')[0];
const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
};
const getPastDays = (numDays) => {
    const days = [];
    for (let i = numDays - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split('T')[0]);
    }
    return days;
};
const generateId = () => 'task_' + Math.random().toString(36).substr(2, 9);

// Init
function init() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString(undefined, options).toUpperCase();

    applyTheme(currentTheme);
    
    themeBtn.addEventListener('click', () => {
        const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
        applyTheme(themes[nextIdx]);
    });

    const savedUser = localStorage.getItem('consistency_username');
    if (savedUser) handleLogin(savedUser);

    loginBtn.addEventListener('click', () => {
        const val = usernameInput.value.trim();
        if (val) handleLogin(val);
    });
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });

    logoutBtn.addEventListener('click', handleLogout);

    addTaskBtn.addEventListener('click', () => {
        const val = newTaskInput.value.trim();
        if (val) handleAddTask(val);
    });
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTaskBtn.click();
    });
}

// Logic: Login
function handleLogin(username) {
    currentUser = username;
    localStorage.setItem('consistency_username', username);
    userGreeting.textContent = username.toUpperCase();
    
    loadTasks();
    processPastDueTasks();
    renderTasks();
    updateDashboardMetrics();
    
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
}

// Logic: Logout
function handleLogout() {
    currentUser = null;
    tasks = [];
    localStorage.removeItem('consistency_username');
    usernameInput.value = '';
    
    if (consistencyChart) consistencyChart.destroy();
    
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
}

// Logic: Tasks
function loadTasks() {
    const raw = localStorage.getItem(`consistency_tasks_${currentUser}`);
    tasks = raw ? JSON.parse(raw) : [];
}

function saveTasks() {
    localStorage.setItem(`consistency_tasks_${currentUser}`, JSON.stringify(tasks));
}

function processPastDueTasks() {
    const today = getTodayStr();
    let mutated = false;

    tasks.forEach(t => {
        if (!t.history) t.history = {}; // data migration constraint

        if (t.currentDate < today) {
            mutated = true;
            if (t.status === 'Pending') {
                t.history[t.currentDate] = 'Missed'; // Auto-mark missed
                t.currentDate = today;
            } else {
                t.currentDate = today;
                t.status = 'Pending';
            }
        }
    });

    if (mutated) saveTasks();
}

function handleAddTask(name) {
    const newTask = {
        id: generateId(),
        name: name,
        currentDate: getTodayStr(),
        status: 'Pending',
        streak: 0,
        lastCompletedDate: null,
        history: {}
    };
    tasks.unshift(newTask);
    saveTasks();
    newTaskInput.value = '';
    renderTasks();
    updateDashboardMetrics();
    pushToGoogleSheets(newTask);
}

function handleDeleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateDashboardMetrics();
}

function handleTaskAction(id, actionStr) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    if (t.status !== 'Pending') return; 

    const today = getTodayStr();
    const yesterday = getYesterdayStr();

    if (actionStr === 'Done') {
        if (t.lastCompletedDate === yesterday) t.streak += 1;
        else t.streak = 1;
        
        t.status = 'Done';
        t.lastCompletedDate = today;
        t.history[today] = 'Done';
    } else if (actionStr === 'Not Done') {
        t.status = 'Not Done';
        t.streak = 0;
        t.history[today] = 'Not Done';
    }

    saveTasks();
    
    // Quick DOM update
    const taskEl = document.getElementById(t.id);
    if (taskEl) {
        taskEl.className = `task-item status-${actionStr}`;
        const badge = taskEl.querySelector('.streak-badge');
        if (badge) badge.textContent = `⚡ RANK ${t.streak}`;
    }
    
    updateDashboardMetrics();
    pushToGoogleSheets(t);
}

function renderTasks() {
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = `<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1;">No protocols active. Add a new objective above.</p>`;
        return;
    }

    const past7 = getPastDays(7).reverse(); // oldest to newest for tracker
    
    tasks.forEach(t => {
        let dotsHTML = '<div class="history-dots">';
        past7.forEach(date => {
            const status = (t.history && t.history[date]) ? t.history[date] : 'None';
            let dotClass = '';
            if (status === 'Done') dotClass = 'dot-done';
            if (status === 'Not Done' || status === 'Missed') dotClass = 'dot-missed';
            dotsHTML += `<div class="history-dot ${dotClass}" title="${date}: ${status}"></div>`;
        });
        dotsHTML += '</div>';

        const div = document.createElement('div');
        div.className = `task-item status-${t.status}`;
        div.id = t.id;
        
        div.innerHTML = `
            <div class="task-info">
                <div class="task-name">${t.name}</div>
                <div class="task-meta">
                    <span class="streak-badge">⚡ RANK ${t.streak}</span>
                </div>
                ${dotsHTML}
            </div>
            <div class="task-actions">
                <button class="action-btn done-btn" title="Complete" ${t.status!=='Pending'?'disabled':''}>✅</button>
                <button class="action-btn notdone-btn" title="Skip" ${t.status!=='Pending'?'disabled':''}>❌</button>
                <button class="action-btn delete-btn" title="Delete">🗑️</button>
            </div>
        `;
        
        div.querySelector('.done-btn').addEventListener('click', () => handleTaskAction(t.id, 'Done'));
        div.querySelector('.notdone-btn').addEventListener('click', () => handleTaskAction(t.id, 'Not Done'));
        div.querySelector('.delete-btn').addEventListener('click', () => handleDeleteTask(t.id));

        tasksContainer.appendChild(div);
    });
}

// Analytics and Charting
function updateDashboardMetrics() {
    // Stat 1: Max Global Streak
    const maxStreak = tasks.reduce((max, t) => Math.max(max, t.streak), 0);
    maxStreakStat.textContent = maxStreak;

    // Stat 2: Today's Completion Rate
    const today = getTodayStr();
    let totalToday = 0;
    let doneToday = 0;
    
    tasks.forEach(t => {
        if (t.currentDate === today) {
            totalToday++;
            if (t.status === 'Done') doneToday++;
        }
    });
    
    const consistency = totalToday === 0 ? 0 : Math.round((doneToday / totalToday) * 100);
    completionRateStat.textContent = `${consistency}%`;

    // Visual Graph: 7-Day Completion History
    const past7Days = getPastDays(7);
    const dataHits = past7Days.map(date => {
        let completeds = 0;
        tasks.forEach(t => {
            if (t.history && t.history[date] === 'Done') completeds++;
        });
        return completeds;
    });

    renderChart(past7Days, dataHits);
}

function renderChart(labels, dataHits) {
    // Format labels to just show Mon/Tue etc.
    const shortLabels = labels.map(l => {
        const d = new Date(l);
        return d.toLocaleDateString(undefined, { weekday: 'short' });
    });

    if (consistencyChart) {
        consistencyChart.data.labels = shortLabels;
        consistencyChart.data.datasets[0].data = dataHits;
        consistencyChart.update();
        return;
    }

    if (!chartCtx) return;

    const theme = document.documentElement.getAttribute('data-theme');
    let textColor = "rgba(255, 255, 255, 0.4)";
    let gridColor = "rgba(255, 255, 255, 0.05)";
    let lineColor = '#00f0ff';
    let lineBg = 'rgba(0, 240, 255, 0.1)';
    
    if (theme === 'light') {
        textColor = "rgba(0, 0, 0, 0.5)";
        gridColor = "rgba(0, 0, 0, 0.05)";
        lineColor = '#0ea5e9';
        lineBg = 'rgba(14, 165, 233, 0.1)';
    } else if (theme === 'uv') {
        textColor = "rgba(255, 220, 181, 0.5)";
        gridColor = "rgba(255, 120, 0, 0.1)";
        lineColor = '#ff8800';
        lineBg = 'rgba(255, 136, 0, 0.1)';
    }

    // Use Chart.js defaults to fit style
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    consistencyChart = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: shortLabels,
            datasets: [{
                label: 'Tasks Completed',
                data: dataHits,
                borderColor: lineColor,
                backgroundColor: lineBg,
                borderWidth: 2,
                pointBackgroundColor: '#ff003c',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff003c',
                fill: true,
                tension: 0.4 // futuristic smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                    grid: { color: gridColor },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}

function pushToGoogleSheets(taskObj) {
    const payload = {
        Date: taskObj.currentDate,
        User: currentUser,
        TaskID: taskObj.id,
        Task: taskObj.name,
        Status: taskObj.status,
        Streak: taskObj.streak
    };

    fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(err => console.error("Error pushing to sheets", err));
}

// Start
init();
