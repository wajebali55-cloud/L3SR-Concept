import React from 'react';
import { Clock, TrendingUp, Anchor, AlertTriangle, Eye, Activity, Sun, Zap } from 'lucide-react';
import CandleAnimation from './CandleAnimation';

interface ConceptGuideProps {
  lang?: 'en' | 'ur';
}

const ConceptGuide: React.FC<ConceptGuideProps> = ({ lang = 'en' }) => {
  return (
    <div className="w-full max-w-[95%] mx-auto space-y-12 pb-20">
      
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