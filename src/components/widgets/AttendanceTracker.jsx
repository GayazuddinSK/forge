import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, CheckCircle, RotateCcw, Plus, Edit2, X } from 'lucide-react';

const AttendanceTracker = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('attendance_data');
    if (saved) {
      try { 
        return JSON.parse(saved); 
      } catch (e) {
        console.error("Error parsing saved attendance data", e);
      }
    }
    return { total_classes: 0, attended_classes: 0, percentage: 0.0, last_updated: "Not yet updated" };
  });

  const [mode, setMode] = useState('view'); // 'view', 'update_total', 'add_today'
  const [inputTotal, setInputTotal] = useState('');
  const [inputAttended, setInputAttended] = useState('');

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('attendance_data', JSON.stringify(data));
  }, [data]);

  const calculatePercentage = (attended, total) => {
    return total > 0 ? Number(((attended / total) * 100).toFixed(2)) : 0.0;
  };

  const handleUpdateTotal = (e) => {
    e.preventDefault();
    let total = parseInt(inputTotal);
    let attended = parseInt(inputAttended);
    
    if (isNaN(total) || isNaN(attended) || total < 0 || attended < 0) {
      alert('⚠️ Please enter valid non-negative numbers.');
      return;
    }
    if (attended > total) {
      alert('⚠️ Attended classes cannot exceed total classes.');
      attended = total;
    }

    setData({
      total_classes: total,
      attended_classes: attended,
      percentage: calculatePercentage(attended, total),
      last_updated: new Date().toLocaleString()
    });
    
    setMode('view');
    setInputTotal('');
    setInputAttended('');
  };

  const handleAddToday = (e) => {
    e.preventDefault();
    let todayTotal = parseInt(inputTotal);
    let todayAttended = parseInt(inputAttended);
    
    if (isNaN(todayTotal) || isNaN(todayAttended) || todayTotal < 0 || todayAttended < 0) {
      alert('⚠️ Please enter valid non-negative numbers.');
      return;
    }
    if (todayAttended > todayTotal) {
      alert('⚠️ Attended classes cannot exceed total classes today.');
      todayAttended = todayTotal;
    }

    const newTotal = data.total_classes + todayTotal;
    const newAttended = data.attended_classes + todayAttended;

    setData({
      total_classes: newTotal,
      attended_classes: newAttended,
      percentage: calculatePercentage(newAttended, newTotal),
      last_updated: new Date().toLocaleString()
    });
    
    setMode('view');
    setInputTotal('');
    setInputAttended('');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all attendance data?')) {
      setData({ total_classes: 0, attended_classes: 0, percentage: 0.0, last_updated: "Not yet updated" });
    }
  };

  const isDanger = data.percentage < 75 && data.total_classes > 0;

  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-arc" />
          <h2 className="tech-heading text-xl">ATTENDANCE PROTOCOL</h2>
        </div>
        <span className="text-xs font-tech text-textMuted uppercase">Module: Python_Port</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Overall Status Card */}
        <div className="bg-background/50 border border-surfaceBorder rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-${isDanger ? 'stark-red' : 'arc'} to-transparent transition-colors duration-500`}></div>
          <span className="font-tech text-textMuted text-sm uppercase">Overall Status</span>
          <div className={`text-4xl font-tech mt-2 transition-colors duration-500 ${isDanger ? 'text-stark-red drop-shadow-red-glow' : 'text-arc drop-shadow-arc'}`}>
            {data.percentage}%
          </div>
          <span className={`text-xs mt-1 flex items-center ${isDanger ? 'text-stark-red' : 'text-green-400'}`}>
            {isDanger ? <ShieldAlert className="w-3 h-3 mr-1"/> : <CheckCircle className="w-3 h-3 mr-1"/>}
            {isDanger ? 'Critical' : 'Optimal'}
          </span>
        </div>
        
        {/* Details Card */}
        <div className="bg-surface/30 border border-surfaceBorder rounded-lg p-4 flex flex-col justify-center space-y-2">
          <div className="flex justify-between items-center text-sm font-tech uppercase tracking-wider">
            <span className="text-textMuted">Total Classes</span>
            <span className="text-textMain">{data.total_classes}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-tech uppercase tracking-wider">
            <span className="text-textMuted">Attended</span>
            <span className="text-textMain">{data.attended_classes}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-tech uppercase tracking-wider mt-2 border-t border-surfaceBorder pt-2">
            <span className="text-textMuted">Last Sync</span>
            <span className="text-textMuted text-[10px]">{data.last_updated}</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex-grow flex flex-col justify-end">
        {mode === 'view' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button 
              onClick={() => setMode('update_total')}
              className="bg-surface border border-surfaceBorder hover:border-arc/50 hover:text-arc text-textMuted text-xs font-tech uppercase rounded p-2 flex flex-col items-center justify-center transition-all group"
            >
              <Edit2 className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
              <span>Update All</span>
            </button>
            <button 
              onClick={() => setMode('add_today')}
              className="bg-arc/10 border border-arc/30 text-arc hover:bg-arc hover:text-black hover:shadow-arc-hover text-xs font-tech uppercase rounded p-2 flex flex-col items-center justify-center transition-all group"
            >
              <Plus className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
              <span>Add Today</span>
            </button>
            <button 
              onClick={handleReset}
              className="bg-surface border border-surfaceBorder hover:border-stark-red/50 hover:text-stark-red text-textMuted text-xs font-tech uppercase rounded p-2 flex flex-col items-center justify-center transition-all group"
            >
              <RotateCcw className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
              <span>Reset</span>
            </button>
          </div>
        ) : (
          <form 
            onSubmit={mode === 'update_total' ? handleUpdateTotal : handleAddToday} 
            className="bg-surface/50 border border-surfaceBorder rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-tech text-arc text-sm uppercase tracking-widest">
                {mode === 'update_total' ? 'Update Total Attendance' : "Add Today's Attendance"}
              </span>
              <button type="button" onClick={() => setMode('view')} className="text-textMuted hover:text-stark-red transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-textMuted font-tech uppercase mb-1">
                  {mode === 'update_total' ? 'Total Classes So Far' : 'Classes Conducted Today'}
                </label>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={inputTotal}
                  onChange={(e) => setInputTotal(e.target.value)}
                  className="w-full bg-background/50 border border-surfaceBorder rounded px-3 py-2 text-sm text-textMain focus:outline-none focus:border-arc/50 transition-colors"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <label className="block text-[10px] text-textMuted font-tech uppercase mb-1">
                  {mode === 'update_total' ? 'Classes You Attended' : 'Classes Attended Today'}
                </label>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={inputAttended}
                  onChange={(e) => setInputAttended(e.target.value)}
                  className="w-full bg-background/50 border border-surfaceBorder rounded px-3 py-2 text-sm text-textMain focus:outline-none focus:border-arc/50 transition-colors"
                  placeholder="e.g. 4"
                />
              </div>
              <button 
                type="submit"
                className="w-full tech-button py-2 text-sm mt-2"
              >
                SAVE DIRECTIVE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
