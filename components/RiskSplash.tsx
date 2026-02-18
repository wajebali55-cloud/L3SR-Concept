import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Skull, Activity, ArrowRight, Zap } from 'lucide-react';

interface RiskSplashProps {
  onEnter: () => void;
}

const RiskSplash: React.FC<RiskSplashProps> = ({ onEnter }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    setIsLeaving(true);
    // Delay actual state change to allow exit animation
    setTimeout(onEnter, 800);
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 overflow-hidden select-none font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8 }}
        >
          {/* --- BACKGROUND ATMOSPHERE --- */}
          
          {/* Red Pulse Vignette */}
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(220,38,38,0.3)_100%)] pointer-events-none"
          />
          
          {/* CRT Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
               style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}>
          </div>

          {/* Glitchy Background Text */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.02]">
             <motion.div 
               animate={{ x: [-10, 10, -10], opacity: [0.02, 0.05, 0.02] }}
               transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
               className="text-[20vw] font-black text-red-500 whitespace-nowrap"
             >
                WARNING
             </motion.div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
            
            {/* 1. Icon Animation */}
            <motion.div 
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="flex justify-center"
            >
               <div className="relative">
                 <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse"></div>
                 <AlertTriangle size={64} className="text-red-600 relative z-10" strokeWidth={1.5} />
               </div>
            </motion.div>

            {/* 2. Main Title */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tighter"
              >
                WELCOME TO <span className="text-red-600">TRADING</span>
              </motion.h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-red-900 to-transparent mx-auto"
              />
            </div>

            {/* 3. The Horror Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="relative py-4"
            >
               <p className="text-lg md:text-2xl text-gray-400 font-bold leading-relaxed tracking-wide">
                 Where you pay for every single mistake with <span className="text-red-500 inline-block border-b border-red-500/50">DOLLARS</span>
                 <br className="hidden md:block" />
                 <span className="text-sm md:text-lg text-gray-600 font-normal mt-2 block uppercase tracking-[0.2em]">Not Apologies.</span>
               </p>
            </motion.div>

            {/* 4. Psychological Trigger */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg backdrop-blur-sm mx-auto max-w-md"
            >
               <div className="flex items-center gap-3 justify-center text-red-400">
                  <Activity size={18} className="animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-bold">High Risk Environment Detected</span>
               </div>
            </motion.div>

            {/* 5. The Button */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }} // Delayed to force them to read
              className="pt-8"
            >
              <button 
                onClick={handleEnter}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-red-600 text-red-600 hover:text-white border border-red-600 rounded-none transition-all duration-300 uppercase tracking-[0.2em] font-bold text-sm md:text-base overflow-hidden"
              >
                {/* Glitch overlay on hover */}
                <div className="absolute inset-0 w-full h-full bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10"></div>
                
                <span className="relative z-10 flex items-center gap-2">
                  <Skull size={18} className="group-hover:animate-[shake_0.5s_infinite]" />
                  I Accept The Risk
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                className="text-[10px] text-gray-700 mt-4 uppercase tracking-widest"
              >
                Enter at your own peril
              </motion.p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RiskSplash;