import { Card } from '../types';

export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
export const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const DISPLAY_VALUES: Record<number, string> = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({
        suit,
        value,
        displayValue: DISPLAY_VALUES[value],
      });
    }
  }
  
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

export function isCardBetween(card: Card, lowerCard: Card, higherCard: Card): boolean {
  return card.value > lowerCard.value && card.value < higherCard.value;
}