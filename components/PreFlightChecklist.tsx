import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, ShieldCheck } from 'lucide-react';

const PreFlightChecklist: React.FC = () => {
  const [checks, setChecks] = useState({
    trend: false,
    news: false,
    mindset: false
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checks).every(Boolean);

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${allChecked ? 'bg-trading-success/10 border-trading-success' : 'bg-trading-card border-gray-800'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <ShieldCheck className={allChecked ? 'text-trading-success' : 'text-gray-400'} size={20} />
          Pre-Trade Checklist
        </h3>
        {allChecked && <span className="text-[10px] font-bold bg-trading-success text-black px-2 py-1 rounded">READY TO TRADE</span>}
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => toggleCheck('trend')}
          className="w-full flex items-center gap-3 text-left group"
        >
          {checks.trend ? <CheckSquare className="text-trading-success" size={18} /> : <Square className="text-gray-600 group-hover:text-gray-400" size={18} />}
          <span className={`text-sm ${checks.trend ? 'text-gray-300 line-through decoration-gray-600' : 'text-gray-400'}`}>
            Market is NOT Choppy (Trend identified)
          </span>
        </button>

        <button 
          onClick={() => toggleCheck('news')}
          className="w-full flex items-center gap-3 text-left group"
        >
          {checks.news ? <CheckSquare className="text-trading-success" size={18} /> : <Square className="text-gray-600 group-hover:text-gray-400" size={18} />}
          <span className={`text-sm ${checks.news ? 'text-gray-300 line-through decoration-gray-600' : 'text-gray-400'}`}>
            No High Impact News (NFP/CPI) in +/- 30m
          </span>
        </button>

        <button 
          onClick={() => toggleCheck('mindset')}
          className="w-full flex items-center gap-3 text-left group"
        >
          {checks.mindset ? <CheckSquare className="text-trading-success" size={18} /> : <Square className="text-gray-600 group-hover:text-gray-400" size={18} />}
          <span className={`text-sm ${checks.mindset ? 'text-gray-300 line-through decoration-gray-600' : 'text-gray-400'}`}>
            Accepting Risk (1-2% Balance)
          </span>
        </button>
      </div>

      {!allChecked && (
        <div className="mt-4 pt-4 border-t border-gray-800 flex items-start gap-2 text-xs text-orange-400">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>Do not take a trade until all rules are confirmed.</span>
        </div>
      )}
    </div>
  );
};

export default PreFlightChecklist;