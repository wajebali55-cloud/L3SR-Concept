import React from 'react';
import { Target, ZapOff, Wifi, Filter, BarChart2, ClipboardList, Shield, Lightbulb, CheckCircle2, XCircle, ArrowRight, TrendingDown, Ban, Brain, Zap, MousePointerClick, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10
    }
  }
};

const AccuracyGuide: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full bg-trading-gold/10 border border-trading-gold/30 text-trading-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
        >
          Professional Framework
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight"
        >
          How to Improve <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-gold to-yellow-200">L3SR Accuracy</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg"
        >
          Accuracy is not luck. It is the result of strict filtering and disciplined execution.
        </motion.p>
      </div>

      {/* Grid Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        
        {/* Card 1 */}
        <motion.div variants={item} className="col-span-1 lg:col-span-2 bg-gradient-to-br from-trading-card to-[#0d0e12] border border-gray-800 p-8 rounded-2xl relative overflow-hidden group hover:border-trading-gold/30 transition-all duration-500">
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

        {/* Card 6 */}
        <motion.div variants={item} className="col-span-1 lg:col-span-2 bg-gradient-to-br from-trading-card to-[#0d0e12] border border-gray-800 p-8 rounded-2xl relative overflow-hidden hover:border-trading-accent/30 transition-all duration-500 group">
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                 <div className="bg-trading-accent/10 p-3 rounded-xl text-trading-accent w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ClipboardList size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">6. Track Data Objectively</h3>
                 <p className="text-gray-400 mb-4">Memory is biased. Data is honest. Optimization comes from data, not feelings.</p>
                 <div className="flex flex-wrap gap-2">
                    {['Market Type', 'Time of Day', 'Trend Direction', 'Screenshots'].map((tag, i) => (
                       <span key={i} className="px-3 py-1 bg-black rounded border border-gray-700 text-xs text-gray-300">{tag}</span>
                    ))}
                 </div>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800 min-w-[250px] shadow-lg">
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

        {/* Card 7 */}
        <motion.div variants={item} className="bg-trading-card border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all group hover:bg-[#1a1c24]">
           <div className="bg-green-500/10 p-3 rounded-xl text-green-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield size={24} />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">7. Risk Management</h3>
           <p className="text-gray-400 text-sm mb-4">Even with 80% accuracy, you must survive the losing streaks.</p>
           <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500" /> Max 1-3% Risk per trade</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><XCircle size={16} className="text-red-500" /> NO Increasing size after wins</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><XCircle size={16} className="text-red-500" /> NO Revenge trading</li>
           </ul>
        </motion.div>

      </motion.div>

      {/* The Real Truth - Conclusion */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-20 relative"
      >
         <div className="absolute inset-0 bg-trading-gold/5 blur-3xl rounded-full"></div>
         <div className="relative bg-[#0d0e12] border-2 border-trading-gold/20 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(207,181,59,0.1)]">
            
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0d0e12] border border-trading-gold/50 text-trading-gold px-6 py-2 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg z-20">
               <Lightbulb size={18} /> The Real Truth
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-10 mt-6 relative z-10">Accuracy Improves When:</h2>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
            >
               {[
                 { t: "Trade Less", i: <MousePointerClick size={28} className="text-blue-400" />, delay: 0 },
                 { t: "Skip Unclear", i: <Ban size={28} className="text-red-400" />, delay: 0.1 },
                 { t: "No Emotions", i: <Brain size={28} className="text-purple-400" />, delay: 0.2 },
                 { t: "Filter Noise", i: <Filter size={28} className="text-yellow-400" />, delay: 0.3 },
                 { t: "Protect Speed", i: <Zap size={28} className="text-trading-gold" />, delay: 0.4 },
               ].map((item, idx) => (
                 <motion.div 
                    key={idx} 
                    variants={item}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-3 h-32"
                 >
                    <div className="bg-black/40 p-3 rounded-full border border-gray-700 shadow-inner">
                        {item.i}
                    </div>
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-wide">{item.t}</div>
                 </motion.div>
               ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 text-gray-400 text-lg italic border-t border-gray-800 pt-8"
            >
              "Most traders don’t lose because the strategy is weak. They lose because they cannot follow rules consistently."
            </motion.p>
         </div>
      </motion.div>

    </div>
  );
};

export default AccuracyGuide;