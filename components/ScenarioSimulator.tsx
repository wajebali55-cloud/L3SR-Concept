import React, { useState, useEffect, useRef } from 'react';
import { Trophy, RefreshCw, Heart, ArrowUp, ArrowDown, Play, Timer, Zap, XCircle, CheckCircle, Ban, Volume2, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Certificate from './Certificate';

interface ScenarioSimulatorProps {
  lang?: 'en' | 'ur';
}

// --- REFLEX DRILL DATA WITH TRANSLATIONS ---
const DRILL_SCENARIOS = [
  {
    id: 1,
    level: 'RESISTANCE',
    last3s: 'PUSH_UP', 
    correct: 'SELL',
    hint: "Price EXPLODED Upwards at Resistance!",
    hintUR: "Price Resistance par tezi se OOPER phati!",
    explanation: "Rejection Rule: When price sprints into a wall (Resistance) in the last 3 seconds, it will likely bounce back. Push UP = Trade DOWN.",
    explanationUR: "Rejection Rule: Jab price akhri 3 seconds mein deewar (Resistance) se takrati hai, to wapis palat ti hai. Push UP = Trade DOWN."
  },
  {
    id: 2,
    level: 'SUPPORT',
    last3s: 'PUSH_DOWN', 
    correct: 'BUY',
    hint: "Price Crashed into the Floor!",
    hintUR: "Price farsh (Support) par gir gayi!",
    explanation: "Rejection Rule: The sellers exhausted themselves trying to break the floor. Push DOWN = Trade UP.",
    explanationUR: "Rejection Rule: Sellers ne floor tornay mein jaan laga di. Push DOWN = Trade UP."
  },
  {
    id: 3,
    level: 'RESISTANCE',
    last3s: 'STALL', // TRAP SCENARIO
    correct: 'NO_TRADE',
    hint: "Movement is weak and indecisive.",
    hintUR: "Movement kamzor hai, faisla nahi ho raha.",
    explanation: "TRAP AVOIDED! The price didn't push hard enough. Weak move = No Trade.",
    explanationUR: "TRAP AVOIDED! Price ne zor se push nahi kiya. Kamzor move = No Trade."
  },
  {
    id: 4,
    level: 'SUPPORT',
    last3s: 'PUSH_DOWN',
    correct: 'BUY',
    hint: "Sellers are panic dumping into support.",
    hintUR: "Sellers ghabra kar support par dump kar rahay hain.",
    explanation: "Panic selling at support usually results in a snap-back buy.",
    explanationUR: "Support par panic selling aksar foran wapis buy mein badal jati hai."
  },
  {
    id: 5,
    level: 'SUPPORT',
    last3s: 'STALL', // TRAP SCENARIO
    correct: 'NO_TRADE',
    hint: "Just drifting sideways.",
    hintUR: "Bas sideways chal rahi hai.",
    explanation: "Good discipline. We only trade clear, strong explosions. Drifting = Gambling.",
    explanationUR: "Acha discipline. Hum sirf taqatwar explosions par trade karte hain. Drifting = Juwa."
  },
  {
    id: 6,
    level: 'RESISTANCE',
    last3s: 'PUSH_UP',
    correct: 'SELL',
    hint: "Another heavy push into the ceiling.",
    hintUR: "Ceiling (Chatt) par aik aur bhaari push.",
    explanation: "Consistency is key. See the push? Trust the rejection.",
    explanationUR: "Consistency zaroori hai. Push dekha? Rejection par bharosa rakhein."
  }
];

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ lang = 'en' }) => {
  // User Identity State
  const [userName, setUserName] = useState('');
  const [tempName, setTempName] = useState('');

  // Game State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5.00);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  
  // Round State
  const [roundState, setRoundState] = useState<'WAIT' | 'ACTION' | 'RESULT' | 'MISSED'>('WAIT');
  const [feedback, setFeedback] = useState<{title: string, desc: string, isWin: boolean} | null>(null);

  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentScenario = DRILL_SCENARIOS[currentIdx];

  // --- AUDIO ENGINE ---
  const playAlert = () => {
    try {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.1);
    } catch (e) {
        console.error("Audio error", e);
    }
  };

  useEffect(() => {
    if (roundState === 'ACTION') {
        playAlert();
    }
  }, [roundState]);

  // --- GAME LOOP ---
  const startRound = () => {
    setRoundState('WAIT');
    setTimeLeft(5.00);
    setFeedback(null);
    setIsPlaying(true);
    if (timerRef.current) clearInterval(timerRef.current);
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 5 - (elapsed / 1000));
      setTimeLeft(remaining);
      if (remaining <= 3.0 && remaining > 0) {
         setRoundState(prev => {
             if (prev === 'WAIT') return 'ACTION';
             return prev;
         });
      }
      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (currentScenario.correct === 'NO_TRADE') {
             handleTrade('NO_TRADE', true); 
        } else {
             handleMissed();
        }
      }
    }, 10); 
  };

  const handleMissed = () => {
    setRoundState('MISSED');
    setLives(l => l - 1);
    setStreak(0);
  };

  const handleTrade = (action: 'BUY' | 'SELL' | 'NO_TRADE', forcedByTimeout = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!forcedByTimeout && timeLeft > 3.0 && action !== 'NO_TRADE') {
       setFeedback({
         title: lang === 'en' ? "TOO EARLY!" : "BOHOT JALDI!",
         desc: lang === 'en' ? "You must wait for the Last 3 Seconds (and the beep) to see the move." : "Apko akhri 3 seconds (aur beep) ka intezar karna hoga.",
         isWin: false
       });
       setRoundState('RESULT');
       setStreak(0);
       return;
    }

    const isWin = action === currentScenario.correct;
    
    if (isWin) {
       setScore(s => s + 100 + (streak * 20));
       setStreak(s => s + 1);
       setFeedback({
         title: action === 'NO_TRADE' ? (lang === 'en' ? "TRAP AVOIDED!" : "TRAP SE BACH GAYE!") : (lang === 'en' ? "PERFECT ENTRY" : "BEHTAREEN ENTRY"),
         desc: lang === 'en' ? currentScenario.explanation : currentScenario.explanationUR,
         isWin: true
       });
    } else {
       setLives(l => l - 1);
       setStreak(0);
       let wrongMsg = "";
       if (currentScenario.correct === 'NO_TRADE') {
           wrongMsg = lang === 'en' ? "You forced a trade! The market was weak/choppy. You should have SKIPPED." : "Ap ne zabardasti trade li! Market kamzor thi. Apko SKIP karna chahiye tha.";
       } else if (action === 'NO_TRADE') {
           wrongMsg = lang === 'en' ? `You missed a valid setup! Market pushed ${currentScenario.last3s.replace('_', ' ')}.` : `Ap ne valid setup miss kar diya! Market ne ${currentScenario.last3s.replace('_', ' ')} push kiya tha.`;
       } else {
           wrongMsg = lang === 'en' ? `Wrong direction! Market pushed ${currentScenario.last3s === 'PUSH_UP' ? 'UP' : 'DOWN'}, so trade ${currentScenario.correct}.` : `Ghalat direction! Market ne ${currentScenario.last3s === 'PUSH_UP' ? 'OOPER' : 'NECHY'} push kiya, is liye ${currentScenario.correct} karein.`;
       }
       
       setFeedback({
         title: lang === 'en' ? "WRONG DECISION" : "GHALAT FAISLA",
         desc: wrongMsg,
         isWin: false
       });
    }
    setRoundState('RESULT');
  };

  const nextLevel = () => {
     if (lives <= 0) {
       setLives(3);
       setScore(0);
       setStreak(0);
       setCurrentIdx(0);
       setIsPlaying(false);
       setFeedback(null);
     } else if (currentIdx < DRILL_SCENARIOS.length - 1) {
       setCurrentIdx(c => c + 1);
       startRound();
     } else {
       setIsPlaying(false);
       setFeedback({ 
           title: lang === 'en' ? "Course Complete" : "Course Mukammal", 
           desc: lang === 'en' ? "You have mastered the reflexes." : "Ap ne reflexes par maharat hasil kar li.", 
           isWin: true 
       });
     }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim().length > 0) {
      setUserName(tempName.trim());
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // --- RENDERERS ---

  if (lives <= 0) {
     return (
        <div className="w-full max-w-2xl mx-auto py-12 px-4 text-center">
             <div className="bg-trading-card border border-red-500/30 p-8 md:p-12 rounded-3xl">
                <div className="text-6xl mb-6">💀</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{lang === 'en' ? 'GAME OVER' : 'KHEL KHATAM'}</h2>
                <p className="text-lg text-gray-400 mb-8">{lang === 'en' ? 'Reflexes too slow or strategy incorrect.' : 'Reflexes bohot sust ya strategy ghalat thi.'}</p>
                <div className="text-2xl font-mono text-trading-gold mb-8">{lang === 'en' ? 'Final Score:' : 'Akhri Score:'} {score}</div>
                <button onClick={nextLevel} className="bg-white text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto cursor-pointer">
                    <RefreshCw /> {lang === 'en' ? 'Try Again' : 'Dobara Koshish Karein'}
                </button>
             </div>
        </div>
     );
  }

  if (!isPlaying && (feedback?.title === "Course Complete" || feedback?.title === "Course Mukammal")) {
     return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col items-center animate-in fade-in duration-500">
             <div className="bg-trading-card border border-trading-gold/30 p-8 rounded-3xl w-full text-center mb-8 shadow-[0_0_50px_rgba(207,181,59,0.1)]">
                 <Trophy size={64} className="text-trading-gold mx-auto mb-4 animate-bounce" />
                 <h2 className="text-3xl font-bold text-white mb-2">{lang === 'en' ? 'Drill Mastered!' : 'Drill Mastered!'}</h2>
                 <p className="text-gray-400 mb-6">{lang === 'en' ? 'You have successfully identified all market scenarios.' : 'Ap ne tamam market scenarios ko pehchan liya hai.'}</p>
                 <div className="text-4xl font-mono text-trading-gold font-bold mb-2">{score} pts</div>
             </div>
             <Certificate 
                userName={userName}
                onRestart={() => {
                  setLives(3);
                  setScore(0);
                  setStreak(0);
                  setCurrentIdx(0);
                  setIsPlaying(false);
                  setFeedback(null);
             }} />
        </div>
     );
  }

  if (!userName && !isPlaying) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-4">
        <div className="bg-trading-card border border-gray-800 p-8 rounded-3xl shadow-2xl">
           <div className="text-center mb-8">
              <div className="w-16 h-16 bg-trading-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-trading-gold border border-trading-gold/30">
                 <User size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">{lang === 'en' ? 'Identity Verification' : 'Pehchan Ki Tasdeeq'}</h2>
              <p className="text-gray-400 text-sm mt-2">{lang === 'en' ? 'Enter your name for the official certificate.' : 'Official certificate ke liye apna naam likhein.'}</p>
           </div>

           <form onSubmit={handleNameSubmit} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{lang === 'en' ? 'Full Name / Alias' : 'Pura Naam'}</label>
                 <input 
                   type="text" 
                   value={tempName}
                   onChange={(e) => setTempName(e.target.value)}
                   placeholder="e.g. Alex Trader"
                   className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:border-trading-gold focus:ring-1 focus:ring-trading-gold/20 outline-none transition-all text-center"
                   autoFocus
                 />
              </div>
              <button 
                type="submit"
                disabled={tempName.trim().length < 2}
                className="w-full bg-trading-gold text-black font-bold py-4 rounded-xl hover:bg-[#bba02a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,181,59,0.2)]"
              >
                 {lang === 'en' ? 'Continue' : 'Agay Barhein'} <ChevronRight size={20} />
              </button>
           </form>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
      return (
        <div className="w-full max-w-2xl mx-auto py-12 px-4 text-center">
             <div className="bg-trading-card border border-trading-gold/30 p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-trading-gold/5 animate-pulse pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <Trophy size={64} className="text-trading-gold mx-auto mb-6" />
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-2">REFLEX DRILL</h2>
                    <p className="text-trading-gold font-mono mb-6 uppercase tracking-wider text-sm">{lang === 'en' ? 'Welcome' : 'Khushamdeed'}, {userName}</p>
                    
                    <p className="text-base md:text-lg text-gray-400 mb-8 max-w-md mx-auto">
                       {lang === 'en' ? 'Fast-paced simulation. 5 seconds per candle.' : 'Tez simulation. Har candle ke liye 5 seconds.'}
                       <br/><br/>
                       <strong className="text-white">{lang === 'en' ? 'The Challenge:' : 'Challenge:'}</strong>
                       <br/>
                       0s - 3s: {lang === 'en' ? 'Candle will move randomly (Noise).' : 'Candle randomly move kare gi (Shor).'} <span className="text-yellow-500">{lang === 'en' ? 'Do Not Click.' : 'Click mat karein.'}</span>
                       <br/>
                       @ 3s (Beep): {lang === 'en' ? 'Candle makes the REAL move.' : 'Candle ASAL move kare gi.'} <span className="text-green-500">{lang === 'en' ? 'React Now!' : 'Ab React Karein!'}</span>
                    </p>
                    <button onClick={startRound} className="bg-trading-gold text-black font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform text-xl flex items-center justify-center gap-3 mx-auto shadow-[0_0_30px_rgba(207,181,59,0.4)] cursor-pointer">
                        <Play fill="black" /> {lang === 'en' ? 'START DRILL' : 'DRILL SHURU KAREIN'}
                    </button>
                </div>
             </div>
        </div>
      );
  }

  // --- ANIMATION LOGIC ---
  const getCandleAnimation = () => {
      if (roundState === 'WAIT') {
          return {
              height: [40, 50, 35, 45, 40, 55, 38, 40],
              y: [0, -5, 5, -3, 3, -6, 2, 0], 
              backgroundColor: '#4b5563', 
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          };
      }
      if (roundState === 'ACTION') {
        switch(currentScenario.last3s) {
            case 'PUSH_UP': 
                return { 
                    height: [40, 150, 120, 180, 170, 180], 
                    backgroundColor: '#22c55e', 
                    y: [0, -50, -35, -60, -55, -60], 
                    transition: { duration: 2.5, times: [0, 0.15, 0.4, 0.7, 0.85, 1], ease: "easeInOut" }
                };
            case 'PUSH_DOWN':
                return { 
                    height: [40, 150, 120, 180, 170, 180],
                    backgroundColor: '#ef4444', 
                    y: [0, 50, 35, 60, 55, 60], 
                    transition: { duration: 2.5, times: [0, 0.15, 0.4, 0.7, 0.85, 1], ease: "easeInOut" }
                };
            case 'STALL':
                return { 
                    height: [40, 60, 30, 50, 40, 45], 
                    backgroundColor: '#9ca3af', 
                    y: [0, -10, 5, -5, 0, 2], 
                    transition: { duration: 2.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" }
                };
            default:
                return { height: 40, backgroundColor: '#4b5563', y: 0 };
        }
      }
      return { height: 40, backgroundColor: '#4b5563', y: 0 };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 flex flex-col items-center justify-center min-h-[500px]">
      
      <div className="w-full flex flex-wrap justify-between items-center mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800 gap-4">
         <div className="flex items-center gap-1">
            {[1,2,3].map(i => (
                <Heart key={i} size={20} className={i <= lives ? "fill-red-500 text-red-500" : "text-gray-800"} />
            ))}
         </div>
         <div className="text-xl md:text-2xl font-black font-mono text-white tracking-widest order-last md:order-none w-full md:w-auto text-center">
            {score.toString().padStart(5, '0')}
         </div>
         <div className="flex items-center gap-2 text-orange-500 font-bold">
            <Zap size={20} fill="currentColor" /> {streak}x
         </div>
      </div>

      <div className="relative w-full max-w-[350px] aspect-square bg-[#0f1115] rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden flex flex-col mx-auto">
         
         <div className={`h-12 w-full flex items-center justify-center border-b border-white/5 transition-colors duration-300 ${currentScenario.level === 'RESISTANCE' ? 'bg-red-900/20 border-red-500/30' : ''}`}>
             {currentScenario.level === 'RESISTANCE' && <span className="text-[10px] font-bold text-red-500 bg-black/50 px-2 py-1 rounded">RESISTANCE</span>}
         </div>

         <div className="flex-1 relative flex items-center justify-center">
             
             <div className="relative flex flex-col items-center justify-center w-20">
                 <div className="absolute w-0.5 h-48 bg-gray-700 z-0"></div>
                 <motion.div 
                    key={currentIdx + roundState} 
                    initial={roundState === 'WAIT' ? { height: 40, backgroundColor: '#4b5563', y: 0 } : false}
                    animate={getCandleAnimation()}
                    className="w-6 md:w-8 z-10 rounded-sm shadow-lg relative"
                 >
                     {roundState === 'ACTION' && currentScenario.last3s !== 'STALL' && (
                         <div className={`absolute inset-0 blur-lg opacity-50 ${currentScenario.last3s === 'PUSH_UP' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                     )}
                 </motion.div>
             </div>

             {roundState === 'MISSED' && (
                 <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4 text-center">
                    <Timer size={48} className="text-gray-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">{lang === 'en' ? 'TIME UP!' : 'WAQT KHATAM!'}</h2>
                    <p className="text-gray-400 mb-6 text-sm">{lang === 'en' ? 'You hesitated.' : 'Ap hichkichaye.'}</p>
                    <button onClick={nextLevel} className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm cursor-pointer hover:scale-105 transition-transform">{lang === 'en' ? 'Next Candle' : 'Agli Candle'}</button>
                 </div>
             )}

             {roundState === 'RESULT' && feedback && (
                 <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4 text-center animate-in fade-in zoom-in duration-300">
                    {feedback.isWin ? <CheckCircle size={56} className="text-green-500 mb-4" /> : <XCircle size={56} className="text-red-500 mb-4" />}
                    <h2 className={`text-2xl font-bold mb-2 ${feedback.isWin ? 'text-green-500' : 'text-red-500'}`}>{feedback.title}</h2>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{feedback.desc}</p>
                    <button onClick={nextLevel} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform text-sm cursor-pointer">
                        {lang === 'en' ? 'Next Scenario' : 'Agla Scenario'}
                    </button>
                 </div>
             )}

         </div>

         <div className={`h-12 w-full flex items-center justify-center border-t border-white/5 transition-colors duration-300 ${currentScenario.level === 'SUPPORT' ? 'bg-green-900/20 border-green-500/30' : ''}`}>
             {currentScenario.level === 'SUPPORT' && <span className="text-[10px] font-bold text-green-500 bg-black/50 px-2 py-1 rounded">SUPPORT</span>}
         </div>

      </div>

      <div className="w-full mt-6">
          
          <div className="flex flex-col items-center mb-4">
             <div className={`text-4xl md:text-5xl font-black font-mono tabular-nums tracking-tighter transition-colors duration-100 ${
                 timeLeft <= 3.0 ? 'text-red-500 scale-110' : 'text-gray-400'
             }`}>
                {timeLeft.toFixed(2)}s
             </div>
             {timeLeft > 3.0 ? (
                 <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.3em] animate-pulse mt-1">{lang === 'en' ? 'Wait for Move...' : 'Move ka intezar...'}</span>
             ) : (
                 <span className="text-sm font-black text-red-500 uppercase tracking-[0.2em] animate-bounce mt-1 flex items-center gap-2">
                    <Volume2 size={14} /> {lang === 'en' ? 'ACT NOW!' : 'ABHI KARO!'}
                 </span>
             )}
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
              
              <button 
                onClick={() => handleTrade('BUY')}
                disabled={roundState === 'RESULT' || roundState === 'MISSED'}
                className="bg-[#1a1f2e] border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 h-16 md:h-20 rounded-xl font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale cursor-pointer"
              >
                <div className="flex items-center gap-1"><ArrowUp size={24} /> BUY</div>
              </button>

              <button 
                onClick={() => handleTrade('SELL')}
                disabled={roundState === 'RESULT' || roundState === 'MISSED'}
                className="bg-[#2e1a1a] border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 h-16 md:h-20 rounded-xl font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale cursor-pointer"
              >
                <div className="flex items-center gap-1"><ArrowDown size={24} /> SELL</div>
              </button>

              <button 
                onClick={() => handleTrade('NO_TRADE')}
                disabled={roundState === 'RESULT' || roundState === 'MISSED'}
                className="col-span-2 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white h-14 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg cursor-pointer"
              >
                 <Ban size={18} /> {lang === 'en' ? 'SKIP / NO TRADE' : 'SKIP / KOI TRADE NAHI'}
              </button>

          </div>

      </div>

    </div>
  );
};

export default ScenarioSimulator;