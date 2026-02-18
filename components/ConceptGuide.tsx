import React, { useState } from 'react';
import { Clock, TrendingUp, Anchor, AlertTriangle, Eye, Activity, Sun, Zap, School, ArrowLeft, ArrowRight, CheckCircle2, XCircle, MousePointerClick, ChevronRight, BookOpen, PlayCircle, Map, Target } from 'lucide-react';
import CandleAnimation from './CandleAnimation';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptGuideProps {
  lang?: 'en' | 'ur';
}

// --- CUSTOM SVG VISUALS FOR "HIGH ADVANCE" FEEL ---

const CandleAnatomyVisual = ({ lang }: { lang: 'en' | 'ur' }) => (
  <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
    <div className="relative min-w-[320px] md:w-full h-80 bg-[#1e222d] rounded-xl border border-gray-700 p-6 flex items-center justify-center overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
       </div>

       <div className="flex gap-8 md:gap-16 relative z-10">
          {/* Bullish Candle */}
          <div className="flex flex-col items-center group">
              <span className="text-green-400 font-bold mb-4 tracking-widest uppercase text-xs md:text-sm">Bullish (Buy)</span>
              <div className="relative w-24 h-56">
                  {/* High Line */}
                  <div className="absolute top-0 w-full border-t border-gray-500 border-dashed flex items-center justify-end">
                      <span className="text-[10px] text-gray-400 ml-2 -mt-2">HIGH</span>
                  </div>
                  {/* Wick */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-500"></div>
                  {/* Body */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-32 bg-green-500 rounded-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] flex flex-col justify-between p-1">
                      <div className="w-full border-t border-black/20"></div>
                      <div className="w-full border-b border-black/20"></div>
                  </div>
                  
                  {/* Close Label */}
                  <div className="absolute top-8 -right-16 flex items-center">
                      <div className="w-14 h-px bg-green-500"></div>
                      <span className="text-xs text-green-400 font-bold ml-1">CLOSE</span>
                  </div>
                  {/* Open Label */}
                  <div className="absolute bottom-16 -right-16 flex items-center">
                      <div className="w-14 h-px bg-white"></div>
                      <span className="text-xs text-white font-bold ml-1">OPEN</span>
                  </div>

                  {/* Low Line */}
                  <div className="absolute bottom-0 w-full border-b border-gray-500 border-dashed flex items-center justify-end">
                      <span className="text-[10px] text-gray-400 ml-2 -mb-4">LOW</span>
                  </div>
              </div>
          </div>

          {/* Bearish Candle */}
          <div className="flex flex-col items-center group">
              <span className="text-red-400 font-bold mb-4 tracking-widest uppercase text-xs md:text-sm">Bearish (Sell)</span>
              <div className="relative w-24 h-56">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-500"></div>
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-32 bg-red-500 rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)]"></div>
                  
                  {/* Open Label */}
                  <div className="absolute top-16 -right-16 flex items-center">
                      <div className="w-14 h-px bg-white"></div>
                      <span className="text-xs text-white font-bold ml-1">OPEN</span>
                  </div>
                  {/* Close Label */}
                  <div className="absolute bottom-8 -right-16 flex items-center">
                      <div className="w-14 h-px bg-red-500"></div>
                      <span className="text-xs text-red-400 font-bold ml-1">CLOSE</span>
                  </div>
              </div>
          </div>
       </div>
    </div>
  </div>
);

