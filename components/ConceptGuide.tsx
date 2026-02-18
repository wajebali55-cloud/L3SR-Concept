import React, { useState } from 'react';
import { Clock, TrendingUp, Anchor, AlertTriangle, Eye, Activity, Sun, Zap, School, ArrowLeft, ArrowRight, CheckCircle2, XCircle, MousePointerClick, ChevronRight, BookOpen, PlayCircle } from 'lucide-react';
import CandleAnimation from './CandleAnimation';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptGuideProps {
  lang?: 'en' | 'ur';
}

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
             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
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
                        {lang === 'en' ? 'Lesson 1: The Language of Candles' : 'Lesson 1: Candles Ki Zuban'}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "Before you run, you must walk. A candle is not just a drawing; it is a war between Buyers and Sellers."
                         : "Bhagne se pehle chalna seekhein. Candle sirf tasveer nahi, ye Buyers aur Sellers ki jang hai."}
                    </p>
                </div>

                {/* Concept 1: The Anatomy */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">
                        {lang === 'en' ? '1. Anatomy of a Candle' : '1. Candle Ki Banawat'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p>
                                <strong className="text-white block mb-1">The Body (The Fat Part):</strong>
                                {lang === 'en' 
                                 ? "This shows the real movement. If the body is GREEN, price went UP. If RED, price went DOWN."
                                 : "Ye asal movement dikhata hai. Agar body GREEN hai, to price OOPER gayi. Agar RED hai, to NEECHAY gayi."}
                            </p>
                            <p>
                                <strong className="text-white block mb-1">The Wick (The Thin Line):</strong>
                                {lang === 'en' 
                                 ? "This is VERY important. The Wick shows where the price WENT, but could not stay. It represents FAILURE or REJECTION."
                                 : "Ye BOHOT ahem hai. Wick batati hai ke price kahan tak GAYI thi, magar ruk nahi saki. Ye NAKAMI ya REJECTION dikhati hai."}
                            </p>
                        </div>
                        
                        {/* Visual Aid */}
                        <div className="bg-black/40 p-8 rounded-xl border border-gray-700 flex justify-center gap-12 relative">
                             {/* Green Candle */}
                             <div className="flex flex-col items-center group">
                                <span className="text-xs text-green-500 font-bold mb-2">BULLISH (Up)</span>
                                <div className="relative w-12 h-40">
                                    {/* Upper Wick */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-500"></div>
                                    <div className="absolute -top-2 left-10 text-[10px] text-gray-500 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                                        High (Sab se ooper)
                                    </div>

                                    {/* Body */}
                                    <div className="absolute top-10 w-full h-24 bg-green-500 rounded-sm flex items-center justify-center">
                                        <span className="text-[10px] text-black font-bold -rotate-90">BODY</span>
                                    </div>

                                    {/* Lower Wick */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-500"></div>
                                    <div className="absolute -bottom-2 left-10 text-[10px] text-gray-500 w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Low (Sab se neechy)
                                    </div>
                                </div>
                             </div>

                             {/* Red Candle */}
                             <div className="flex flex-col items-center group">
                                <span className="text-xs text-red-500 font-bold mb-2">BEARISH (Down)</span>
                                <div className="relative w-12 h-40">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-500"></div>
                                    <div className="absolute top-6 w-full h-24 bg-red-500 rounded-sm flex items-center justify-center">
                                        <span className="text-[10px] text-white font-bold -rotate-90">BODY</span>
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-500"></div>
                                </div>
                             </div>
                             
                             <div className="absolute bottom-2 right-2 text-[10px] text-gray-600 italic">Hover candles for details</div>
                        </div>
                    </div>
                </div>

                {/* Concept 2: The Fight */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-4">
                        {lang === 'en' ? '2. The Tug of War' : '2. Rassa Kashi (Tug of War)'}
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        {lang === 'en' 
                         ? "Imagine a rope pulling contest. Buyers pull UP. Sellers pull DOWN. The candle shows who is winning."
                         : "Imagine karein rassa kashi ka muqabla. Buyers OOPER kheenchte hain. Sellers NEECHAY. Candle batati hai kaun jeet raha hai."}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 flex items-center justify-between">
                            <span className="text-green-400 font-bold text-lg">Big Green Body</span>
                            <span className="text-white">{lang === 'en' ? 'Buyers are very strong' : 'Buyers bohot taqatwar hain'}</span>
                            <ArrowRight className="text-green-500" />
                        </div>
                        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 flex items-center justify-between">
                            <span className="text-red-400 font-bold text-lg">Big Red Body</span>
                            <span className="text-white">{lang === 'en' ? 'Sellers are very strong' : 'Sellers bohot taqatwar hain'}</span>
                            <ArrowRight className="text-red-500" />
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 flex items-center justify-between">
                            <span className="text-gray-400 font-bold text-lg">Small Body / Big Wicks</span>
                            <span className="text-white">{lang === 'en' ? 'Confused / Fight is equal' : 'Confused / Muqabla barabar hai'}</span>
                            <AlertTriangle className="text-yellow-500" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <button 
                        onClick={() => { window.scrollTo(0,0); setLessonStep(2); }}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 text-lg transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
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
                        <Anchor size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        {lang === 'en' ? 'Lesson 2: The Battlefield (S/R)' : 'Lesson 2: Jang Ka Maidan (S/R)'}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "Price does not move randomly. It respects invisible walls. We call these Support and Resistance."
                         : "Price ainvayi nahi chalti. Wo invisible deewaron ka ehtram karti hai. Inhein hum Support aur Resistance kehte hain."}
                    </p>
                </div>

                {/* Concept 1: Visualizing S/R */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
                        {lang === 'en' ? '1. Floor and Ceiling' : '1. Farsh aur Chatt'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         {/* Resistance */}
                         <div className="relative h-48 bg-black/40 border border-gray-700 rounded-xl overflow-hidden p-4 flex flex-col justify-between">
                             {/* The Ceiling */}
                             <div className="absolute top-0 left-0 w-full h-8 bg-red-500/20 border-b-4 border-red-500 flex items-center justify-center">
                                 <span className="text-red-500 font-bold tracking-widest text-xs">RESISTANCE (Ceiling)</span>
                             </div>
                             
                             <div className="flex-1 flex items-center justify-center pt-8">
                                <motion.div 
                                    animate={{ y: [0, -30, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_white]"
                                />
                             </div>
                             <p className="text-center text-xs text-gray-400 mt-2">
                                {lang === 'en' ? 'Ball hits ceiling -> Falls down' : 'Ball chatt par lagti hai -> Neechay girti hai'}
                             </p>
                         </div>

                         {/* Support */}
                         <div className="relative h-48 bg-black/40 border border-gray-700 rounded-xl overflow-hidden p-4 flex flex-col justify-between">
                             <div className="flex-1 flex items-center justify-center pb-8">
                                <motion.div 
                                    animate={{ y: [0, 30, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_white]"
                                />
                             </div>

                             {/* The Floor */}
                             <div className="absolute bottom-0 left-0 w-full h-8 bg-green-500/20 border-t-4 border-green-500 flex items-center justify-center">
                                 <span className="text-green-500 font-bold tracking-widest text-xs">SUPPORT (Floor)</span>
                             </div>
                             <p className="text-center text-xs text-gray-400 mb-10">
                                {lang === 'en' ? 'Ball hits floor -> Bounces up' : 'Ball farsh par lagti hai -> Ooper uchalti hai'}
                             </p>
                         </div>
                    </div>
                </div>

                {/* Concept 2: How to Draw */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-orange-500 pl-4">
                        {lang === 'en' ? '2. How to Find Them?' : '2. Inhein Kaise Dhoondein?'}
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="bg-gray-800 p-2 rounded text-white font-bold">1</div>
                            <div>
                                <strong className="block text-white text-lg">{lang === 'en' ? 'Look Left' : 'Bayen (Left) Dekhein'}</strong>
                                <p className="text-gray-400">{lang === 'en' ? 'Look at the history. Where did price turn around before?' : 'History dekhein. Pehle price kahan se muri thi?'}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="bg-gray-800 p-2 rounded text-white font-bold">2</div>
                            <div>
                                <strong className="block text-white text-lg">{lang === 'en' ? 'Connect the V and A' : 'V aur A ko milayein'}</strong>
                                <p className="text-gray-400">{lang === 'en' ? 'Support looks like a "V". Resistance looks like an "A".' : 'Support "V" jaisi hoti hai. Resistance "A" jaisi hoti hai.'}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="bg-gray-800 p-2 rounded text-white font-bold">3</div>
                            <div>
                                <strong className="block text-white text-lg">{lang === 'en' ? 'The Golden Rule' : 'Sunehri Usool'}</strong>
                                <div className="bg-red-500/20 text-red-200 p-3 rounded mt-2 border border-red-500/30 font-bold">
                                    {lang === 'en' ? 'NO LEVEL = NO TRADE' : 'KOI LEVEL NAHI = KOI TRADE NAHI'}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{lang === 'en' ? 'Never trade in the middle of nowhere.' : 'Beech samandar mein kabhi trade na karein.'}</p>
                            </div>
                        </li>
                    </ul>
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
                        <Zap size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">
                        {lang === 'en' ? 'Lesson 3: The Secret (L3SR)' : 'Lesson 3: Raaz (L3SR)'}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {lang === 'en' 
                         ? "This is the magic. How do we know if the Level will work? We wait for the LAST 3 SECONDS."
                         : "Ye jadu hai. Hamein kaise pata chalega ke Level kaam karega? Hum AKHRI 3 SECONDS ka intezar karte hain."}
                    </p>
                </div>

                {/* Concept 1: The Timeline */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-trading-gold pl-4">
                        {lang === 'en' ? '1. The 1-Minute Timeline' : '1. 1-Minute Ki Timeline'}
                    </h2>
                    
                    <div className="relative pt-8 pb-12 px-4">
                        {/* Timeline Bar */}
                        <div className="w-full h-4 bg-gray-800 rounded-full relative">
                            {/* Danger Zone */}
                            <div className="absolute right-0 top-0 h-full w-[10%] bg-trading-gold rounded-r-full animate-pulse"></div>
                            
                            {/* Markers */}
                            <div className="absolute -top-8 left-0 text-gray-500 text-xs font-bold">00s</div>
                            <div className="absolute -top-8 left-1/2 text-gray-500 text-xs font-bold">30s</div>
                            <div className="absolute -top-10 right-0 text-trading-gold text-sm font-black">60s</div>
                        </div>

                        {/* Annotations */}
                        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                            <div className="text-gray-500 text-sm border-r border-gray-700">
                                <strong className="block text-white">0s - 50s</strong>
                                {lang === 'en' ? 'Relax. Watch. Do nothing.' : 'Sakoon karein. Dekhein. Kuch na karein.'}
                            </div>
                            <div className="text-gray-500 text-sm border-r border-gray-700">
                                <strong className="block text-white">50s - 56s</strong>
                                {lang === 'en' ? 'Get Ready. Hand on mouse.' : 'Tayyar ho jayen. Hath mouse par.'}
                            </div>
                            <div className="text-trading-gold text-sm font-bold bg-trading-gold/10 p-2 rounded">
                                <strong className="block text-trading-gold text-lg">57s - 59s</strong>
                                {lang === 'en' ? 'THE REJECTION HAPPENS HERE!' : 'YAHAN REJECTION HOTI HAI!'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Concept 2: What is Rejection? */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
                        {lang === 'en' ? '2. What Does Rejection Look Like?' : '2. Rejection Kaisi Dikhti Hai?'}
                    </h2>
                    
                    <div className="bg-black/30 p-8 rounded-xl border border-gray-700 text-center">
                        <p className="text-lg text-white mb-6">
                            {lang === 'en' 
                             ? "Rejection is when the candle touches the line and gets SHOCKED like touching a hot stove."
                             : "Rejection ye hai ke candle line ko chuye aur aise WAPIS bhage jaise garam taway ko chu liya ho."}
                        </p>
                        
                        <div className="flex justify-center gap-8">
                             {/* Good Rejection */}
                             <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/50">
                                <h4 className="text-green-500 font-bold mb-2">{lang === 'en' ? 'GOOD (Trade It)' : 'ACHA (Trade Karein)'}</h4>
                                <ul className="text-left text-sm text-gray-300 space-y-2">
                                    <li>✅ {lang === 'en' ? 'Sudden fast move back' : 'Achanak tezi se wapsi'}</li>
                                    <li>✅ {lang === 'en' ? 'Leaves a long wick' : 'Lambi wick chor jaye'}</li>
                                    <li>✅ {lang === 'en' ? 'Happens at 57s, 58s' : '57s ya 58s par ho'}</li>
                                </ul>
                             </div>

                             {/* Bad Rejection */}
                             <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/50">
                                <h4 className="text-red-500 font-bold mb-2">{lang === 'en' ? 'BAD (Skip It)' : 'BURA (Skip Karein)'}</h4>
                                <ul className="text-left text-sm text-gray-300 space-y-2">
                                    <li>❌ {lang === 'en' ? 'Slowly moving over line' : 'Dheere dheere line cross kare'}</li>
                                    <li>❌ {lang === 'en' ? 'Stuck at the line' : 'Line par chipak jaye'}</li>
                                    <li>❌ {lang === 'en' ? 'No reaction' : 'Koi reaction na ho'}</li>
                                </ul>
                             </div>
                        </div>
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
                             className="bg-white text-black font-bold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
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
            <div className="bg-green-500 p-4 rounded-full text-black shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-pulse">
                <School size={28} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-1">
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
           className="relative z-10 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap transform hover:scale-105"
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
          <p className="text-lg text-gray-300 leading-relaxed">
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
              <div className="bg-trading-accent/20 p-2 rounded-lg text-trading-accent">
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
              <div className="bg-trading-success/20 p-2 rounded-lg text-trading-success">
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
                        <div className="text-3xl font-mono font-bold text-white flex items-center gap-3">
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