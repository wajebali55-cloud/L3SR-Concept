import React, { useState } from 'react';
import { Target, ZapOff, Wifi, Filter, BarChart2, ClipboardList, Shield, Lightbulb, CheckCircle2, XCircle, ArrowRight, Ban, Brain, Zap, MousePointerClick, Cpu, Globe, Activity, Scale, AlertTriangle, Layers, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type TabType = 'GENERAL' | 'OTC' | 'FOREX';

const AccuracyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('GENERAL');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      
      {/* Header Section */}
      <div className="text-center mb-10 space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-trading-gold/10 border border-trading-gold/30 text-trading-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
        >
          Accuracy Protocol
        </motion.div>
        <motion.h1 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight"
        >
          {activeTab === 'GENERAL' && <>How to Improve <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">L3SR Accuracy</span></>}
          {activeTab === 'OTC' && <>Mastering The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">OTC Market</span></>}
          {activeTab === 'FOREX' && <>Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Live Forex</span></>}
        </motion.h1>
      </div>

      {/* TABS */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-900/50 p-1.5 rounded-xl border border-gray-800 flex items-center gap-1 overflow-x-auto max-w-full">
            {[
                { id: 'GENERAL', label: 'General Framework', icon: Target },
                { id: 'OTC', label: 'OTC Protocol', icon: Cpu },
                { id: 'FOREX', label: 'Live Forex', icon: Globe },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    {activeTab === tab.id && (
                        <motion.div 
                            layoutId="activeTab"
                            className={`absolute inset-0 rounded-lg shadow-lg ${
                                tab.id === 'OTC' ? 'bg-purple-600/20 border border-purple-500/50' :
                                tab.id === 'FOREX' ? 'bg-green-600/20 border border-green-500/50' :
                                'bg-trading-gold/20 border border-trading-gold/50'
                            }`}
                        />
                    )}
                    <tab.icon size={16} className="relative z-10" />
                    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode="wait">
        
        {/* --- GENERAL VIEW --- */}
        {activeTab === 'GENERAL' && (
          <motion.div 
            key="general"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Card 1: Full width on tablet, 2/3 on desktop */}
            <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-trading-card to-[#0d0e12] border border-gray-800 p-8 rounded-2xl relative overflow-hidden group hover:border-trading-gold/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-trading-gold/5 rounded-full blur-3xl group-hover:bg-trading-gold/10 transition-all duration-500"></div>
            <div className="flex items-start gap-4 relative z-10">
                <div className="bg-trading-gold/10 p-3 rounded-xl text-trading-gold group-hover:scale-110 transition-transform duration-300">
                <Target size={32} />
                </div>
                <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">1. Trade Only High-Quality Setups</h3>
                <p className="text-gray-400 mb-6">The biggest accuracy killer is low-quality entries. High accuracy comes from selective trading.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Must Have</div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500" /> Clear directional push</li>
                        <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500" /> Clean rejection/continuation</li>
                        <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500" /> Meaningful body size</li>
                    </ul>
                    </div>
                    <div className="space-y-2">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avoid</div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-300"><XCircle size={16} className="text-red-500" /> Chaotic spikes</li>
                        <li className="flex items-center gap-2 text-sm text-gray-300"><XCircle size={16} className="text-red-500" /> Small, indecisive bodies</li>
                        <li className="flex items-center gap-2 text-sm text-gray-300"><XCircle size={16} className="text-red-500" /> Large, messy wicks</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={item} className="bg-trading-card border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
            <div className="bg-red-500/10 p-3 rounded-xl text-red-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <ZapOff size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Avoid High-Noise</h3>
            <p className="text-gray-400 text-sm mb-4">L3SR relies on precision. Noise destroys precision.</p>
            <ul className="space-y-2">
                {['Major News Releases', 'Volatile Spikes', 'Low Liquidity Sessions', 'Artificial OTC Moves'].map((txt, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {txt}
                    </li>
                ))}
            </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={item} className="bg-trading-card border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Wifi size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Execution Timing</h3>
            <p className="text-gray-400 text-sm mb-4">Even a 1-second delay can distort your edge.</p>
            <div className="space-y-3">
                <div className="bg-black/40 p-3 rounded border border-gray-800 text-sm text-gray-300">
                    <span className="text-white font-bold block mb-1">Hardware Rule:</span>
                    Use wired connection. Close background apps.
                </div>
                <div className="bg-black/40 p-3 rounded border border-gray-800 text-sm text-gray-300">
                    <span className="text-white font-bold block mb-1">Timing Rule:</span>
                    Execute within the first second of :00.
                </div>
            </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={item} className="bg-trading-card border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
            <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">4. Confirmation Filter</h3>
            <p className="text-gray-400 text-sm mb-4">Filters reduce frequency but increase win rate.</p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-400"><ArrowRight size={14} className="text-purple-500" /> Trade with short-term trend</li>
                <li className="flex items-center gap-2 text-sm text-gray-400"><ArrowRight size={14} className="text-purple-500" /> Avoid counter-trend</li>
                <li className="flex items-center gap-2 text-sm text-gray-400"><ArrowRight size={14} className="text-purple-500" /> Skip after 2 losses</li>
            </ul>
            </motion.div>

            {/* Card 5 */}
            <motion.div variants={item} className="bg-trading-card border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
            <div className="bg-orange-500/10 p-3 rounded-xl text-orange-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">5. Control Volume</h3>
            <p className="text-gray-400 text-sm mb-4">Discipline protects accuracy. Overtrading kills it.</p>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Max Trades/Session</span>
                    <span className="text-white font-bold">5 - 10</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Stop Loss</span>
                    <span className="text-white font-bold">2-3 Losses</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Target</span>
                    <span className="text-white font-bold">Stop at Profit</span>
                </div>
            </div>
            </motion.div>

            {/* Card 6: FULL WIDTH NOW */}
            <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-trading-card to-[#0d0e12] border border-gray-800 p-8 rounded-2xl relative overflow-hidden hover:border-trading-accent/30 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <div className="bg-trading-accent/10 p-3 rounded-xl text-trading-accent w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                        <ClipboardList size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">6. Track Data Objectively</h3>
                    <p className="text-gray-400 mb-4">Memory is biased. Data is honest. Optimization comes from data, not feelings. Expand your view.</p>
                    <div className="flex flex-wrap gap-2">
                        {['Market Type', 'Time of Day', 'Trend Direction', 'Screenshots'].map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-black rounded border border-gray-700 text-xs text-gray-300">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-black/40 p-6 rounded-xl border border-gray-800 w-full md:w-auto min-w-[300px] shadow-lg">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
                        <BarChart2 size={12} /> Example Data Insight
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Forex Pairs</span>
                        <span className="text-green-400 font-bold text-sm">84% WR</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "84%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-green-500 h-full"
                        ></motion.div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-300 text-sm">OTC Market</span>
                        <span className="text-yellow-500 font-bold text-sm">72% WR</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "72%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="bg-yellow-500 h-full"
                        ></motion.div>
                        </div>
                    </div>
                </div>
            </div>
            </motion.div>

            {/* Card 7: FULL WIDTH NOW */}
            <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-3 bg-trading-card border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-1 md:max-w-xs text-center md:text-left">
                        <div className="bg-green-500/10 p-3 rounded-xl text-green-400 w-fit mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">7. Risk Management</h3>
                        <p className="text-gray-400 text-sm">Even with 80% accuracy, you must survive the losing streaks.</p>
                    </div>
                    
                    <div className="hidden md:block w-px h-24 bg-gray-800 mx-4"></div>

                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/20 p-4 rounded-lg border border-gray-800/50 flex flex-col items-center md:items-start gap-2 hover:bg-black/40 transition-colors">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span className="text-sm font-bold text-gray-300">Max 1-3% Risk</span>
                            <span className="text-xs text-gray-500">Per individual trade</span>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg border border-gray-800/50 flex flex-col items-center md:items-start gap-2 hover:bg-black/40 transition-colors">
                            <XCircle size={18} className="text-red-500" />
                            <span className="text-sm font-bold text-gray-300">No Martingale</span>
                            <span className="text-xs text-gray-500">Never increase size after loss</span>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg border border-gray-800/50 flex flex-col items-center md:items-start gap-2 hover:bg-black/40 transition-colors">
                            <XCircle size={18} className="text-red-500" />
                            <span className="text-sm font-bold text-gray-300">No Revenge</span>
                            <span className="text-xs text-gray-500">Stop trading if tilted</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Real Truth Section */}
            <motion.div 
                variants={item}
                className="col-span-1 md:col-span-2 lg:col-span-3 mt-8 relative"
            >
                <div className="absolute inset-0 bg-trading-gold/5 blur-3xl rounded-full"></div>
                <div className="relative bg-[#0d0e12] border-2 border-trading-gold/20 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(207,181,59,0.1)]">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0d0e12] border border-trading-gold/50 text-trading-gold px-6 py-2 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg z-20">
                        <Lightbulb size={18} /> The Real Truth
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-10 mt-6 relative z-10">Accuracy Improves When:</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                        {[
                            { t: "Trade Less", i: <MousePointerClick size={28} className="text-blue-400" /> },
                            { t: "Skip Unclear", i: <Ban size={28} className="text-red-400" /> },
                            { t: "No Emotions", i: <Brain size={28} className="text-purple-400" /> },
                            { t: "Filter Noise", i: <Filter size={28} className="text-yellow-400" /> },
                            { t: "Protect Speed", i: <Zap size={28} className="text-trading-gold" /> },
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                                className="bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-3 h-32"
                            >
                                <div className="bg-black/40 p-3 rounded-full border border-gray-700 shadow-inner">
                                    {item.i}
                                </div>
                                <div className="text-xs font-bold text-gray-300 uppercase tracking-wide">{item.t}</div>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-10 text-gray-400 text-lg italic border-t border-gray-800 pt-8">
                        "Most traders don’t lose because the strategy is weak. They lose because they cannot follow rules consistently."
                    </p>
                </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- OTC VIEW --- */}
        {activeTab === 'OTC' && (
          <motion.div 
            key="otc"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
             <motion.div variants={item} className="bg-[#120b1e] border border-purple-900/50 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
                 
                 <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                       <Activity className="text-purple-400" />
                       High Volatility Control Model
                    </h2>
                    <p className="text-purple-300/80 mb-8 max-w-2xl">
                       OTC market is artificial and fast. The rule for survival is <span className="font-bold text-white">Extreme Filtering</span>.
                       Skipping trades increases accuracy.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Left */}
                       <div className="space-y-6">
                           <div className="bg-black/30 border border-purple-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Entry Conditions
                              </h3>
                              <ul className="space-y-3">
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                                    Single-direction momentum before last 5s
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                                    Body size clearly visible (No Doji)
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                                    No chaotic movement in last 3s
                                 </li>
                              </ul>
                           </div>
                           
                           <div className="bg-black/30 border border-purple-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Target size={16} /> Optimization Rules
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 <span className="px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-xs">Max 5-8 Trades</span>
                                 <span className="px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-xs">Stop at 2 Losses</span>
                                 <span className="px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-xs">Discipline {'>'} Accuracy</span>
                              </div>
                           </div>
                       </div>

                       {/* Right */}
                       <div className="space-y-6">
                           <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <XCircle size={16} /> Absolute Avoid
                              </h3>
                              <ul className="space-y-3">
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    Large wicks on both sides
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    Sudden spikes in last 2 seconds
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    Market looks manipulated or frozen
                                 </li>
                              </ul>
                           </div>
                           
                           <div className="bg-purple-600 p-5 rounded-xl text-center shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                               <div className="text-xs font-bold text-white/70 uppercase mb-1">Realistic Accuracy</div>
                               <div className="text-4xl font-bold text-white">70–80%</div>
                               <div className="text-xs text-white/70 mt-1">If filtered properly</div>
                           </div>
                       </div>
                    </div>
                 </div>
             </motion.div>
          </motion.div>
        )}

        {/* --- FOREX VIEW --- */}
        {activeTab === 'FOREX' && (
          <motion.div 
            key="forex"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
             <motion.div variants={item} className="bg-[#0b161e] border border-green-900/50 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-[80px]"></div>
                 
                 <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                       <Layers className="text-green-400" />
                       Structure-Based Model (Live Forex)
                    </h2>
                    <p className="text-green-300/80 mb-8 max-w-2xl">
                       Live Forex is based on real liquidity. Here, <span className="font-bold text-white">Structure</span> and <span className="font-bold text-white">Trend</span> are more important than just speed.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Left */}
                       <div className="space-y-6">
                           <div className="bg-black/30 border border-green-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Entry Conditions
                              </h3>
                              <ul className="space-y-3">
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <TrendingUp size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    Trade in direction of Short-term Trend
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <TrendingUp size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    Clear Rejection or Strong Continuation
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <TrendingUp size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    Previous candle supports momentum
                                 </li>
                              </ul>
                           </div>
                           
                           <div className="bg-black/30 border border-green-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Target size={16} /> Optimization Rules
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 <span className="px-3 py-1 bg-green-900/30 text-green-300 border border-green-700/50 rounded text-xs">Active Sessions (LDN/NY)</span>
                                 <span className="px-3 py-1 bg-green-900/30 text-green-300 border border-green-700/50 rounded text-xs">Max 8-10 Trades</span>
                                 <span className="px-3 py-1 bg-green-900/30 text-green-300 border border-green-700/50 rounded text-xs">Risk 1-2%</span>
                              </div>
                           </div>
                       </div>

                       {/* Right */}
                       <div className="space-y-6">
                           <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl">
                              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <XCircle size={16} /> Absolute Avoid
                              </h3>
                              <ul className="space-y-3">
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    High-impact news time
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    Low liquidity sessions (Late Asian)
                                 </li>
                                 <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    Extremely small candles (Indecision)
                                 </li>
                              </ul>
                           </div>
                           
                           <div className="bg-green-600 p-5 rounded-xl text-center shadow-[0_0_30px_rgba(22,163,74,0.3)]">
                               <div className="text-xs font-bold text-white/70 uppercase mb-1">Possible Accuracy</div>
                               <div className="text-4xl font-bold text-white">80–85%</div>
                               <div className="text-xs text-white/70 mt-1">Trend-Based Filtering</div>
                           </div>
                       </div>
                    </div>
                 </div>
             </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Comparison Table (Visible on Specific Tabs) */}
      {(activeTab === 'OTC' || activeTab === 'FOREX') && (
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="mt-12 bg-trading-card border border-gray-800 rounded-2xl p-6 md:p-8"
        >
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Scale size={20} className="text-gray-400" />
              Market Comparison Matrix
           </h3>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Factor</th>
                      <th className="py-3 px-4 text-purple-400">OTC Market</th>
                      <th className="py-3 px-4 text-green-400">Live Forex</th>
                   </tr>
                </thead>
                <tbody className="text-sm">
                   <tr className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-300">Movement</td>
                      <td className="py-4 px-4 text-gray-400">Artificial, Fast</td>
                      <td className="py-4 px-4 text-gray-400">Structured, Natural</td>
                   </tr>
                   <tr className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-300">Volatility</td>
                      <td className="py-4 px-4 text-gray-400">High Spikes</td>
                      <td className="py-4 px-4 text-gray-400">Controlled Momentum</td>
                   </tr>
                   <tr className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-300">Filtering Need</td>
                      <td className="py-4 px-4 text-purple-400 font-bold">Very High</td>
                      <td className="py-4 px-4 text-gray-400">Moderate</td>
                   </tr>
                   <tr className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-300">Best Strategy</td>
                      <td className="py-4 px-4 text-gray-400">Selective Trading</td>
                      <td className="py-4 px-4 text-gray-400">Trend-based Trading</td>
                   </tr>
                   <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-300">Risk Level</td>
                      <td className="py-4 px-4 text-red-400">Higher</td>
                      <td className="py-4 px-4 text-green-400">Lower</td>
                   </tr>
                </tbody>
             </table>
           </div>

           <div className="mt-8 bg-black/40 p-4 rounded-xl border border-gray-800 flex items-start gap-3">
              <Shield size={20} className="text-trading-gold shrink-0 mt-1" />
              <div>
                 <strong className="text-white text-sm block mb-1">Final Professional Advice</strong>
                 <p className="text-gray-400 text-sm">
                    If you want long-term stability, use Forex as your primary market. Use OTC only when conditions are perfectly clean. 
                    <span className="text-trading-gold"> Never mix rules.</span> Track your data separately.
                 </p>
              </div>
           </div>
        </motion.div>
      )}

    </div>
  );
};

export default AccuracyGuide;