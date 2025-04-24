import React from 'react';

interface GameStatusProps {
  message: string;
  money: number;
  bet: number;
}

const GameStatus: React.FC<GameStatusProps> = ({ message, money, bet }) => {
  return (
    <div className="text-center">
      <div className="bg-yellow-900/50 rounded-lg p-4 mb-4">
        <p className="text-lg text-yellow-100">{message}</p>
      </div>
      
      <div className="flex justify-around items-center mb-4">
        <div className="bg-yellow-700 rounded-full px-6 py-3 flex items-center gap-2">
          <span className="text-yellow-200">餘額:</span>
          <span className="text-2xl font-bold text-yellow-400">${money}</span>
        </div>
        
        {bet > 0 && (
          <div className="bg-yellow-700/50 rounded-full px-6 py-3 flex items-center gap-2">
            <span className="text-yellow-200">當前下注:</span>
            <span className="text-2xl font-bold text-yellow-400">${bet}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStatus;