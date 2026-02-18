import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Zap, Maximize, Minimize, Expand, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface L3SRTimerProps {
  mode?: 'default' | 'widget';
  onToggleMode?: () => void;
}

// 1. Silent Audio to keep browser Audio Engine active in background (Base64 WAV)
const SILENCE_URL = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

// 2. Web Worker Script (Runs in background thread, unthrottled)
const WORKER_SCRIPT = `
let intervalId;
self.onmessage = function(e) {
  if (e.data === 'START') {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      self.postMessage('TICK');
    }, 100); // Check every 100ms
  } else if (e.data === 'STOP') {
    if (intervalId) clearInterval(intervalId);
  }
};
`;

const L3SRTimer: React.FC<L3SRTimerProps> = ({ mode = 'default', onToggleMode }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastPlayedSecondRef = useRef<number | null>(null);
  const isMutedRef = useRef(isMuted);
  const workerRef = useRef<Worker | null>(null);
  const silentAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Logic Ref (To access latest state inside Worker callback)
  const tickLogicRef = useRef<() => void>(() => {});

  // Sync Mute State
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // --- WORKER SETUP ---
  useEffect(() => {
    // Create Worker from Blob
    const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    // Listen for ticks
    workerRef.current.onmessage = (e) => {
      if (e.data === 'TICK') {
        tickLogicRef.current(); // Call the latest logic
      }
    };

    // Prepare Silent Audio
    silentAudioRef.current = new Audio(SILENCE_URL);
    silentAudioRef.current.loop = true;

    return () => {
      workerRef.current?.terminate();
      silentAudioRef.current?.pause();
    };
  }, []);

  // --- AUDIO ENGINE ---
  const initAudio = async () => {
    try {
      // 1. Web Audio API Context
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      // 2. Start Silent Loop (Keeps tab active on Mobile/Safari)
      if (silentAudioRef.current) {
        silentAudioRef.current.play().catch(() => {
           console.log("Silent audio start failed"); 
        });
      }

      // 3. Play warm-up tone
      playTone(600, 'sine', 0.1);
      
      setIsActive(true);
    } catch (e) {
      console.error("Audio init failed", e);
    }
  };

  const playTone = (freq: number, type: 'sine' | 'square' | 'sawtooth', duration: number) => {
    if (isMutedRef.current || !audioCtxRef.current) return;
    
    // Resume context if browser suspended it
    if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }

    try {
      const t = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      
      // VOLUME CONFIG: MAX HIGH
      // Sine waves set to 1.0 (100%).
      // Square waves set to 0.6 because they are naturally louder/harsher and distort if set to 1.0.
      const volume = type === 'square' ? 0.6 : 1.0; 

      // Better Envelope: Attack -> Sustain -> Release
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume, t + 0.05); // Rapid attack to max volume
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration); // Smooth decay

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start(t);
      osc.stop(t + duration + 0.1); // Stop slightly after decay
    } catch (e) {
      console.error("Play tone error", e);
    }
  };

  // --- TIMER LOGIC (Called by Worker) ---
  const handleTick = () => {
      const now = new Date();
      const currentSecond = now.getSeconds();
      const remaining = 60 - currentSecond;
      const displaySec = remaining === 60 ? 0 : remaining; // Display 00 at 60
      
      setSecondsLeft(prev => prev !== displaySec ? displaySec : prev);

      // --- AUDIO TRIGGERS ---
      // We check 'remaining' which represents seconds left until the next minute.
      // 4 = :56 (Yellow Visual Only), 3 = :57 (Sound), 2 = :58 (Sound), 1 = :59 (Sound)
      if (remaining <= 4 && remaining >= 1) {
          // Play only if we haven't played this second yet
          if (lastPlayedSecondRef.current !== remaining) {
              lastPlayedSecondRef.current = remaining;
              
              // REMOVED 4s SOUND (Visuals handled in render)
              if (remaining === 3) playTone(600, 'sine', 0.2);  // :57 - L3SR Start
              else if (remaining === 2) playTone(800, 'sine', 0.2);  // :58 - Warning
              else if (remaining === 1) playTone(1200, 'square', 0.5); // :59 - EXECUTE
          }
      } else {
          // Reset logic when we are outside the danger zone (e.g., :00 to :55)
          // Use a range check to be safe
          if (remaining > 5 || remaining === 60) {
              if (lastPlayedSecondRef.current !== null) {
                  lastPlayedSecondRef.current = null;
              }
          }
      }
      
      // Safety: Ensure Context is running
      if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume();
      }
  };

  // Keep ref updated
  useEffect(() => {
    tickLogicRef.current = handleTick;
  }, []); // Logic doesn't depend on closure state other than refs/setters

  // Start/Stop Worker based on Active State
  useEffect(() => {
    if (isActive) {
      workerRef.current?.postMessage('START');
    } else {
      workerRef.current?.postMessage('STOP');
      if (silentAudioRef.current) {
        silentAudioRef.current.pause();
        silentAudioRef.current.currentTime = 0;
      }
      setSecondsLeft(0);
      lastPlayedSecondRef.current = null;
    }
  }, [isActive]);


  // --- RENDER HELPERS ---
  const isDangerZone = isActive && secondsLeft <= 3 && secondsLeft >= 1;
  const isCritical = isActive && secondsLeft === 1; 
  const isPreAlert = isActive && secondsLeft === 4;
  
  if (mode === 'widget') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`w-full h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-100 ${
        isCritical ? 'bg-red-600' : 
        isDangerZone ? 'bg-[#2a0e0e]' : 
        isPreAlert ? 'bg-yellow-900/40' : 'bg-black'
      }`}>
        
        {isDangerZone && (
          <motion.div 
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/20 pointer-events-none"
          ></motion.div>
        )}

        {isPreAlert && (
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-yellow-500/10 pointer-events-none"
          ></motion.div>
        )}

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

        <div className={`relative z-10 flex flex-col items-center justify-center w-full h-full transition-opacity duration-500 ${!isActive ? 'opacity-0' : 'opacity-100'}`}>
            <motion.span 
               key={secondsLeft}
               initial={{ scale: 1.1, opacity: 0.8 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
               className={`font-mono font-bold leading-none tracking-tighter tabular-nums select-none transition-colors duration-75 ${
                isCritical ? 'text-white' : 
                isDangerZone ? 'text-red-500' : 
                isPreAlert ? 'text-yellow-400' : 'text-white'
            }`} style={{ fontSize: '45vmin', lineHeight: '1' }}>
                {secondsLeft.toString().padStart(2, '0')}
            </motion.span>
            
            <motion.div 
              animate={isDangerZone ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={isDangerZone ? { duration: 0.5, repeat: Infinity } : {}}
              className={`mt-[2vmin] px-6 py-2 rounded-full font-bold uppercase tracking-[0.5em] transition-all ${
                isDangerZone ? 'bg-red-500 text-black' : 
                isPreAlert ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-gray-500'
            }`} style={{ fontSize: '4vmin' }}>
                {isDangerZone ? 'REJECT' : isPreAlert ? 'READY' : 'WAIT'}
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
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isDangerZone ? 'bg-red-900/10 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.15)]' : 
        isPreAlert ? 'bg-yellow-900/10 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.15)]' :
        'bg-[#13151a] border-gray-800'
      }`}
    >
      
      {isDangerZone && (
        <motion.div 
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none"
        ></motion.div>
      )}

      {isPreAlert && (
        <motion.div 
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"
        ></motion.div>
      )}

      <div className="p-6 flex flex-col items-center justify-center relative z-10">
        
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
               className={`transition-colors ${isMuted ? 'text-red-500' : 'text-gray-500 hover:text-trading-gold'}`}
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

        <div className="relative mb-2 min-h-[120px] md:min-h-[160px] flex items-center justify-center">
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
                       className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-trading-gold flex items-center justify-center group-hover:bg-trading-gold group-hover:text-black transition-all"
                    >
                        <Zap size={24} className="md:w-8 md:h-8" />
                    </motion.div>
                    <span className="text-sm font-bold text-trading-gold uppercase tracking-widest">Activate Timer</span>
                </motion.button>
            ) : (
                <div className="flex flex-col items-center">
                    <motion.span 
                        key={secondsLeft} 
                        initial={{ y: 5, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 800, damping: 30 }}
                        className={`text-7xl sm:text-8xl md:text-9xl font-mono font-bold leading-none tracking-tighter tabular-nums transition-colors duration-100 ${
                        isDangerZone ? 'text-red-500' : 
                        isPreAlert ? 'text-yellow-400' : 'text-white'
                    }`}>
                        {secondsLeft === 60 ? '00' : secondsLeft.toString().padStart(2, '0')}
                    </motion.span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.5em] mt-2">
                        Seconds Left
                    </span>
                </div>
            )}
        </div>

        <motion.div 
            animate={
              isDangerZone ? { scale: 1.1, backgroundColor: "#ef4444", color: "#000000", borderColor: "#ef4444" } : 
              isPreAlert ? { scale: 1.05, backgroundColor: "rgba(234, 179, 8, 0.2)", color: "#facc15", borderColor: "#facc15" } :
              {}
            }
            className={`mt-4 md:mt-6 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
             isActive 
                ? 'bg-black/40 text-gray-500 border-gray-800'
                : 'bg-black/20 text-gray-700 border-gray-800 opacity-50'
        }`}>
            {isDangerZone ? 'L3SR ALERT: WATCH!' : isPreAlert ? 'GET READY...' : 'Wait for :57'}
        </motion.div>

        <p className="text-[10px] text-gray-600 mt-4 text-center max-w-[200px]">
           {isActive ? 'Synced to Atomic Clock. Click Expand icon for pop-out mode.' : 'Timer is offline. Click Activate to sync.'}
        </p>

      </div>
    </motion.div>
  );
};

export default L3SRTimer;