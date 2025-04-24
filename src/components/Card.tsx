import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  isRevealing?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isRevealing = false }) => {
  const { suit, value, displayValue } = card;
  
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  }[suit];
  
  const suitColor = ['hearts', 'diamonds'].includes(suit) ? 'text-red-500' : 'text-black';
  
  const revealClass = isRevealing ? 'animate-flip' : '';
  
  return (
    <div className={`relative w-28 h-40 rounded-lg shadow-lg ${revealClass} perspective`}>
      <div className="w-full h-full bg-white rounded-lg border border-gray-300 flex flex-col p-2">
        <div className={`flex justify-between items-center ${suitColor}`}>
          <div className="text-xl font-bold">{displayValue}</div>
          <div className="text-xl">{suitSymbol}</div>
        </div>
        
        <div className={`flex-grow flex items-center justify-center ${suitColor}`}>
          <div className="text-4xl">{suitSymbol}</div>
        </div>
        
        <div className={`flex justify-between items-center ${suitColor} rotate-180`}>
          <div className="text-xl font-bold">{displayValue}</div>
          <div className="text-xl">{suitSymbol}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;