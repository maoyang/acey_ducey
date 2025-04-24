import React, { useState, useEffect } from 'react';
import Card from './Card';
import Controls from './Controls';
import GameStatus from './GameStatus';
import GameHistory from './GameHistory';
import { useGameContext } from '../context/GameContext';
import { isCardBetween } from '../utils/cardUtils';

const GameBoard: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const { playerCards, dealerCard, gameStatus, message, isDealing } = state;
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (gameStatus === 'dealing' && !isDealing) {
      // Evaluate the round after card is dealt
      const { result, winAmount } = evaluateRound();
      
      setTimeout(() => {
        dispatch({
          type: 'EVALUATE_ROUND',
          payload: { result, winAmount },
        });
      }, 1000);
    }
  }, [gameStatus, isDealing]);

  const evaluateRound = () => {
    if (!dealerCard || playerCards.length !== 2) {
      return { result: 'lose', winAmount: 0 };
    }

    // Sort cards by value
    const [lowerCard, higherCard] = [...playerCards].sort((a, b) => a.value - b.value);
    
    // Check if dealer card is equal to either player card - this is a loss
    if (dealerCard.value === lowerCard.value || dealerCard.value === higherCard.value) {
      return { result: 'lose', winAmount: 0 };
    }
    
    // Check if dealer card is between player cards
    if (isCardBetween(dealerCard, lowerCard, higherCard)) {
      return { result: 'win', winAmount: state.currentBet };
    }
    
    return { result: 'lose', winAmount: 0 };
  };

  const startNextRound = () => {
    // Take the next two cards from the deck and update remaining deck
    const nextCards = [state.deck[0], state.deck[1]];
    const remainingDeck = state.deck.slice(2);
    
    dispatch({
      type: 'NEXT_ROUND',
      payload: { playerCards: nextCards, deck: remainingDeck },
    });
  };

  const handleDealerCard = () => {
    // Use the next card from the deck as the dealer's card
    // and update the remaining deck
    if (state.deck.length > 0) {
      const dealerCard = state.deck[0];
      const remainingDeck = state.deck.slice(1);
      
      dispatch({
        type: 'DEAL_CARD',
        payload: { card: dealerCard, deck: remainingDeck },
      });
    }
  };

  return (
    <div className="bg-green-800 rounded-lg p-6 shadow-xl relative">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-sm transition-colors"
        >
          {showHistory ? "隱藏歷史" : "遊戲歷史"}
        </button>
      </div>
      
      {showHistory && <GameHistory />}
      
      <GameStatus message={message} money={state.money} bet={state.currentBet} />
      
      <div className="mt-8 flex justify-center items-center gap-8 flex-wrap">
        <div className="relative">
          <p className="text-center mb-2 text-yellow-200">你的牌</p>
          <div className="flex gap-4 justify-center">
            {playerCards.map((card, index) => (
              <Card key={`player-${index}`} card={card} />
            ))}
          </div>
        </div>
        
        <div className="text-4xl text-yellow-400 font-bold">vs</div>
        
        <div className="relative">
          <p className="text-center mb-2 text-yellow-200">莊家的牌</p>
          <div className="min-w-28 min-h-40">
            {dealerCard ? (
              <Card card={dealerCard} isRevealing={gameStatus === 'dealing'} />
            ) : (
              <div className="w-28 h-40 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                <p className="text-gray-500">?</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Controls 
        gameStatus={gameStatus}
        money={state.money}
        onPlaceBet={(amount) => {
          dispatch({ type: 'PLACE_BET', payload: { amount } });
          setTimeout(handleDealerCard, 500);
        }}
        onNextRound={startNextRound}
        onGetLoan={() => dispatch({ type: 'GET_LOAN', payload: {} })}
      />
    </div>
  );
};

export default GameBoard;