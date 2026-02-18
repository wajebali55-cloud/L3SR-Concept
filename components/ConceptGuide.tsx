import React from 'react';
import { Clock, TrendingUp, Anchor, AlertTriangle, Eye, Activity } from 'lucide-react';
import CandleAnimation from './CandleAnimation';

interface ConceptGuideProps {
  lang?: 'en' | 'ur';
}

const ConceptGuide: React.FC<ConceptGuideProps> = ({ lang = 'en' }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
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

      {/* Best Time */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-trading-accent/10 to-transparent p-6 rounded-xl border border-trading-accent/20">
        <div>
          <h4 className="text-xl font-bold text-white mb-1">{lang === 'en' ? 'Best Trading Time' : 'Behtareen Waqt'}</h4>
          <p className="text-gray-400 text-sm">{lang === 'en' ? 'Volatility is key for L3SR to work.' : 'L3SR ke liye volatility zaroori hai.'}</p>
        </div>
        <div className="mt-4 md:mt-0 bg-trading-bg px-6 py-3 rounded-lg border border-gray-700 font-mono text-xl font-bold text-trading-accent">
          13:00 - 17:00
        </div>
      </section>

    </div>
  );
};

export default ConceptGuide;