const ChartMasterclassVisual = ({ lang }: { lang: 'en' | 'ur' }) => (
  <div className="relative w-full h-64 md:h-96 bg-[#131722] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
     {/* Grid */}
     <div className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
     </div>

     {/* Scalable SVG with viewBox */}
     <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        {/* RESISTANCE ZONE */}
        <rect x="0" y="50" width="100%" height="40" fill="rgba(239, 68, 68, 0.1)" />
        <line x1="0" y1="90" x2="100%" y2="90" stroke="#ef4444" strokeWidth="2" />
        <text x="20" y="80" fill="#ef4444" fontSize="12" fontWeight="bold" letterSpacing="1px">RESISTANCE (The Ceiling)</text>

        {/* SUPPORT ZONE (FLIPPED) */}
        <rect x="0" y="250" width="100%" height="40" fill="rgba(34, 197, 94, 0.1)" />
        <line x1="0" y1="250" x2="100%" y2="250" stroke="#22c55e" strokeWidth="2" />
        <text x="20" y="280" fill="#22c55e" fontSize="12" fontWeight="bold" letterSpacing="1px">SUPPORT (The Floor)</text>

        {/* CANDLES PATH (Simulated) */}
        {/* 1. Touch Resistance */}
        <g transform="translate(50, 90)">
            <rect x="0" y="0" width="8" height="60" fill="#ef4444" /> {/* Down from Res */}
            <line x1="4" y1="-10" x2="4" y2="70" stroke="gray" />
        </g>
        <path d="M 54 85 L 54 80 L 44 95 L 64 95 Z" fill="#ef4444" transform="translate(0, -15)" /> {/* Arrow */}

        {/* 2. Touch Resistance Again */}
        <g transform="translate(150, 90)">
            <rect x="0" y="0" width="8" height="40" fill="#ef4444" /> 
            <line x1="4" y1="-5" x2="4" y2="50" stroke="gray" />
        </g>
        <path d="M 154 85 L 154 80 L 144 95 L 164 95 Z" fill="#ef4444" transform="translate(0, -15)" />

        {/* 3. Breakout Upwards */}
        <g transform="translate(250, 90)">
            <rect x="0" y="-80" width="8" height="120" fill="#22c55e" /> {/* BIG BREAKOUT */}
            <line x1="4" y1="-90" x2="4" y2="50" stroke="gray" />
        </g>
        <text x="270" y="50" fill="white" fontSize="10">BREAKOUT!</text>

        {/* 4. The Flip (Resistance becomes Support) */}
        <g transform="translate(400, 90)">
            <rect x="0" y="-10" width="8" height="40" fill="#22c55e" /> {/* Bounce off old resistance */}
            <line x1="4" y1="-10" x2="4" y2="40" stroke="gray" />
        </g>
        <circle cx="404" cy="90" r="15" stroke="yellow" strokeWidth="2" fill="none" strokeDasharray="4 2" className="animate-spin-slow" />
        <text x="380" y="130" fill="yellow" fontSize="12" fontWeight="bold">ROLE REVERSAL</text>
        <text x="380" y="145" fill="gray" fontSize="10">(Res becomes Sup)</text>

        {/* 5. Touch Support */}
        <g transform="translate(600, 250)">
            <rect x="0" y="-60" width="8" height="60" fill="#22c55e" /> {/* Bounce up */}
            <line x1="4" y1="-70" x2="4" y2="0" stroke="gray" />
        </g>
        <path d="M 604 255 L 604 260 L 594 245 L 614 245 Z" fill="#22c55e" transform="translate(0, 15) rotate(180 604 245)" />

     </svg>
  </div>
);

