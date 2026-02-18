export enum PageState {
  HOME = 'HOME',
  GUIDE = 'GUIDE',
  ACCURACY = 'ACCURACY',
  SIMULATOR = 'SIMULATOR',
  JOURNAL = 'JOURNAL'
}

export type TrendType = 'UP' | 'DOWN' | 'RANGING';
export type LevelType = 'SUPPORT' | 'RESISTANCE';
export type CandleBehavior = 'STRONG_PUSH_UP' | 'STRONG_PUSH_DOWN' | 'REJECTION_UP' | 'REJECTION_DOWN' | 'DOJI_CHOPPY';

export interface Scenario {
  id: string;
  trend: TrendType;
  levelType: LevelType;
  last3sBehavior: CandleBehavior;
  correctAction: 'BUY' | 'SELL' | 'NO_TRADE';
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface GameLevel {
  id: number;
  name: string;
  winsRequired: number;
  description: string;
}

export interface SimulationResult {
  isCorrect: boolean;
  feedback: string;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface TradeLog {
  id: string;
  date: number;
  pair: string;
  direction: 'BUY' | 'SELL';
  result: 'WIN' | 'LOSS' | 'BREAKEVEN';
  note?: string;
}