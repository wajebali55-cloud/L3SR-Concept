import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Zap, Maximize, Minimize } from 'lucide-react';

interface L3SRTimerProps {
  mode?: 'default' | 'widget';
}

const L3SRTimer: React.FC<L3SRTimerProps> = ({ mode = 'default' }) => {
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
      <div className={`w-full h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-100 ${
        isCritical ? 'bg-red-600' : 
        isDangerZone ? 'bg-[#2a0e0e]' : 'bg-black'
      }`}>
        
        {/* Widget Background Pulse */}
        {isDangerZone && (
          <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none"></div>
        )}

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 z-50">
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className="text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
           >
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>
        </div>

        {/* Activation Overlay */}
        {!isActive && (
           <div className="absolute inset-0 z-40 bg-black flex items-center justify-center cursor-pointer" onClick={initAudio}>
              <div className="flex flex-col items-center gap-4 animate-pulse">
                 <div className="p-6 rounded-full border-4 border-trading-gold/50 shadow-[0_0_50px_rgba(207,181,59,0.3)]">
                    <Zap className="text-trading-gold" size={64} />
                 </div>
                 <span className="text-trading-gold font-bold uppercase tracking-widest text-lg">Tap to Sync</span>
              </div>
           </div>
        )}

        {/* Main Display */}
        <div className={`relative z-10 flex flex-col items-center justify-center w-full transition-opacity duration-500 ${!isActive ? 'opacity-0' : 'opacity-100'}`}>
            <span className={`font-mono font-bold leading-none tracking-tighter tabular-nums select-none transition-all duration-75 ${
                isCritical ? 'text-white scale-110' : 
                isDangerZone ? 'text-red-500' : 'text-white'
            }`} style={{ fontSize: '35vw' }}>
                {secondsLeft.toString().padStart(2, '0')}
            </span>
            
            <div className={`mt-4 px-6 py-2 rounded-full font-bold uppercase tracking-[0.5em] text-sm md:text-xl transition-all ${
                isDangerZone ? 'bg-red-500 text-black animate-pulse' : 'bg-white/10 text-gray-500'
            }`}>
                {isDangerZone ? 'REJECT' : 'WAIT'}
            </div>
        </div>
      </div>
    );
  }

  // DEFAULT DASHBOARD MODE
  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isDangerZone ? 'bg-red-900/10 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.15)]' : 'bg-[#13151a] border-gray-800'}`}>
      
      {isDangerZone && (
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent animate-pulse pointer-events-none"></div>
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
           
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className="text-gray-500 hover:text-trading-gold transition-colors"
           >
             {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
           </button>
        </div>

        {/* The Big Timer */}
        <div className="relative mb-2 min-h-[160px] flex items-center justify-center">
            {!isActive ? (
                <button 
                    onClick={initAudio}
                    className="flex flex-col items-center gap-4 py-4 animate-pulse cursor-pointer group z-20"
                >
                    <div className="w-20 h-20 rounded-full border-2 border-trading-gold flex items-center justify-center group-hover:bg-trading-gold group-hover:text-black transition-all shadow-[0_0_20px_rgba(207,181,59,0.2)]">
                        <Zap size={32} />
                    </div>
                    <span className="text-sm font-bold text-trading-gold uppercase tracking-widest">Activate Timer</span>
                </button>
            ) : (
                <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                    <span className={`text-8xl md:text-9xl font-mono font-bold leading-none tracking-tighter tabular-nums transition-colors duration-100 ${
                        isDangerZone ? 'text-red-500 scale-105' : 'text-white'
                    }`}>
                        {secondsLeft === 60 ? '00' : secondsLeft.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em] mt-2">
                        Seconds Left
                    </span>
                </div>
            )}
        </div>

        {/* L3SR Label */}
        <div className={`mt-6 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
            isDangerZone 
            ? 'bg-red-500 text-black border-red-500 scale-110' 
            : isActive 
                ? 'bg-black/40 text-gray-500 border-gray-800'
                : 'bg-black/20 text-gray-700 border-gray-800 opacity-50'
        }`}>
            {isDangerZone ? 'L3SR ALERT: WATCH!' : 'Wait for :57'}
        </div>

        <p className="text-[10px] text-gray-600 mt-4 text-center max-w-[200px]">
           {isActive ? 'Synced to Atomic Clock. Resize window for widget.' : 'Timer is offline. Click Activate to sync.'}
        </p>

      </div>
    </div>
  );
};

export default L3SRTimer;