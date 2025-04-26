import React, { createContext, useReducer, useEffect } from 'react';
import { createDeck, shuffleDeck } from '../utils/cardUtils';
import { GameState, GameAction } from '../types';

const initialState: GameState = {
  deck: [],
  playerCards: [],
  dealerCard: null,
  money: 100,
  currentBet: 0,
  gameStatus: 'waiting',
  message: '歡迎來到 Acey-Ducey 遊戲！準備好開始了嗎？',
  gameHistory: [],
  isDealing: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        ...initialState,
        deck: action.payload.deck,
        message: '遊戲開始！請查看您的兩張牌，然後下注。',
        gameStatus: 'betting',
        playerCards: action.payload.playerCards,
      };
    
    case 'PLACE_BET':
      return {
        ...state,
        currentBet: action.payload.amount,
        gameStatus: 'dealing',
        isDealing: true,
      };
    
    case 'DEAL_CARD':
      return {
        ...state,
        dealerCard: action.payload.card,
        deck: action.payload.deck,
        isDealing: false,
      };
    
    case 'EVALUATE_ROUND': {
      const { result, winAmount } = action.payload;
      const newMoney = result === 'win' 
        ? state.money + winAmount 
        : state.money - state.currentBet;
      
      let message = '';
      if (result === 'win') {
        message = `恭喜！第三張牌在兩張牌之間。您贏得了 $${winAmount}！`;
      } else if (result === 'lose') {
        message = state.dealerCard && (
          state.dealerCard.value === state.playerCards[0].value || 
          state.dealerCard.value === state.playerCards[1].value
        )
          ? `很遺憾，第三張牌等於其中一張牌。您輸了 $${state.currentBet}。`
          : `很遺憾，第三張牌不在範圍內。您輸了 $${state.currentBet}。`;
      }

      const historyEntry = {
        playerCards: [...state.playerCards],
        dealerCard: state.dealerCard,
        bet: state.currentBet,
        result,
        moneyChange: result === 'win' ? winAmount : -state.currentBet,
      };

      return {
        ...state,
        money: newMoney,
        gameStatus: newMoney > 0 ? 'round_over' : 'bankrupt',
        message: newMoney > 0 ? message : `${message} 您破產了！需要貸款嗎？`,
        gameHistory: [historyEntry, ...state.gameHistory].slice(0, 10),
      };
    }
    
    case 'GET_LOAN':
      return {
        ...state,
        money: 100,
        gameStatus: 'round_over',
        message: '您獲得了 $100 的貸款。請繼續遊戲！',
      };
    
    case 'NEXT_ROUND':
      if (state.deck.length < 10) {
        // Reshuffle if running low on cards
        return {
          ...state,
          deck: shuffleDeck(createDeck()),
          playerCards: action.payload.playerCards,
          dealerCard: null,
          currentBet: 0,
          gameStatus: 'betting',
          message: '新的一輪！請查看您的兩張牌，然後下注。',
        };
      }
      
      return {
        ...state,
        deck: action.payload.deck || shuffleDeck(createDeck()),
        playerCards: action.payload.playerCards,
        dealerCard: null,
        currentBet: 0,
        gameStatus: 'betting',
        message: '新的一輪！請查看您的兩張牌，然後下注。',
      };
    
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Initialize game on first load
  useEffect(() => {
    const deck = shuffleDeck(createDeck());
    const playerCards = [deck[0], deck[1]];
    const remainingDeck = deck.slice(2);
    
    dispatch({
      type: 'NEW_GAME',
      payload: { playerCards, deck: remainingDeck },
    });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};