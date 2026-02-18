import React, { useState, useEffect } from 'react';
import { TradeLog } from '../types';
import { Plus, Trash2, TrendingUp, TrendingDown, Percent, Calendar, Target, Activity, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TradeJournal: React.FC = () => {
  const [trades, setTrades] = useState<TradeLog[]>([]);
  const [pair, setPair] = useState('EURUSD');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [result, setResult] = useState<'WIN' | 'LOSS' | 'BREAKEVEN'>('WIN');
  
  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('l3sr_journal');
    if (saved) {
      try {
        setTrades(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load journal");
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('l3sr_journal', JSON.stringify(trades));
  }, [trades]);

  const addTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrade: TradeLog = {
      id: Date.now().toString(),
      date: Date.now(),
      pair: pair.toUpperCase(),
      direction,
      result
    };
    setTrades([newTrade, ...trades]);
  };

  const deleteTrade = (id: string) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  // --- ANALYTICS ENGINE ---
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.result === 'WIN').length;
  const losses = trades.filter(t => t.result === 'LOSS').length;
  const breakevens = trades.filter(t => t.result === 'BREAKEVEN').length;

  // Win Rate Calculation
  // Formula: (Wins / Total) * 100
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0.0";

  // Directional Analysis
  const buyTrades = trades.filter(t => t.direction === 'BUY');
  const buyWins = buyTrades.filter(t => t.result === 'WIN').length;
  const buyTotal = buyTrades.length;
  const buyAccuracy = buyTotal > 0 ? ((buyWins / buyTotal) * 100).toFixed(1) : "0.0";

  const sellTrades = trades.filter(t => t.direction === 'SELL');
  const sellWins = sellTrades.filter(t => t.result === 'WIN').length;
  const sellTotal = sellTrades.length;
  const sellAccuracy = sellTotal > 0 ? ((sellWins / sellTotal) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-3xl font-bold text-white mb-2"
          >
            My Trade Journal
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Log your L3SR executions to track your consistency.
          </motion.p>
        </div>
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-trading-card border border-gray-800 px-4 py-2 rounded-lg flex gap-4 text-xs font-mono text-gray-400"
        >
           <div><span className="text-trading-success font-bold">{wins}</span> W</div>
           <div><span className="text-trading-danger font-bold">{losses}</span> L</div>
           <div><span className="text-gray-200 font-bold">{breakevens}</span> BE</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Input Form & Stats */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* MAIN STATS */}
           <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col justify-between shadow-lg">
                 <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Total Win Rate</div>
                 <motion.div 
                   key={winRate}
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className={`text-3xl font-mono font-bold ${Number(winRate) >= 60 ? 'text-trading-success' : Number(winRate) >= 40 ? 'text-yellow-500' : 'text-trading-danger'}`}
                 >
                   {winRate}%
                 </motion.div>
                 <div className="w-full bg-gray-800 h-1.5 mt-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-white h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${winRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                 </div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl flex flex-col justify-between shadow-lg">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Total Trades</div>
                  <motion.div 
                     key={totalTrades}
                     initial={{ scale: 1.2 }}
                     animate={{ scale: 1 }}
                     className="text-3xl font-mono font-bold text-white"
                  >
                      {totalTrades}
                  </motion.div>
                  <div className="text-[10px] text-gray-400 mt-2">Log every trade for accuracy.</div>
              </motion.div>
           </div>

           {/* DIRECTIONAL STATS */}
           <motion.div whileHover={{ scale: 1.01 }} className="bg-trading-card border border-gray-800 p-5 rounded-xl space-y-4 shadow-lg">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                 <Target size={14} /> Directional Accuracy
              </h3>
              
              {/* Buy Stats */}
              <div>
                 <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-400 font-bold">BUY TRADES</span>
                    <span className="text-white font-mono">{buyAccuracy}% ({buyWins}/{buyTotal})</span>
                 </div>
                 <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-green-500 h-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${buyAccuracy}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                 </div>
              </div>

              {/* Sell Stats */}
              <div>
                 <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400 font-bold">SELL TRADES</span>
                    <span className="text-white font-mono">{sellAccuracy}% ({sellWins}/{sellTotal})</span>
                 </div>
                 <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-red-500 h-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${sellAccuracy}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                 </div>
              </div>
           </motion.div>

           {/* Add Trade Form */}
           <motion.form 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             onSubmit={addTrade} 
             className="bg-trading-card border border-gray-800 p-6 rounded-xl space-y-4 relative overflow-hidden shadow-xl"
           >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trading-gold to-yellow-600"></div>
              <h3 className="text-lg font-bold text-white mb-2">Log New Entry</h3>
              
              <div>
                <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Pair / Asset</label>
                <input 
                  type="text" 
                  value={pair} 
                  onChange={(e) => setPair(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-trading-gold outline-none uppercase font-mono tracking-wider transition-colors"
                  placeholder="e.g. EURUSD"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Direction</label>
                    <div className="flex bg-[#0a0b0d] rounded-lg p-1 border border-gray-700">
                       <button 
                         type="button"
                         onClick={() => setDirection('BUY')}
                         className={`flex-1 py-2 rounded text-sm font-bold transition-all ${direction === 'BUY' ? 'bg-trading-success text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                       >BUY</button>
                       <button 
                         type="button"
                         onClick={() => setDirection('SELL')}
                         className={`flex-1 py-2 rounded text-sm font-bold transition-all ${direction === 'SELL' ? 'bg-trading-danger text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                       >SELL</button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs text-gray-500 block mb-1 uppercase tracking-wider font-bold">Outcome</label>
                    <select 
                      value={result}
                      onChange={(e) => setResult(e.target.value as any)}
                      className={`w-full bg-[#0a0b0d] border border-gray-700 rounded-lg px-4 py-2.5 outline-none font-bold ${result === 'WIN' ? 'text-green-400' : result === 'LOSS' ? 'text-red-400' : 'text-gray-400'}`}
                    >
                      <option value="WIN">WIN</option>
                      <option value="LOSS">LOSS</option>
                      <option value="BREAKEVEN">BREAKEVEN</option>
                    </select>
                 </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-trading-gold text-black font-bold py-3 rounded-lg hover:bg-[#bba02a] transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_0_15px_rgba(207,181,59,0.2)]"
              >
                 <Plus size={18} /> Add To Journal
              </motion.button>
           </motion.form>
        </div>

        {/* RIGHT: History List */}
        <div className="lg:col-span-8">
           <div className="bg-trading-card border border-gray-800 rounded-xl overflow-hidden min-h-[600px] flex flex-col">
              <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0a0b0d]/50">
                 <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-trading-gold" />
                    Trading History
                 </h3>
                 {trades.length > 0 && (
                   <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { if(window.confirm('Delete all history?')) setTrades([]); }} 
                      className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={12} /> Clear Log
                   </motion.button>
                 )}
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                 <AnimatePresence mode="popLayout">
                 {trades.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full text-gray-500"
                    >
                       <PieChart size={48} className="mb-4 text-gray-700" />
                       <p>No trades logged yet.</p>
                       <p className="text-xs mt-1">Start tracking your L3SR journey.</p>
                    </motion.div>
                 ) : (
                    <div className="divide-y divide-gray-800/50">
                       {trades.map((trade) => (
                         <motion.div 
                            layout
                            key={trade.id}
                            initial={{ opacity: 0, height: 0, x: -20 }}
                            animate={{ opacity: 1, height: 'auto', x: 0 }}
                            exit={{ opacity: 0, height: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                         >
                            <div className="flex items-center gap-4">
                               {/* Result Icon */}
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${trade.result === 'WIN' ? 'bg-trading-success/10 text-trading-success border border-trading-success/20' : trade.result === 'LOSS' ? 'bg-trading-danger/10 text-trading-danger border border-trading-danger/20' : 'bg-gray-700/20 text-gray-400 border border-gray-700'}`}>
                                  {trade.result === 'WIN' ? 'W' : trade.result === 'LOSS' ? 'L' : '-'}
                               </div>
                               
                               <div>
                                  <div className="flex items-center gap-3">
                                     <span className="font-bold text-white font-mono text-lg">{trade.pair}</span>
                                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${trade.direction === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {trade.direction}
                                     </span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                     <span>{new Date(trade.date).toLocaleDateString()}</span>
                                     <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                     <span>{new Date(trade.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                  </div>
                               </div>
                            </div>
                            
                            <motion.button 
                              whileHover={{ scale: 1.1, color: "#ef4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteTrade(trade.id)} 
                              className="text-gray-700 p-2 opacity-0 group-hover:opacity-100 transition-all"
                            >
                               <Trash2 size={18} />
                            </motion.button>
                         </motion.div>
                       ))}
                    </div>
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