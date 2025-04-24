import React, { useState, useEffect } from 'react';

interface ControlsProps {
  gameStatus: string;
  money: number;
  onPlaceBet: (amount: number) => void;
  onNextRound: () => void;
  onGetLoan: () => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  gameStatus, 
  money, 
  onPlaceBet, 
  onNextRound,
  onGetLoan
}) => {
  const [betAmount, setBetAmount] = useState(0);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setBetAmount(0);
    setError('');
  }, [gameStatus]);
  
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    if (isNaN(amount)) {
      setBetAmount(0);
      return;
    }
    
    setBetAmount(amount);
    
    if (amount > money) {
      setError('下注金額不能超過您的餘額！');
    } else if (amount < 0) {
      setError('下注金額不能為負數！');
    } else {
      setError('');
    }
  };
  
  const validateAndPlaceBet = () => {
    if (betAmount > money) {
      setError('下注金額不能超過您的餘額！');
      return;
    }
    
    if (betAmount < 0) {
      setError('下注金額不能為負數！');
      return;
    }
    
    onPlaceBet(betAmount);
  };
  
  const renderBettingControls = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-xs">
        <input
          type="number"
          value={betAmount}
          onChange={handleBetChange}
          min="0"
          max={money}
          className="w-full px-4 py-2 rounded-md border-2 border-yellow-600 bg-yellow-100 text-black text-center text-xl font-bold"
          placeholder="輸入下注金額"
        />
        {error && (
          <p className="absolute -bottom-6 left-0 text-red-400 text-sm">{error}</p>
        )}
      </div>
      
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setBetAmount(0)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
        >
          跳過 (下注 $0)
        </button>
        
        <button
          onClick={validateAndPlaceBet}
          disabled={!!error}
          className={`px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition-colors ${
            error ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          下注 ${betAmount}
        </button>
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setBetAmount(Math.max(5, Math.min(5, money)))}
          className="px-3 py-1 bg-yellow-800 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          $5
        </button>
        <button
          onClick={() => setBetAmount(Math.max(10, Math.min(10, money)))}
          className="px-3 py-1 bg-yellow-800 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          $10
        </button>
        <button
          onClick={() => setBetAmount(Math.max(25, Math.min(25, money)))}
          className="px-3 py-1 bg-yellow-800 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          $25
        </button>
        <button
          onClick={() => setBetAmount(money)}
          className="px-3 py-1 bg-yellow-800 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          全押
        </button>
      </div>
    </div>
  );
  
  const renderRoundOverControls = () => (
    <button
      onClick={onNextRound}
      className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md text-lg transition-colors"
    >
      下一輪
    </button>
  );
  
  const renderBankruptControls = () => (
    <div className="flex gap-4">
      <button
        onClick={onGetLoan}
        className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md text-lg transition-colors"
      >
        獲得貸款 ($100)
      </button>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md text-lg transition-colors"
      >
        結束遊戲
      </button>
    </div>
  );
  
  return (
    <div className="mt-10 flex justify-center">
      {gameStatus === 'betting' && renderBettingControls()}
      {gameStatus === 'round_over' && renderRoundOverControls()}
      {gameStatus === 'bankrupt' && renderBankruptControls()}
      {gameStatus === 'dealing' && (
        <div className="px-6 py-3 bg-gray-700 text-white rounded-md text-lg">
          發牌中...
        </div>
      )}
    </div>
  );
};

export default Controls;