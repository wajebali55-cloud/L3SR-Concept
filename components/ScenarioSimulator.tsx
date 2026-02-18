import React, { useState } from 'react';
import Certificate from './Certificate';
import { Trophy, ArrowRight, CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

// --- DATA: STATIC EDUCATIONAL SCENARIOS ---
const QUIZ_DATA = [
  {
    id: 1,
    title: "The Classic Sell Setup",
    trend: 'UP',
    level: 'RESISTANCE',
    last3s: 'STRONG_PUSH_UP',
    correct: 'SELL',
    explanation: "Perfect L3SR! Price is in an Uptrend hitting Resistance. In the last 3 seconds, it pushed UP strongly. This 'exhaustion' push means sellers are about to enter. Trade DOWN (Opposite)."
  },
  {
    id: 2,
    title: "The Classic Buy Setup",
    trend: 'DOWN',
    level: 'SUPPORT',
    last3s: 'STRONG_PUSH_DOWN',
    correct: 'BUY',
    explanation: "Perfect L3SR! Price is in a Downtrend hitting Support. In the last 3 seconds, it pushed DOWN strongly. This 'last effort' usually fails. Trade UP (Opposite)."
  },
  {
    id: 3,
    title: "The Indecision (Trap)",
    trend: 'UP',
    level: 'RESISTANCE',
    last3s: 'DOJI',
    correct: 'NO_TRADE',
    explanation: "NO TRADE. The candle ended as a Doji (Small body, long wicks). This means the market is confused. L3SR requires a CLEAR strong push. If you don't see a push, you skip."
  },
  {
    id: 4,
    title: "The Fakeout Wick",
    trend: 'DOWN',
    level: 'SUPPORT',
    last3s: 'LONG_WICK_REJECTION',
    correct: 'NO_TRADE',
    explanation: "NO TRADE. Look at that long wick! The rejection happened way too early (before the last 3 seconds). The market is too volatile. Wait for a cleaner setup."
  },
  {
    id: 5,
    title: "Confusion Zone",
    trend: 'RANGING',
    level: 'WEAK_LEVEL',
    last3s: 'CHOPPY',
    correct: 'NO_TRADE',
    explanation: "NO TRADE. The price went Up and Down violently in the last 3 seconds (Choppy). You cannot predict the winner here. Preserve your capital and skip."
  },
  {
    id: 6,
    title: "Final Exam: Resistance Push",
    trend: 'UP',
    level: 'RESISTANCE',
    last3s: 'STRONG_PUSH_UP',
    correct: 'SELL',
    explanation: "Yes! Strong push UP into Resistance at the very end. This is a text-book L3SR Rejection setup. We Sell."
  }
];

const ScenarioSimulator: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentScenario = QUIZ_DATA[currentIdx];
  const progress = ((currentIdx) / QUIZ_DATA.length) * 100;

  const handleAnswer = (action: 'BUY' | 'SELL' | 'NO_TRADE') => {
    const correct = action === currentScenario.correct;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(p => p + 1);
      setHasAnswered(false);
      setIsCorrect(false);
    } else {
      setShowCertificate(true);
    }
  };

  if (showCertificate) {
    return <Certificate onRestart={() => {
      setCurrentIdx(0);
      setScore(0);
      setHasAnswered(false);
      setShowCertificate(false);
    }} />;
  }

  // --- VISUAL HELPERS ---
  const renderTrendVisual = (trend: string) => {
    if (trend === 'UP') return <div className="flex items-center text-green-500 gap-2"><TrendingUp size={32} /> <span className="font-bold">UPTREND</span></div>;
    if (trend === 'DOWN') return <div className="flex items-center text-red-500 gap-2"><TrendingDown size={32} /> <span className="font-bold">DOWNTREND</span></div>;
    return <div className="flex items-center text-gray-400 gap-2"><Minus size={32} /> <span className="font-bold">RANGING/SIDEWAYS</span></div>;
  };

  const renderActionVisual = (type: string) => {
    switch (type) {
      case 'STRONG_PUSH_UP':
        return (
          <div className="h-40 w-16 bg-gray-800 rounded relative overflow-hidden border border-gray-700 mx-auto">
             <div className="absolute bottom-0 w-full bg-green-500 animate-[pulse_1s_infinite] transition-all duration-500 h-[90%]"></div>
             <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-white font-bold bg-black/50">00:59</div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-2xl">⬆</div>
          </div>
        );
      case 'STRONG_PUSH_DOWN':
        return (
          <div className="h-40 w-16 bg-gray-800 rounded relative overflow-hidden border border-gray-700 mx-auto">
             <div className="absolute top-0 w-full bg-red-500 animate-[pulse_1s_infinite] transition-all duration-500 h-[90%]"></div>
             <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-white font-bold bg-black/50">00:59</div>
             <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-2xl">⬇</div>
          </div>
        );
      case 'DOJI':
        return (
          <div className="h-40 w-16 bg-gray-800 rounded relative flex items-center justify-center border border-gray-700 mx-auto">
             <div className="w-0.5 h-32 bg-gray-500"></div>
             <div className="absolute w-12 h-1 bg-white"></div>
             <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-white font-bold bg-black/50">00:59</div>
          </div>
        );
      case 'LONG_WICK_REJECTION':
        return (
           <div className="h-40 w-16 bg-gray-800 rounded relative flex items-end justify-center border border-gray-700 mx-auto">
             <div className="w-0.5 h-full bg-gray-500"></div>
             <div className="absolute bottom-0 w-12 h-8 bg-green-500"></div>
             <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-white font-bold bg-black/50">00:59</div>
          </div>
        );
      default: // Choppy
        return (
          <div className="h-40 w-16 bg-gray-800 rounded relative border border-gray-700 mx-auto flex items-center justify-center">
             <div className="text-4xl">?</div>
             <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-white font-bold bg-black/50">00:59</div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col min-h-[600px]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-trading-accent" />
            Pattern Mastery Drill
          </h2>
          <p className="text-gray-400 text-sm">Question {currentIdx + 1} of {QUIZ_DATA.length}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-400">Score</div>
          <div className="text-xl font-mono font-bold text-trading-success">{score} Points</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
        <div 
          className="h-full bg-trading-accent rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* MAIN CARD */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Context / Setup */}
        <div className="bg-trading-card border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
           <div>
             <h3 className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">Market Context</h3>
             
             <div className="space-y-6">
               <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">1. The Trend</div>
                  {renderTrendVisual(currentScenario.trend)}
               </div>

               <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">2. The Level</div>
                  <div className={`text-xl font-bold ${currentScenario.level === 'RESISTANCE' ? 'text-red-400' : currentScenario.level === 'SUPPORT' ? 'text-green-400' : 'text-gray-400'}`}>
                    Hitting {currentScenario.level}
                  </div>
               </div>
             </div>
           </div>

           <div className="mt-6 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg flex items-start gap-3">
             <Info className="text-blue-400 shrink-0" size={20} />
             <p className="text-sm text-blue-200">
               Remember: We are looking for a reaction at the level.
             </p>
           </div>
        </div>

        {/* Right: The Micro Event */}
        <div className="bg-trading-card border border-gray-800 rounded-xl p-6 flex flex-col relative overflow-hidden">
           
           <h3 className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4 text-center">
             Microscope View: Last 3 Seconds
           </h3>

           <div className="flex-1 flex items-center justify-center py-8">
              {renderActionVisual(currentScenario.last3s)}
           </div>
           
           <div className="text-center mb-6">
             <p className="text-gray-400 text-sm">
               Behavior at 00:57 - 00:59:
             </p>
             <p className="text-white font-bold text-lg mt-1">
               {currentScenario.last3s.replace(/_/g, " ")}
             </p>
           </div>

           {/* Feedback Overlay */}
           {hasAnswered && (
             <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center animate-[fadeIn_0.3s_ease-out]">
                {isCorrect ? (
                  <CheckCircle className="text-green-500 mb-4 w-16 h-16" />
                ) : (
                  <XCircle className="text-red-500 mb-4 w-16 h-16" />
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {currentScenario.explanation}
                </p>

                <button 
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  Next Scenario <ArrowRight size={18} />
                </button>
             </div>
           )}

        </div>
      </div>

      {/* CONTROLS */}
      {!hasAnswered && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button 
            onClick={() => handleAnswer('BUY')}
            className="py-4 bg-trading-success hover:bg-green-600 rounded-xl text-white font-bold text-xl shadow-[0_4px_0_#008c56] active:translate-y-1 active:shadow-none transition-all"
          >
            BUY
          </button>
          
          <button 
            onClick={() => handleAnswer('SELL')}
            className="py-4 bg-trading-danger hover:bg-red-600 rounded-xl text-white font-bold text-xl shadow-[0_4px_0_#b32b23] active:translate-y-1 active:shadow-none transition-all"
          >
            SELL
          </button>

          <button 
            onClick={() => handleAnswer('NO_TRADE')}
            className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-gray-200 font-bold text-xl shadow-[0_4px_0_#374151] active:translate-y-1 active:shadow-none transition-all"
          >
            SKIP / AVOID
          </button>
        </div>
      )}

      {/* Hint Text */}
      {!hasAnswered && (
        <div className="text-center mt-4 text-gray-500 text-sm">
          Apply the L3SR Rule: Look at the Trend, The Level, and the Last 3 Second Push.
        </div>
      )}

    </div>
  );
};

export default ScenarioSimulator;