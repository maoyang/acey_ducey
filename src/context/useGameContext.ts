import { useContext } from 'react';
import { GameContext } from './gameContextCore';

// 導出 hook
export const useGameContext = () => useContext(GameContext);
