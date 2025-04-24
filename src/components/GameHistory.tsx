import React from 'react';
import { useGameContext } from '../context/useGameContext';

const GameHistory: React.FC = () => {
  const { state } = useGameContext();
  const { gameHistory } = state;
  
  if (gameHistory.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute top-16 right-4 w-72 bg-gray-900/90 rounded-lg p-4 shadow-xl backdrop-blur-sm z-10 overflow-auto max-h-96">
      <h3 className="text-yellow-400 text-lg font-bold mb-2 border-b border-yellow-800 pb-2">
        遊戲歷史
      </h3>
      
      <div className="space-y-3">
        {gameHistory.map((entry, index) => {
          const resultClass = 
            entry.result === 'win' ? 'text-green-400' : 
            entry.result === 'lose' ? 'text-red-400' : 'text-gray-400';
          
          const cardValues = entry.playerCards.map(c => c.displayValue).join(' 和 ');
          const dealerValue = entry.dealerCard?.displayValue || '?';
          
          return (
            <div key={index} className="border-b border-gray-700 pb-2">
              <div className="flex justify-between">
                <span className="text-gray-300">下注:</span>
                <span className="text-yellow-400">${entry.bet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">你的牌:</span>
                <span className="text-white">{cardValues}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">莊家牌:</span>
                <span className="text-white">{dealerValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">結果:</span>
                <span className={resultClass}>
                  {entry.result === 'win' 
                    ? `贏得 +$${entry.moneyChange}` 
                    : entry.result === 'lose' 
                      ? `輸掉 -$${-entry.moneyChange}` 
                      : '平局'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHistory;