import React, { useState } from 'react';
import { CheckSquare, Circle, CheckCircle2, Trash2, Plus, Clock, Tag } from 'lucide-react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review security protocols', priority: 'high', completed: false, category: 'admin', dueDate: 'Today' },
    { id: 2, text: 'Optimize power distribution', priority: 'medium', completed: true, category: 'system', dueDate: 'Tomorrow' },
    { id: 3, text: 'Upgrade armor algorithms', priority: 'high', completed: false, category: 'dev', dueDate: 'Next Week' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      priority: 'medium',
      completed: false,
      category: 'general',
      dueDate: 'TBD'
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-stark-red border-stark-red/30';
      case 'medium': return 'text-stark-gold border-stark-gold/30';
      default: return 'text-arc border-arc/30';
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CheckSquare className="w-6 h-6 text-arc" />
          <h2 className="tech-heading text-xl">TASK DIRECTIVE</h2>
        </div>
        <div className="flex space-x-2 font-tech text-xs uppercase">
          <button 
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded transition-colors ${filter === 'all' ? 'bg-arc/20 text-arc border border-arc/50' : 'text-textMuted hover:text-textMain'}`}
          >All</button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-2 py-1 rounded transition-colors ${filter === 'pending' ? 'bg-arc/20 text-arc border border-arc/50' : 'text-textMuted hover:text-textMain'}`}
          >Pending</button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-2 py-1 rounded transition-colors ${filter === 'completed' ? 'bg-arc/20 text-arc border border-arc/50' : 'text-textMuted hover:text-textMain'}`}
          >Done</button>
        </div>
      </div>

      <form onSubmit={addTask} className="mb-4 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Plus className="w-4 h-4 text-textMuted group-focus-within:text-arc transition-colors" />
        </div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="ENTER NEW DIRECTIVE..."
          className="w-full bg-background/50 border border-surfaceBorder rounded-lg pl-10 pr-4 py-3 font-sans text-sm text-textMain placeholder-gray-600 focus:outline-none focus:border-arc/80 focus:shadow-arc transition-all"
        />
      </form>

      <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-textMuted font-tech mt-8 uppercase tracking-widest">
            No active directives found
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`group flex items-start space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                task.completed 
                  ? 'bg-surface/30 border-transparent opacity-60' 
                  : 'bg-surface border-surfaceBorder hover:border-arc/40 hover:shadow-arc/20'
              }`}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-textMuted hover:text-arc transition-colors focus:outline-none flex-shrink-0"
              >
                {task.completed ? <CheckCircle2 className="w-5 h-5 text-arc" /> : <Circle className="w-5 h-5" />}
              </button>
              
              <div className="flex-grow min-w-0">
                <p className={`text-sm font-medium transition-colors ${task.completed ? 'text-textMuted line-through' : 'text-textMain'}`}>
                  {task.text}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-tech uppercase tracking-wider">
                  <span className={`flex items-center border px-1.5 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="flex items-center text-textMuted">
                    <Tag className="w-3 h-3 mr-1" />
                    {task.category}
                  </span>
                  <span className="flex items-center text-textMuted">
                    <Clock className="w-3 h-3 mr-1" />
                    {task.dueDate}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-textMuted hover:text-stark-red transition-all focus:outline-none p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoList;
