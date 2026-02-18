import React from 'react';
import { Clock, TrendingUp, Anchor, AlertTriangle, Eye, Activity } from 'lucide-react';
import CandleAnimation from './CandleAnimation';

const ConceptGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {/* Intro */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">What is L3SR?</h2>
        <div className="bg-trading-card border border-gray-800 p-6 rounded-xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            <span className="text-trading-accent font-bold">L3SR</span> stands for <span className="font-bold text-white">Last 3 Second Rejection</span>. 
            It is a precision-based trading method used on the <span className="text-trading-accent">1-minute timeframe</span>.
            The core concept revolves around observing the market's behavior in the dying moments of a candle—specifically the last 3 seconds—when it interacts with a key support or resistance level.
          </p>
        </div>
      </section>

      {/* The Core Logic */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-trading-accent" />
            The Main Idea
          </h3>
          <p className="text-gray-400">
            When price hits a strong level, it often gives a "final push" or reaction in the last few seconds. This micro-movement reveals the true intent of the institutional money.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-trading-accent/20 p-2 rounded-lg text-trading-accent">
                <Clock size={20} />
              </div>
              <div>
                <strong className="block text-white">The Trigger</strong>
                <span className="text-sm text-gray-400">The FIRST clear strong move in the last 3 seconds.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-trading-success/20 p-2 rounded-lg text-trading-success">
                <TrendingUp size={20} />
              </div>
              <div>
                <strong className="block text-white">The Action</strong>
                <span className="text-sm text-gray-400">Trade OPPOSITE to that move on the next candle.</span>
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
        <h3 className="text-2xl font-bold text-white mb-8">Step-by-Step Execution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "1. Identify Trend",
              icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
              desc: "Determine if the market is Uptrend (Higher Highs) or Downtrend (Lower Lows). Trend helps filter weak entries."
            },
            {
              title: "2. Mark Levels",
              icon: <Anchor className="w-6 h-6 text-purple-400" />,
              desc: "Find clear S/R levels. Max 3 touches (1-2 is ideal). If a level has 4+ touches, avoid it."
            },
            {
              title: "3. Wait for :57s",
              icon: <Eye className="w-6 h-6 text-yellow-400" />,
              desc: "Wait for the candle to close. Focus entirely on the last 3 seconds (57s, 58s, 59s)."
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
        <h3 className="text-2xl font-bold text-white mb-6 text-center">The Golden Rules of Entry</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sell Scenario */}
          <div className="space-y-4">
            <div className="bg-trading-danger/10 text-trading-danger font-bold text-center py-2 rounded uppercase tracking-widest">
              Sell Signal
            </div>
            <div className="p-4 border-l-4 border-trading-danger bg-black/20">
              <p className="text-gray-300">
                If the first strong push in the last 3 seconds is <span className="text-white font-bold">UPWARDS</span>...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                You place a <span className="text-trading-danger font-bold">SELL</span> trade on the next candle.
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
                If the first strong push in the last 3 seconds is <span className="text-white font-bold">DOWNWARDS</span>...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                You place a <span className="text-trading-success font-bold">BUY</span> trade on the next candle.
              </p>
            </div>
          </div>
        </div>

        {/* When NOT to trade */}
        <div className="mt-10 pt-10 border-t border-gray-800">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" />
            When To Avoid (No Trade)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Doji Candles', 'Long Wicks', 'Unclear Moves', 'Dual-side Volatility', 'Weak Levels'].map((item) => (
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
          <h4 className="text-xl font-bold text-white mb-1">Best Trading Time</h4>
          <p className="text-gray-400 text-sm">Volatility is key for L3SR to work.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-trading-bg px-6 py-3 rounded-lg border border-gray-700 font-mono text-xl font-bold text-trading-accent">
          13:00 - 17:00
        </div>
      </section>

    </div>
  );
};

export default ConceptGuide;