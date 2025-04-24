export interface Card {
  suit: string;
  value: number;
  displayValue: string;
}

export interface GameHistoryEntry {
  playerCards: Card[];
  dealerCard: Card | null;
  bet: number;
  result: 'win' | 'lose' | 'tie';
  moneyChange: number;
}

export interface GameState {
  deck: Card[];
  playerCards: Card[];
  dealerCard: Card | null;
  money: number;
  currentBet: number;
  gameStatus: 'waiting' | 'betting' | 'dealing' | 'round_over' | 'bankrupt';
  message: string;
  gameHistory: GameHistoryEntry[];
  isDealing: boolean;
}

export type GameAction =
  | { type: 'NEW_GAME'; payload: { playerCards: Card[]; deck: Card[] } }
  | { type: 'PLACE_BET'; payload: { amount: number } }
  | { type: 'DEAL_CARD'; payload: { card: Card; deck: Card[] } }
  | { type: 'EVALUATE_ROUND'; payload: { result: 'win' | 'lose' | 'tie'; winAmount: number } }
  | { type: 'GET_LOAN'; payload: {} }
  | { type: 'NEXT_ROUND'; payload: { playerCards: Card[]; deck?: Card[] } };