const ConceptGuide: React.FC<ConceptGuideProps> = ({ lang = 'en' }) => {
  const [mode, setMode] = useState<'standard' | 'beginner'>('standard');
  const [lessonStep, setLessonStep] = useState(1);

  // --- BEGINNER MODE COMPONENT ---
  if (mode === 'beginner') {
    return (
      <div className="w-full max-w-4xl mx-auto pb-20 px-4">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8 sticky top-20 z-40 bg-trading-bg/90 backdrop-blur-md py-4 border-b border-gray-800">
           <button 
             onClick={() => setMode('standard')}
             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-wider"
           >
             <ArrowLeft size={16} />
             {lang === 'en' ? 'Exit Course' : 'Course Band Karein'}
           </button>
           
           {/* Progress Indicator */}
           <div className="flex items-center gap-2">
              {[1, 2, 3].map(step => (
                <div key={step} className={`h-2 rounded-full transition-all duration-500 ${step === lessonStep ? 'w-8 bg-trading-gold' : step < lessonStep ? 'w-2 bg-green-500' : 'w-2 bg-gray-800'}`}></div>
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
        
        {/* ========================== LESSON 1 ========================== */}
        {lessonStep === 1 && (
            <motion.div 
                key="lesson1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-block p-3 bg-blue-500/10 rounded-full text-blue-400 mb-2">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        {lang === 'en' ? 'Lesson 1: The Anatomy' : 'Lesson 1: Candle Ka Structure'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "A candle is not just a block of color. It is a map of where the price travelled."
                         : "Candle sirf rang ka dabba nahi hai. Ye us safar ka naqsha hai jo price ne tay kiya."}
                    </p>
                </div>

                {/* VISUAL 1: ANATOMY */}
                <CandleAnatomyVisual lang={lang as 'en' | 'ur'} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                        <h3 className="text-green-400 font-bold text-lg mb-2">OPEN vs CLOSE</h3>
                        <p className="text-gray-400 text-sm">
                            {lang === 'en' 
                             ? "The 'Body' (thick part) is the distance between where price started (Open) and ended (Close)."
                             : "'Body' (mota hissa) wo faasla hai jahan price shuru hui (Open) aur khatam hui (Close)."}
                        </p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                        <h3 className="text-yellow-400 font-bold text-lg mb-2">HIGH vs LOW</h3>
                        <p className="text-gray-400 text-sm">
                            {lang === 'en' 
                             ? "The 'Wicks' (thin lines) show the maximum reach. The price went there, but couldn't stay there."
                             : "'Wicks' (patli lines) dikhati hain ke price kahan tak gayi thi, magar wahan ruk nahi saki."}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <button 
                        onClick={() => { window.scrollTo(0,0); setLessonStep(2); }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 text-lg transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
                    >
                        {lang === 'en' ? 'I Understand, Next Lesson' : 'Samajh Gaya, Agla Lesson'} <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        )}

        {/* ========================== LESSON 2 ========================== */}
        {lessonStep === 2 && (
            <motion.div 
                key="lesson2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-block p-3 bg-purple-500/10 rounded-full text-purple-400 mb-2">
                        <Map size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        {lang === 'en' ? 'Lesson 2: Chart Mastery' : 'Lesson 2: Chart Mastery'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "Look at the chart below. Price respects levels like a ball hitting a wall."
                         : "Neechay chart dekhein. Price levels ka aise ehtram karti hai jaise ball deewar se takrati hai."}
                    </p>
                </div>

                {/* VISUAL 2: CHART MASTERCLASS */}
                <ChartMasterclassVisual lang={lang as 'en' | 'ur'} />

                {/* EXPLANATION CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                         <h4 className="text-red-400 font-bold mb-2">1. Resistance (Ceiling)</h4>
                         <p className="text-xs text-gray-300">
                            {lang === 'en' ? 'Price hits it and falls. Sellers are defending this line.' : 'Price isay takra kar girti hai. Sellers is line ko bacha rahay hain.'}
                         </p>
                     </div>
                     <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
                         <h4 className="text-green-400 font-bold mb-2">2. Support (Floor)</h4>
                         <p className="text-xs text-gray-300">
                            {lang === 'en' ? 'Price hits it and bounces up. Buyers are defending this line.' : 'Price isay takra kar uchalti hai. Buyers is line ko bacha rahay hain.'}
                         </p>
                     </div>
                     <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                         <h4 className="text-yellow-400 font-bold mb-2">3. The Flip (Advanced)</h4>
                         <p className="text-xs text-gray-300">
                            {lang === 'en' ? 'When Resistance breaks, it becomes Support. We call this Role Reversal.' : 'Jab Resistance toot jati hai, wo Support ban jati hai. Isay Role Reversal kehte hain.'}
                         </p>
                     </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                    <div className="bg-white text-black font-bold px-2 rounded text-xs md:text-sm">TIP</div>
                    <p className="text-gray-300 text-xs md:text-sm">
                        {lang === 'en' ? 'Always look left. History repeats itself.' : 'Hamesha peeche (left) dekhein. History khud ko dohrati hai.'}
                    </p>
                </div>

                <div className="flex justify-between pt-8">
                    <button 
                        onClick={() => { window.scrollTo(0,0); setLessonStep(1); }}
                        className="text-gray-500 font-bold hover:text-white transition-colors"
                    >
                        &larr; {lang === 'en' ? 'Previous' : 'Peechay'}
                    </button>
                    <button 
                        onClick={() => { window.scrollTo(0,0); setLessonStep(3); }}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 text-lg transition-transform hover:scale-105 shadow-lg shadow-purple-500/20"
                    >
                        {lang === 'en' ? 'I Understand, Final Lesson' : 'Samajh Gaya, Akhri Lesson'} <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        )}

        {/* ========================== LESSON 3 ========================== */}
        {lessonStep === 3 && (
            <motion.div 
                key="lesson3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <div className="inline-block p-3 bg-trading-gold/10 rounded-full text-trading-gold mb-2">
                        <Target size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        {lang === 'en' ? 'Lesson 3: The Sniper Entry' : 'Lesson 3: Sniper Entry'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "Now that we have the Line (Level), we need the Trigger. We wait for the candle to TOUCH and REJECT."
                         : "Ab jab hamare paas Line (Level) hai, hamein Trigger chahiye. Hum candle ke TOUCH aur REJECT karne ka intezar karte hain."}
                    </p>
                </div>

                {/* VISUAL 3: ZOOMED IN REACTION */}
                <div className="bg-black/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Clock className="text-trading-gold" /> 
                        {lang === 'en' ? 'The Last 3 Seconds (Zoomed In)' : 'Akhri 3 Seconds (Zoomed In)'}
                    </h3>
                    
                    <div className="relative w-full max-w-md h-64 border-b-4 border-red-500 flex items-end justify-center overflow-hidden">
                        <div className="absolute top-2 right-2 text-red-500 font-bold text-xs">RESISTANCE LINE</div>
                        
                        {/* Animated Candle */}
                        <motion.div 
                           animate={{ height: ["10%", "90%", "60%"] }}
                           transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
                           className="w-16 bg-green-500 rounded-t-sm relative"
                        >
                            {/* Wick appearing */}
                            <motion.div 
                               animate={{ height: ["0%", "0%", "30%"], opacity: [0, 0, 1] }}
                               transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
                               className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 bg-gray-500 h-20 origin-bottom"
                            />
                        </motion.div>
                        
                        <motion.div 
                           animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                           transition={{ duration: 2, repeat: Infinity, times: [0.4, 0.5, 0.6] }}
                           className="absolute top-10 text-yellow-400 font-bold text-xl"
                        >
                            TOUCH!
                        </motion.div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-white font-bold text-lg">{lang === 'en' ? 'See the Wick?' : 'Wick Nazar Ayi?'}</p>
                        <p className="text-gray-400 text-sm">
                            {lang === 'en' ? 'Price hit the line and was PUSHED back down immediately.' : 'Price line se takra kar foran NEECHAY dhakeli gayi.'}
                        </p>
                    </div>
                </div>

                {/* FINAL CTA */}
                <div className="bg-gradient-to-r from-trading-gold/20 to-yellow-600/20 border border-trading-gold p-8 rounded-3xl text-center space-y-6">
                    <h2 className="text-3xl font-black text-white">
                        {lang === 'en' ? 'You Are Ready.' : 'Aap Tayyar Hain.'}
                    </h2>
                    <p className="text-gray-300">
                        {lang === 'en' ? 'Go to the Simulator and practice watching the clock.' : 'Simulator par jayen aur ghadi dekhne ki practice karein.'}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button 
                             onClick={() => { window.scrollTo(0,0); setLessonStep(2); }}
                             className="text-gray-400 font-bold hover:text-white px-6 py-3"
                        >
                            {lang === 'en' ? 'Review Lesson 2' : 'Lesson 2 Dobara Dekhein'}
                        </button>
                        <button 
                             onClick={() => setMode('standard')}
                             className="bg-white text-black font-bold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            <School size={20} /> {lang === 'en' ? 'Graduate to Pro Guide' : 'Pro Guide Par Jayen'}
                        </button>
                    </div>
                </div>
            </motion.div>
        )}

        </AnimatePresence>
      </div>
    );
  }

  // --- STANDARD MODE (EXISTING LAYOUT) ---
  return (
    <div className="w-full max-w-[95%] mx-auto space-y-12 pb-20">
      
      {/* Beginner Mode Call-to-Action */}
      <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
         <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="bg-green-500 p-4 rounded-full text-black shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-pulse shrink-0">
                <School size={28} />
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {lang === 'en' ? 'Total Beginner?' : 'Bilkul Naye Hain?'}
                </h3>
                <p className="text-gray-300 text-sm">
                    {lang === 'en' 
                     ? "Take our step-by-step 'Zero to Hero' interactive course." 
                     : "Hamara 'Zero to Hero' step-by-step course lein."}
                </p>
            </div>
         </div>
         <button 
           onClick={() => setMode('beginner')}
           className="relative z-10 w-full md:w-auto bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap transform hover:scale-105"
         >
            {lang === 'en' ? 'Start Beginner Course' : 'Beginner Course Shuru Karein'} <PlayCircle size={20} fill="black" className="text-green-500" />
         </button>
      </div>
      
      {/* Intro */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {lang === 'en' ? 'What is L3SR?' : 'L3SR Kya Hai?'}
        </h2>
        <div className="bg-trading-card border border-gray-800 p-6 rounded-xl">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            {lang === 'en' ? (
              <>
                <span className="text-trading-accent font-bold">L3SR</span> stands for <span className="font-bold text-white">Last 3 Second Rejection</span>. 
                It is a precision-based trading method used on the <span className="text-trading-accent">1-minute timeframe</span>.
                The core concept revolves around observing the market's behavior in the dying moments of a candle—specifically the last 3 seconds—when it interacts with a key support or resistance level.
              </>
            ) : (
              <>
                <span className="text-trading-accent font-bold">L3SR</span> ka matlab hai <span className="font-bold text-white">Last 3 Second Rejection</span>. 
                Ye <span className="text-trading-accent">1-minute timeframe</span> par istemal honay wala precision method hai. 
                Asal concept ye hai ke candle ke akhri 3 seconds mein market ka behavior note kiya jaye jab wo kisi strong support ya resistance level ko touch karti hai.
              </>
            )}
          </p>
        </div>
      </section>

      {/* The Core Logic */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-trading-accent" />
            {lang === 'en' ? 'The Main Idea' : 'Main Idea'}
          </h3>
          <p className="text-gray-400">
            {lang === 'en' 
              ? 'When price hits a strong level, it often gives a "final push" or reaction in the last few seconds. This micro-movement reveals the true intent of the institutional money.'
              : 'Jab price kisi strong level par jati hai, to akhri seconds mein wo aik "final push" ya reaction deti hai. Ye choti si movement institutional money ki asal niyat batati hai.'}
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-trading-accent/20 p-2 rounded-lg text-trading-accent shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <strong className="block text-white">{lang === 'en' ? 'The Trigger' : 'Trigger'}</strong>
                <span className="text-sm text-gray-400">
                   {lang === 'en' ? 'The FIRST clear strong move in the last 3 seconds.' : 'Akhri 3 seconds mein PEHLI clear aur strong move.'}
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-trading-success/20 p-2 rounded-lg text-trading-success shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <strong className="block text-white">{lang === 'en' ? 'The Action' : 'Action'}</strong>
                <span className="text-sm text-gray-400">
                   {lang === 'en' ? 'Trade OPPOSITE to that move on the next candle.' : 'Agli candle par us move ke OPPOSITE (mukhalif) trade lagayein.'}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
            <CandleAnimation />
        </div>
      </section>

      {/* Step by Step */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-8">{lang === 'en' ? 'Step-by-Step Execution' : 'Tareeqa-e-Kaar'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: lang === 'en' ? "1. Identify Trend" : "1. Trend Pehchanein",
              icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
              desc: lang === 'en' 
                ? "Determine if the market is Uptrend (Higher Highs) or Downtrend (Lower Lows). Trend helps filter weak entries."
                : "Dekhein ke market Uptrend hai ya Downtrend. Trend apko ghalat entries se bachata hai."
            },
            {
              title: lang === 'en' ? "2. Mark Levels" : "2. Levels Mark Karein",
              icon: <Anchor className="w-6 h-6 text-purple-400" />,
              desc: lang === 'en'
                ? "Find clear S/R levels. Max 3 touches (1-2 is ideal). If a level has 4+ touches, avoid it."
                : "Saaf Support/Resistance dhoondein. Max 3 touches honay chahiye. Agar 4 se zyada hain to avoid karein."
            },
            {
              title: lang === 'en' ? "3. Wait for :57s" : "3. :57s ka Intezar",
              icon: <Eye className="w-6 h-6 text-yellow-400" />,
              desc: lang === 'en'
                ? "Wait for the candle to close. Focus entirely on the last 3 seconds (57s, 58s, 59s)."
                : "Candle close hone ka intezar karein. Pura focus akhri 3 seconds (57, 58, 59) par rakhein."
            }
          ].map((step, i) => (
            <div key={i} className="bg-trading-card border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition-colors">
              <div className="mb-4">{step.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Board */}
      <section className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{lang === 'en' ? 'The Golden Rules of Entry' : 'Golden Rules'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sell Scenario */}
          <div className="space-y-4">
            <div className="bg-trading-danger/10 text-trading-danger font-bold text-center py-2 rounded uppercase tracking-widest">
              Sell Signal
            </div>
            <div className="p-4 border-l-4 border-trading-danger bg-black/20">
              <p className="text-gray-300">
                {lang === 'en' ? (
                  <>If the first strong push in the last 3 seconds is <span className="text-white font-bold">UPWARDS</span>...</>
                ) : (
                  <>Agar akhri 3 seconds mein pehla strong push <span className="text-white font-bold">OOPER (UP)</span> ki taraf ho...</>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {lang === 'en' ? (
                  <>You place a <span className="text-trading-danger font-bold">SELL</span> trade on the next candle.</>
                ) : (
                  <>To agli candle par <span className="text-trading-danger font-bold">SELL</span> ki trade lagayein.</>
                )}
              </p>
            </div>
          </div>

          {/* Buy Scenario */}
          <div className="space-y-4">
            <div className="bg-trading-success/10 text-trading-success font-bold text-center py-2 rounded uppercase tracking-widest">
              Buy Signal
            </div>
            <div className="p-4 border-l-4 border-trading-success bg-black/20">
              <p className="text-gray-300">
                {lang === 'en' ? (
                  <>If the first strong push in the last 3 seconds is <span className="text-white font-bold">DOWNWARDS</span>...</>
                ) : (
                  <>Agar akhri 3 seconds mein pehla strong push <span className="text-white font-bold">NECHY (DOWN)</span> ki taraf ho...</>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {lang === 'en' ? (
                  <>You place a <span className="text-trading-success font-bold">BUY</span> trade on the next candle.</>
                ) : (
                  <>To agli candle par <span className="text-trading-success font-bold">BUY</span> ki trade lagayein.</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* When NOT to trade */}
        <div className="mt-10 pt-10 border-t border-gray-800">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            {lang === 'en' ? 'When To Avoid (No Trade)' : 'Kab Trade Nahi Karni (No Trade)'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              lang === 'en' ? 'Doji Candles' : 'Doji Candles', 
              lang === 'en' ? 'Long Wicks' : 'Lambi Wicks', 
              lang === 'en' ? 'Unclear Moves' : 'Move Clear Na Ho', 
              lang === 'en' ? 'Dual-side Volatility' : 'Dono Taraf Volatility', 
              lang === 'en' ? 'Weak Levels' : 'Kamzor Levels'
            ].map((item) => (
              <div key={item} className="bg-red-500/10 text-red-400 px-4 py-2 rounded text-sm text-center font-medium border border-red-500/20">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimal Trading Window */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 md:p-8 border border-blue-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1 space-y-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 border border-blue-500/20">
                        <Sun size={12} /> {lang === 'en' ? 'Performance Insight' : 'Performance Insight'}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {lang === 'en' ? 'Optimal Trading Window' : 'Behtareen Trading Waqt'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {lang === 'en' 
                         ? 'Based on live testing, L3SR shows stronger consistency during high-liquidity periods.'
                         : 'Live testing ki bunyad par, L3SR high-liquidity auqat mein zyada mustaqil مزاجi dikhata hai.'}
                    </p>
                </div>

                <div className="bg-black/30 border border-blue-500/20 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">
                            {lang === 'en' ? 'Best Time (Local Broker Time)' : 'Behtareen Waqt (Local Broker Time)'}
                        </span>
                        <div className="text-2xl md:text-3xl font-mono font-bold text-white flex items-center gap-3">
                            6:00 PM <span className="text-gray-600">-</span> 7:00 PM
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 animate-pulse">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-trading-card border border-gray-800 p-5 rounded-xl">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Zap size={16} className="text-trading-gold" />
                        {lang === 'en' ? 'Why This Window Works Better' : 'Ye Waqt Behtar Kyun Hai?'}
                    </h4>
                    <ul className="space-y-2">
                        {[
                            lang === 'en' ? 'Increased market liquidity' : 'Market liquidity mein izafa',
                            lang === 'en' ? 'Cleaner 1-minute candle structure' : 'Saaf 1-minute candle structure',
                            lang === 'en' ? 'Stronger rejection clarity in final seconds' : 'Akhri seconds mein rejection ki wazahat',
                            lang === 'en' ? 'Reduced micro-noise compared to low-volume hours' : 'Kam volume hours ke muqable mein kam shor'
                        ].map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <div className="mt-1.5 w-1 h-1 bg-trading-gold rounded-full shrink-0"></div>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="md:w-1/3 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-gray-700/50 pt-6 md:pt-0 md:pl-8">
                 <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-lg">
                    <h5 className="text-orange-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle size={14} /> {lang === 'en' ? 'Important Note' : 'Zaroori Note'}
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        {lang === 'en' 
                         ? 'L3SR can work outside this window; however, performance tends to improve when applied during active market conditions.'
                         : 'L3SR is waqt ke ilawa bhi kaam kar sakta hai, lekin active market conditions mein iski karkardagi behtar hoti hai.'}
                    </p>
                 </div>

                 <div className="text-[10px] text-gray-500 italic leading-relaxed">
                    <span className="font-bold text-gray-400">{lang === 'en' ? 'Professional Insight:' : 'Professional Insight:'}</span> <br/>
                    {lang === 'en' 
                     ? 'Market conditions may vary. Users are encouraged to forward-test and adapt based on volatility and broker environment.'
                     : 'Market ke halat mukhtalif ho sakte hain. Users ko mashwara diya jata hai ke wo volatility aur broker ke mahol ke mutabiq test karein.'}
                 </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default ConceptGuide;