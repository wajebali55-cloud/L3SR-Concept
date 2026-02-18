import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CrosshairMode, IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import { Scenario, CandleData } from '../types';

interface LiveChartProps {
  scenario: Scenario;
  onTradePlaced: (action: 'BUY' | 'SELL' | 'NO_TRADE', price: number) => void;
  onSimulationComplete: (win: boolean, endPrice: number) => void;
  userAction: 'BUY' | 'SELL' | 'NO_TRADE' | null;
}

const LiveChart: React.FC<LiveChartProps> = ({ scenario, onTradePlaced, onSimulationComplete, userAction }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null); // For S/R Level
  
  // Physics State
  const [timeLeft, setTimeLeft] = useState(15);
  const [phase, setPhase] = useState<'SIGNAL' | 'RESULT'>('SIGNAL');
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  
  // Refs for animation loop (avoiding closure staleness)
  const currentCandleRef = useRef<CandleData | null>(null);
  const scenarioRef = useRef(scenario);
  const phaseRef = useRef<'SIGNAL' | 'RESULT'>('SIGNAL');
  const timeLeftRef = useRef(15);
  const hasEndedRef = useRef(false);
  const lastTickTimeRef = useRef<number>(0);

  // Configuration
  const TRADE_DURATION = 60; 

  // --- CHART SETUP ---
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0a0b0d' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#1f2937', style: 2 }, // Dotted
        horzLines: { color: '#1f2937', style: 2 },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        rightOffset: 10,
        barSpacing: 40, // Zoomed in focus
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00c076',
      downColor: '#ff3b30',
      borderVisible: false,
      wickUpColor: '#00c076',
      wickDownColor: '#ff3b30',
    });

    const levelLine = chart.addLineSeries({
      color: scenario.levelType === 'RESISTANCE' ? '#ef4444' : '#22c55e',
      lineWidth: 2,
      lineStyle: 2, // Dashed
      lastValueVisible: true,
      priceLineVisible: true,
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    lineSeriesRef.current = levelLine;

    // Handle Resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // --- SCENARIO INITIALIZATION ---
  useEffect(() => {
    scenarioRef.current = scenario;
    hasEndedRef.current = false;
    phaseRef.current = 'SIGNAL';
    setPhase('SIGNAL');
    timeLeftRef.current = 15;
    setTimeLeft(15);
    setEntryPrice(null);

    // Initialize Candle
    const startPrice = 1.08500 + (Math.random() * 0.00500);
    const initialTime = Math.floor(Date.now() / 1000) as Time;
    
    const initialCandle = {
      time: initialTime,
      open: startPrice,
      high: startPrice,
      low: startPrice,
      close: startPrice
    };

    currentCandleRef.current = initialCandle as CandleData;
    
    // Set S/R Level Line slightly away from price to give room to move
    const levelOffset = scenario.levelType === 'RESISTANCE' ? 0.00030 : -0.00030;
    const levelPrice = startPrice + levelOffset;

    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData([initialCandle]);
    }

    if (lineSeriesRef.current) {
      // Draw a line across history and future
      const data = [];
      for(let i=-10; i<60; i++) {
          data.push({ time: (initialTime as number) + (i*60) as Time, value: levelPrice });
      }
      lineSeriesRef.current.setData(data);
    }

  }, [scenario]);

  // --- USER INTERACTION HANDLING ---
  useEffect(() => {
    if (userAction && !entryPrice && currentCandleRef.current && phase === 'SIGNAL') {
      const price = currentCandleRef.current.close;
      setEntryPrice(price);
      onTradePlaced(userAction, price);
      
      // Transition to Result Phase
      const finishedSignalCandle = { ...currentCandleRef.current };
      
      // Create Next Candle
      const nextTime = (finishedSignalCandle.time as number) + 60 as Time;
      const nextCandle = {
          time: nextTime,
          open: finishedSignalCandle.close,
          high: finishedSignalCandle.close,
          low: finishedSignalCandle.close,
          close: finishedSignalCandle.close
      };

      currentCandleRef.current = nextCandle;
      phaseRef.current = 'RESULT';
      setPhase('RESULT');
      timeLeftRef.current = TRADE_DURATION;
      setTimeLeft(TRADE_DURATION);

      // Add marker to chart
      if (candleSeriesRef.current) {
          candleSeriesRef.current.update(nextCandle);
          candleSeriesRef.current.setMarkers([{
              time: finishedSignalCandle.time as Time,
              position: userAction === 'BUY' ? 'belowBar' : 'aboveBar',
              color: userAction === 'BUY' ? '#00c076' : '#ff3b30',
              shape: userAction === 'BUY' ? 'arrowUp' : 'arrowDown',
              text: 'ENTRY',
          }]);
      }
    }
  }, [userAction, phase]);

  // --- PHYSICS ENGINE LOOP ---
  useEffect(() => {
    const loop = (timestamp: number) => {
        if (hasEndedRef.current) return;
        if (!lastTickTimeRef.current) lastTickTimeRef.current = timestamp;

        const deltaTime = timestamp - lastTickTimeRef.current;
        
        // Update Physics approx every 16ms (60fps), but simulation logic relies on accumulating dt
        if (deltaTime >= 16) {
            lastTickTimeRef.current = timestamp;
            const dtSeconds = deltaTime / 1000;
            
            // 1. Update Timer
            timeLeftRef.current -= dtSeconds;
            setTimeLeft(Math.max(0, timeLeftRef.current));

            // 2. Check Expiry
            if (timeLeftRef.current <= 0) {
                if (phaseRef.current === 'SIGNAL') {
                     // Signal phase ended without trade?
                     if (userAction === 'NO_TRADE') {
                         finishGame();
                         return; // Stop loop
                     } else {
                         finishGame(); // Time ran out
                         return;
                     }
                } else {
                    finishGame();
                    return;
                }
            }

            // 3. Move Candle
            if (currentCandleRef.current) {
                const newCandle = simulatePricePhysics(
                    currentCandleRef.current,
                    scenarioRef.current,
                    phaseRef.current,
                    timeLeftRef.current
                );
                
                currentCandleRef.current = newCandle;
                if (candleSeriesRef.current) {
                    candleSeriesRef.current.update(newCandle);
                }
            }
        }

        requestAnimationFrame(loop);
    };

    const handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);

  const finishGame = () => {
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;
      if (userAction === 'NO_TRADE') {
          const correct = scenario.correctAction === 'NO_TRADE';
          onSimulationComplete(correct, currentCandleRef.current?.close || 0);
      } else {
          const finalPrice = currentCandleRef.current!.close;
          const entry = entryPrice || 0;
          const isWin = userAction === 'BUY' ? finalPrice > entry : finalPrice < entry;
          onSimulationComplete(isWin, finalPrice);
      }
  };

  // --- REALISTIC MARKET PHYSICS ---
  const simulatePricePhysics = (
      candle: CandleData, 
      scen: Scenario, 
      p: 'SIGNAL' | 'RESULT', 
      t: number
  ): CandleData => {
      let price = candle.close;
      
      // 1. Base Volatility (Brownian Motion)
      // OTC markets are jumpy. We use a "heavy tail" random distribution.
      const r1 = Math.random();
      const r2 = Math.random();
      const standardNormal = Math.sqrt(-2.0 * Math.log(r1)) * Math.cos(2.0 * Math.PI * r2);
      
      // Variable Volatility
      // Volatility increases as we get closer to "0" seconds (pressure builds)
      const baseVol = 0.00003;
      const urgencyFactor = p === 'SIGNAL' && t < 5 ? 2.5 : 1;
      const randomWalk = standardNormal * baseVol * urgencyFactor * Math.sqrt(0.016); // scaled to dt

      price += randomWalk;

      // 2. Scenario-Specific Drift (The "Story" of the candle)
      let drift = 0;

      if (p === 'SIGNAL') {
          // SIGNAL PHASE: 15s -> 0s
          
          // A: Drift towards the level initially (15s - 4s)
          if (t > 4) {
              const attractionStrength = 0.00001;
              if (scen.levelType === 'RESISTANCE') drift += attractionStrength;
              else drift -= attractionStrength;
          }

          // B: THE L3SR MOMENT (Last 3.5s)
          if (t <= 3.5) {
              const PUSH_FORCE = 0.00008; // Strong institutional push per tick
              
              switch(scen.last3sBehavior) {
                  case 'STRONG_PUSH_UP':
                      // Relentless buying
                      if (Math.random() > 0.3) drift += PUSH_FORCE;
                      break;
                  case 'STRONG_PUSH_DOWN':
                      // Relentless selling
                      if (Math.random() > 0.3) drift -= PUSH_FORCE;
                      break;
                  case 'REJECTION_UP':
                      // Push UP then Snap DOWN
                      if (t > 1.5) {
                           drift += PUSH_FORCE * 0.8; // Bait up
                      } else {
                           drift -= PUSH_FORCE * 1.5; // Snap back
                      }
                      break;
                  case 'REJECTION_DOWN':
                      if (t > 1.5) {
                           drift -= PUSH_FORCE * 0.8;
                      } else {
                           drift += PUSH_FORCE * 1.5;
                      }
                      break;
                  case 'DOJI_CHOPPY':
                      // Violent dual-side moves
                      if (Math.random() > 0.5) drift += PUSH_FORCE * 2;
                      else drift -= PUSH_FORCE * 2;
                      break;
              }
          }
      } else {
          // RESULT PHASE (60s trade)
          // Market "breathing" + Trend towards outcome
          const timeElapsed = TRADE_DURATION - t;
          
          // Sine wave to simulate pullback/breather
          const marketBreath = Math.sin(timeElapsed / 2) * 0.00002;
          
          const trendStrength = 0.000015;
          if (scen.correctAction === 'BUY') drift += trendStrength;
          else if (scen.correctAction === 'SELL') drift -= trendStrength;
          
          drift += marketBreath;
      }

      price += drift;

      // 3. Jumps (OTC Glitches)
      // 1% chance of a micro-gap
      if (Math.random() < 0.01) {
          price += (Math.random() - 0.5) * 0.0002;
      }

      return {
          ...candle,
          close: price,
          high: Math.max(candle.high, price),
          low: Math.min(candle.low, price)
      };
  };

  return (
    <div className="w-full h-full rounded-lg relative shadow-2xl border border-gray-800 bg-[#0a0b0d] overflow-hidden">
       {/* Chart Container for Lightweight Charts */}
       <div ref={chartContainerRef} className="w-full h-[400px] z-10 relative" />
       
       {/* Overlays */}
       <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            {phase === 'SIGNAL' ? (
                 <div className="bg-black/40 backdrop-blur-md border border-gray-600/50 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                     <div className={`w-2 h-2 rounded-full ${timeLeft <= 3.5 ? 'bg-red-500 animate-ping' : 'bg-yellow-400'}`}></div>
                     <span className={`text-xl font-mono font-bold ${timeLeft <= 3.5 ? 'text-red-400 scale-110 transition-transform' : 'text-gray-200'}`}>
                        00:{Math.floor(timeLeft).toString().padStart(2, '0')}
                     </span>
                 </div>
            ) : (
                <div className="bg-[#1e222d] border border-trading-accent/50 px-5 py-2 rounded-lg shadow-xl flex items-center gap-3">
                    <span className="text-gray-400 text-[10px] font-bold uppercase">Expiring</span>
                    <span className="text-2xl font-mono font-bold text-white">
                       00:{Math.ceil(timeLeft).toString().padStart(2, '0')}
                    </span>
                </div>
            )}
            
            {/* Visual Alert for L3SR Moment */}
            {phase === 'SIGNAL' && timeLeft <= 3.5 && (
                 <div className="mt-2 text-[10px] uppercase tracking-[0.3em] font-bold text-red-500/50 animate-pulse">
                     Last 3 Seconds
                 </div>
            )}
       </div>
    </div>
  );
};

export default LiveChart;