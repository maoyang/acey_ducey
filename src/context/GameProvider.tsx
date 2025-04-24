import React, { useReducer, useEffect } from 'react';
import { createDeck, shuffleDeck } from '../utils/cardUtils';
import { GameContext, gameReducer, initialState } from './gameContextCore';

// 只導出 GameProvider 組件
const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export default GameProvider;
