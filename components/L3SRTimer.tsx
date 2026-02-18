import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Zap, Maximize, Minimize, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface L3SRTimerProps {
  mode?: 'default' | 'widget';
  onToggleMode?: () => void;
}

const L3SRTimer: React.FC<L3SRTimerProps> = ({ mode = 'default', onToggleMode }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastPlayedSecondRef = useRef<number | null>(null);

  // Initialize Audio & Start Timer
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsActive(true);
  };

  const playTone = (freq: number, type: 'sine' | 'square' | 'sawtooth', duration: number) => {
    if (isMuted || !audioCtxRef.current || !isActive) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(audioCtxRef.current.currentTime + duration);
  };

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      // CRITICAL UPDATE: If not active, do not calculate seconds, do not play sound.
      if (!isActive) {
        setSecondsLeft(0);
        animationFrameId = requestAnimationFrame(tick); // Keep loop ready, but idle
        return; 
      }

      const now = new Date();
      const currentSecond = now.getSeconds();
      
      // Calculate remaining seconds in the current minute
      const remaining = 60 - currentSecond;
      const displaySec = remaining === 60 ? 0 : remaining;
      
      // Update UI state
      setSecondsLeft(displaySec);

      // --- L3SR AUDIO LOGIC ---
      // Expanded to include 4s (Pre-Alert)
      if (remaining <= 4 && remaining >= 1) {
          if (lastPlayedSecondRef.current !== remaining) {
              lastPlayedSecondRef.current = remaining;
              
              if (remaining === 4) playTone(440, 'sine', 0.15); // 56s - Pre-Alert (Soft Warning)
              if (remaining === 3) playTone(600, 'sine', 0.1); // 57s - Alert (L3SR Start)
              if (remaining === 2) playTone(800, 'sine', 0.1); // 58s - Warning
              if (remaining === 1) playTone(1200, 'square', 0.4); // 59s - EXECUTE
          }
      } else {
          if (remaining > 4) {
              lastPlayedSecondRef.current = null;
          }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, isMuted]);

  // Visual Helper States
  // Only show danger zone effects if Active
  // Visuals still focus on the "Last 3 Seconds" rule to avoid confusion
  const isDangerZone = isActive && secondsLeft <= 3 && secondsLeft >= 1;
  const isCritical = isActive && secondsLeft === 1; // The exact moment
  
  // Widget Mode Styles
  if (mode === 'widget') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`w-full h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-100 ${
        isCritical ? 'bg-red-600' : 
        isDangerZone ? 'bg-[#2a0e0e]' : 'bg-black'
      }`}>
        
        {/* Widget Background Pulse */}
        {isDangerZone && (
          <motion.div 
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/20 pointer-events-none"
          ></motion.div>
        )}

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setIsMuted(!isMuted)}
             className="text-white/50 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-sm"
             title={isMuted ? "Unmute" : "Mute"}
           >
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </motion.button>
           
           {onToggleMode && (
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={onToggleMode}
               className="text-white/50 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-sm"
               title="Exit Widget Mode"
             >
               <Minimize size={20} />
             </motion.button>
           )}
        </div>

        {/* Activation Overlay */}
        {!isActive && (
           <div className="absolute inset-0 z-40 bg-black flex items-center justify-center cursor-pointer" onClick={initAudio}>
              <div className="flex flex-col items-center gap-4 px-4 text-center">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], borderColor: ['rgba(207,181,59,0.5)', 'rgba(207,181,59,1)', 'rgba(207,181,59,0.5)'] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="p-4 md:p-6 rounded-full border-4 border-trading-gold/50 shadow-[0_0_50px_rgba(207,181,59,0.3)]"
                 >
                    <Zap className="text-trading-gold" size={48} />
                 </motion.div>
                 <span className="text-trading-gold font-bold uppercase tracking-widest text-sm md:text-lg">Tap to Sync</span>
              </div>
           </div>
        )}

        {/* Main Display */}
        <div className={`relative z-10 flex flex-col items-center justify-center w-full h-full transition-opacity duration-500 ${!isActive ? 'opacity-0' : 'opacity-100'}`}>
            {/* 
                Use vmin for font-size. 
                This ensures the text fits whether the window is tall (mobile) or wide (strip). 
                40vmin means 40% of the *smallest* dimension.
            */}
            <motion.span 
               key={secondsLeft}
               initial={{ scale: 1.1, opacity: 0.8 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
               className={`font-mono font-bold leading-none tracking-tighter tabular-nums select-none transition-all duration-75 ${
                isCritical ? 'text-white' : 
                isDangerZone ? 'text-red-500' : 'text-white'
            }`} style={{ fontSize: '45vmin', lineHeight: '1' }}>
                {secondsLeft.toString().padStart(2, '0')}
            </motion.span>
            
            <motion.div 
              animate={isDangerZone ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={isDangerZone ? { duration: 0.5, repeat: Infinity } : {}}
              className={`mt-[2vmin] px-6 py-2 rounded-full font-bold uppercase tracking-[0.5em] transition-all ${
                isDangerZone ? 'bg-red-500 text-black' : 'bg-white/10 text-gray-500'
            }`} style={{ fontSize: '4vmin' }}>
                {isDangerZone ? 'REJECT' : 'WAIT'}
            </motion.div>
        </div>
      </motion.div>
    );
  }

  // DEFAULT DASHBOARD MODE
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isDangerZone ? 'bg-red-900/10 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.15)]' : 'bg-[#13151a] border-gray-800'}`}
    >
      
      {isDangerZone && (
        <motion.div 
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none"
        ></motion.div>
      )}

      <div className="p-6 flex flex-col items-center justify-center relative z-10">
        
        {/* Header */}
        <div className="w-full flex justify-between items-start mb-4">
           <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-green-500' : 'text-red-500'}`}>
                {isActive ? 'Atomic Sync: ON' : 'Sync Required'}
              </span>
           </div>
           
           <div className="flex items-center gap-3">
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsMuted(!isMuted)}
               className="text-gray-500 hover:text-trading-gold transition-colors"
               title={isMuted ? "Unmute" : "Mute"}
             >
               {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
             </motion.button>
             
             {onToggleMode && (
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={onToggleMode}
                 className="text-gray-500 hover:text-trading-gold transition-colors"
                 title="Enter Widget Mode"
               >
                 <Expand size={16} />
               </motion.button>
             )}
           </div>
        </div>

        {/* The Big Timer */}
        <div className="relative mb-2 min-h-[160px] flex items-center justify-center">
            {!isActive ? (
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={initAudio}
                    className="flex flex-col items-center gap-4 py-4 cursor-pointer group z-20"
                >
                    <motion.div 
                       animate={{ boxShadow: ['0 0 20px rgba(207,181,59,0.2)', '0 0 40px rgba(207,181,59,0.5)', '0 0 20px rgba(207,181,59,0.2)'] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       className="w-20 h-20 rounded-full border-2 border-trading-gold flex items-center justify-center group-hover:bg-trading-gold group-hover:text-black transition-all"
                    >
                        <Zap size={32} />
                    </motion.div>
                    <span className="text-sm font-bold text-trading-gold uppercase tracking-widest">Activate Timer</span>
                </motion.button>
            ) : (
                <div className="flex flex-col items-center">
                    <motion.span 
                        key={secondsLeft} // Key prop triggers re-animation on change
                        initial={{ y: 5, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 800, damping: 30 }}
                        className={`text-8xl md:text-9xl font-mono font-bold leading-none tracking-tighter tabular-nums transition-colors duration-100 ${
                        isDangerZone ? 'text-red-500' : 'text-white'
                    }`}>
                        {secondsLeft === 60 ? '00' : secondsLeft.toString().padStart(2, '0')}
                    </motion.span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em] mt-2">
                        Seconds Left
                    </span>
                </div>
            )}
        </div>

        {/* L3SR Label */}
        <motion.div 
            animate={isDangerZone ? { scale: 1.1, backgroundColor: "#ef4444", color: "#000000", borderColor: "#ef4444" } : {}}
            className={`mt-6 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
             isActive 
                ? 'bg-black/40 text-gray-500 border-gray-800'
                : 'bg-black/20 text-gray-700 border-gray-800 opacity-50'
        }`}>
            {isDangerZone ? 'L3SR ALERT: WATCH!' : 'Wait for :57'}
        </motion.div>

        <p className="text-[10px] text-gray-600 mt-4 text-center max-w-[200px]">
           {isActive ? 'Synced to Atomic Clock. Click Expand icon for pop-out mode.' : 'Timer is offline. Click Activate to sync.'}
        </p>

      </div>
    </motion.div>
  );
};

export default L3SRTimer;