import React, { useState, useEffect } from 'react';
import { TradeLog } from '../types';
import { Plus, Trash2, TrendingUp, TrendingDown, Calendar, Target, Activity, PieChart, Flame, Trophy, AlertCircle, BookOpen, Database, Save, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TradeJournal: React.FC = () => {
  // --- LAZY INITIALIZATION FOR ROBUST STORAGE ---
  // We read from LocalStorage immediately when state initializes.
  // This prevents race conditions where empty state might overwrite saved data.
  const [trades, setTrades] = useState<TradeLog[]>(() => {
    try {
        const saved = localStorage.getItem('l3sr_journal');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to load journal", e);
        return [];
    }
  });

  const [pair, setPair] = useState('EURUSD');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [result, setResult] = useState<'WIN' | 'LOSS' | 'BREAKEVEN'>('WIN');
  const [note, setNote] = useState('');
  
  // Save to LocalStorage whenever 'trades' changes
  useEffect(() => {
    localStorage.setItem('l3sr_journal', JSON.stringify(trades));
  }, [trades]);

  const addTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pair.trim()) return;

    const newTrade: TradeLog = {
      id: Date.now().toString(),
      date: Date.now(),
      pair: pair.toUpperCase().trim(),
      direction,
      result,
      note: note.trim()
    };
    setTrades([newTrade, ...trades]);
    setNote(''); // Reset note
  };

  const deleteTrade = (id: string) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  const exportToCSV = () => {
    if (trades.length === 0) return;
    
    // Define headers
    const headers = ['Date', 'Time', 'Pair', 'Direction', 'Result', 'Note'];
    
    // Convert data to CSV rows
    const csvContent = [
      headers.join(','),
      ...trades.map(t => {
        const dateObj = new Date(t.date);
        return [
          dateObj.toLocaleDateString(),
          dateObj.toLocaleTimeString(),
          t.pair,
          t.direction,
          t.result,
          `"${t.note?.replace(/"/g, '""') || ''}"` // Escape quotes in notes
        ].join(',');
      })
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `L3SR_Journal_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- ANALYTICS ENGINE ---
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.result === 'WIN').length;
  const losses = trades.filter(t => t.result === 'LOSS').length;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(0) : "0";
  const netScore = wins - losses;

  // Streak Calculation
  const calculateStreak = () => {
    if (trades.length === 0) return { count: 0, type: 'NONE' };
    let count = 0;
    const type = trades[0].result;
    if (type === 'BREAKEVEN') return { count: 0, type: 'NONE' };

    for (const t of trades) {
      if (t.result === type) count++;
      else break;
    }
    return { count, type };
  };
  const streak = calculateStreak();

  // Best Pair Logic
  const getBestPair = () => {
    const pairMap: Record<string, { wins: number, total: number }> = {};
    trades.forEach(t => {
        if (!pairMap[t.pair]) pairMap[t.pair] = { wins: 0, total: 0 };
        pairMap[t.pair].total++;
        if (t.result === 'WIN') pairMap[t.pair].wins++;
    });
    
    let best = 'N/A';
    let maxWins = -1;

    Object.entries(pairMap).forEach(([key, val]) => {
        if (val.wins > maxWins) {
            maxWins = val.wins;
            best = key;
        }
    });
    return totalTrades > 0 ? best : 'N/A';
  };
  const bestPair = getBestPair();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
            <motion.h2 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
                Trading <span className="text-trading-gold">Journal</span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl">
                Professional traders don't just trade; they track. Log every execution to uncover your hidden strengths and weaknesses.
            </p>
        </div>
        
        {/* Storage Indicator */}
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
            <Database size={12} className="text-green-500" />
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Auto-Save Active</span>
        </div>
      </div>

      {/* 1. HUD (HEADS UP DISPLAY) - STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Win Rate */}
          <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col items-center md:items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={48} /></div>
             <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Win Rate</div>
             <div className={`text-3xl font-mono font-bold ${Number(winRate) >= 60 ? 'text-trading-success' : Number(winRate) >= 40 ? 'text-yellow-500' : 'text-trading-danger'}`}>
                {winRate}%
             </div>
             <div className="text-[10px] text-gray-400 mt-1">{wins}W - {losses}L</div>
          </motion.div>

          {/* Card 2: Net Score */}
          <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col items-center md:items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={48} /></div>
             <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Net Score</div>
             <div className="text-3xl font-mono font-bold text-white">
                {netScore > 0 ? `+${netScore}` : netScore}
             </div>
             <div className="text-[10px] text-gray-400 mt-1">Total Trades: {totalTrades}</div>
          </motion.div>

          {/* Card 3: Streak */}
          <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col items-center md:items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Flame size={48} /></div>
             <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Current Streak</div>
             <div className={`text-3xl font-mono font-bold ${streak.type === 'WIN' ? 'text-trading-success' : streak.type === 'LOSS' ? 'text-trading-danger' : 'text-gray-400'}`}>
                {streak.type === 'WIN' ? `+${streak.count}` : streak.type === 'LOSS' ? `-${streak.count}` : '0'}
             </div>
             <div className="text-[10px] text-gray-400 mt-1">
                {streak.type === 'WIN' ? 'Momentum!' : streak.type === 'LOSS' ? 'Stop & Review' : 'Neutral'}
             </div>
          </motion.div>

          {/* Card 4: Best Pair */}
          <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col items-center md:items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={48} /></div>
             <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Best Asset</div>
             <div className="text-3xl font-mono font-bold text-trading-gold truncate w-full text-center md:text-left">
                {bestPair}
             </div>
             <div className="text-[10px] text-gray-400 mt-1">Based on Wins</div>
          </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ENTRY FORM (4 Cols) */}
        <div className="lg:col-span-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-trading-card border border-gray-800 rounded-xl p-6 relative overflow-hidden shadow-2xl"
           >
              <div className="absolute top-0 left-0 w-full h-1 bg-trading-gold"></div>
              
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="bg-gray-800 rounded p-1" size={24} /> Log New Trade
              </h3>
              
              <form onSubmit={addTrade} className="space-y-6">
                 {/* Asset Input */}
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Asset / Pair</label>
                    <input 
                       type="text" 
                       value={pair}
                       onChange={(e) => setPair(e.target.value)}
                       placeholder="EURUSD"
                       className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono uppercase focus:border-trading-gold focus:ring-1 focus:ring-trading-gold/20 outline-none transition-all"
                    />
                 </div>

                 {/* Direction Toggle */}
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Direction</label>
                    <div className="grid grid-cols-2 gap-3">
                       <button
                         type="button"
                         onClick={() => setDirection('BUY')}
                         className={`py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            direction === 'BUY' 
                            ? 'bg-trading-success text-black shadow-[0_0_15px_rgba(0,192,118,0.3)]' 
                            : 'bg-black/40 border border-gray-700 text-gray-500 hover:text-white'
                         }`}
                       >
                         <TrendingUp size={16} /> BUY
                       </button>
                       <button
                         type="button"
                         onClick={() => setDirection('SELL')}
                         className={`py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            direction === 'SELL' 
                            ? 'bg-trading-danger text-white shadow-[0_0_15px_rgba(255,59,48,0.3)]' 
                            : 'bg-black/40 border border-gray-700 text-gray-500 hover:text-white'
                         }`}
                       >
                         <TrendingDown size={16} /> SELL
                       </button>
                    </div>
                 </div>

                 {/* Result Toggle */}
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Outcome</label>
                    <div className="grid grid-cols-3 gap-2">
                       <button
                         type="button"
                         onClick={() => setResult('WIN')}
                         className={`py-2 rounded-lg font-bold text-xs transition-all ${
                            result === 'WIN' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                            : 'bg-black/40 border border-gray-700 text-gray-500'
                         }`}
                       >
                         WIN
                       </button>
                       <button
                         type="button"
                         onClick={() => setResult('LOSS')}
                         className={`py-2 rounded-lg font-bold text-xs transition-all ${
                            result === 'LOSS' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                            : 'bg-black/40 border border-gray-700 text-gray-500'
                         }`}
                       >
                         LOSS
                       </button>
                       <button
                         type="button"
                         onClick={() => setResult('BREAKEVEN')}
                         className={`py-2 rounded-lg font-bold text-xs transition-all ${
                            result === 'BREAKEVEN' 
                            ? 'bg-gray-500/20 text-gray-300 border border-gray-500/50' 
                            : 'bg-black/40 border border-gray-700 text-gray-500'
                         }`}
                       >
                         BE
                       </button>
                    </div>
                 </div>

                 {/* Note Input */}
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Note (Optional)</label>
                    <textarea 
                       value={note}
                       onChange={(e) => setNote(e.target.value)}
                       placeholder="Why did you take this trade?"
                       className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-trading-gold focus:ring-1 focus:ring-trading-gold/20 outline-none transition-all h-20 resize-none"
                    />
                 </div>

                 <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-trading-gold text-black font-bold py-4 rounded-xl shadow-lg hover:bg-[#bba02a] transition-all flex items-center justify-center gap-2"
                 >
                    <Save size={18} /> Save Entry
                 </motion.button>

              </form>
           </motion.div>

           {/* Tip Card */}
           <div className="mt-4 bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg flex items-start gap-3">
              <BookOpen className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-blue-200 leading-relaxed">
                 <span className="font-bold">Pro Tip:</span> Log trades immediately after closing. Emotions fade quickly, but raw data stays honest.
              </p>
           </div>
        </div>

        {/* RIGHT COLUMN: HISTORY LIST (8 Cols) */}
        <div className="lg:col-span-8">
           <div className="bg-trading-card border border-gray-800 rounded-xl overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
              
              {/* List Header */}
              <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0a0b0d]/50">
                 <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-trading-gold" />
                    Recent History
                 </h3>
                 
                 <div className="flex items-center gap-2">
                    {trades.length > 0 && (
                      <>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={exportToCSV}
                            className="text-xs text-trading-gold hover:text-white flex items-center gap-1 bg-trading-gold/10 px-3 py-1.5 rounded hover:bg-trading-gold/20 transition-colors border border-trading-gold/20"
                            title="Download as CSV"
                        >
                            <Download size={12} /> Export CSV
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { if(window.confirm('Delete all history? This cannot be undone.')) setTrades([]); }} 
                            className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded hover:bg-red-500/20 transition-colors border border-red-500/20"
                        >
                            <Trash2 size={12} /> Clear All
                        </motion.button>
                      </>
                    )}
                 </div>
              </div>
              
              {/* Trades List */}
              <div className="flex-1 overflow-y-auto max-h-[800px] custom-scrollbar p-4 space-y-3">
                 <AnimatePresence mode="popLayout">
                 {trades.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full text-gray-500 py-20"
                    >
                       <PieChart size={64} className="mb-4 text-gray-800" />
                       <p className="text-lg font-medium">Your journal is empty</p>
                       <p className="text-sm mt-1 max-w-xs text-center text-gray-600">Start logging your trades on the left to see analytics and improve your accuracy.</p>
                    </motion.div>
                 ) : (
                       trades.map((trade) => (
                         <motion.div 
                            layout
                            key={trade.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-black/20 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-700 transition-colors group relative"
                         >
                            <div className="flex items-center gap-4">
                               {/* Result Badge */}
                               <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold shadow-inner shrink-0 ${
                                   trade.result === 'WIN' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                   trade.result === 'LOSS' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                                   'bg-gray-700/20 text-gray-400 border border-gray-700'
                               }`}>
                                  <span className="text-lg leading-none">{trade.result === 'WIN' ? 'W' : trade.result === 'LOSS' ? 'L' : '-'}</span>
                                  <span className="text-[9px] uppercase font-normal opacity-70 leading-none mt-1">{trade.result === 'BREAKEVEN' ? 'BE' : trade.result}</span>
                               </div>
                               
                               <div>
                                  <div className="flex items-center gap-3">
                                     <span className="font-bold text-white font-mono text-xl">{trade.pair}</span>
                                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 ${
                                         trade.direction === 'BUY' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                     }`}>
                                        {trade.direction === 'BUY' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                        {trade.direction}
                                     </span>
                                  </div>
                                  
                                  <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                                     <span>{new Date(trade.date).toLocaleDateString()}</span>
                                     <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                     <span>{new Date(trade.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                  </div>

                                  {trade.note && (
                                     <div className="mt-2 text-xs text-gray-400 italic border-l-2 border-gray-700 pl-2">
                                        "{trade.note}"
                                     </div>
                                  )}
                               </div>
                            </div>
                            
                            <motion.button 
                              whileHover={{ scale: 1.1, color: "#ef4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteTrade(trade.id)} 
                              className="absolute top-4 right-4 md:static text-gray-700 hover:bg-red-500/10 p-2 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                              title="Delete Entry"
                            >
                               <Trash2 size={18} />
                            </motion.button>
                         </motion.div>
                       ))
                 )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TradeJournal;