import React, { useState, useEffect } from 'react';

const CandleAnimation: React.FC = () => {
  const [height, setHeight] = useState(50);
  const [color, setColor] = useState('bg-trading-success');

  // Simple animation loop to simulate a "live" candle
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 20;
      setHeight(prev => {
        const newHeight = Math.max(10, Math.min(90, prev + change));
        setColor(prev + change > prev ? 'bg-trading-success' : 'bg-trading-danger');
        return newHeight;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-trading-card rounded-lg border border-gray-800 w-full max-w-[200px] mx-auto">
      <span className="text-xs text-trading-muted mb-2 font-mono">1m Simulation</span>
      <div className="relative h-40 w-full flex items-end justify-center bg-gray-900/50 rounded overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-rows-4 gap-4 opacity-10">
            <div className="border-t border-gray-100 w-full"></div>
            <div className="border-t border-gray-100 w-full"></div>
            <div className="border-t border-gray-100 w-full"></div>
        </div>
        
        {/* Wick */}
        <div className="absolute top-4 bottom-4 w-0.5 bg-gray-500 h-[80%] my-auto"></div>
        
        {/* Body */}
        <div 
          className={`w-4 transition-all duration-200 ease-in-out ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
          style={{ height: `${height}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between w-full text-xs font-mono text-trading-muted">
        <span>00:57</span>
        <span className="text-trading-danger animate-pulse">Last 3s</span>
      </div>
    </div>
  );
};

export default CandleAnimation;