import { describe, expect, it } from 'vitest';

import { koyaLimitP1 } from '../limit-p1.js';
import { koyaLimitP2 } from '../limit-p2.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1 },
  { id: 'B', points: 2, rank: 2 },
  { id: 'C', points: 1, rank: 3 },
  { id: 'D', points: 0.5, rank: 4 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'white', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'white', white: 'A' },
      { black: 'D', result: 'white', white: 'B' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'draw', white: 'A' },
      { black: 'C', result: 'white', white: 'B' },
    ],
  },
];

describe('koya raised limits', () => {
  it('KS/L+1 raises the limit by half a point', () => {
    expect(koyaLimitP1('A', ROUNDS, PLAYERS)).toBe(1);
  });

  it('KS/L+2 raises the limit by one point', () => {
    expect(koyaLimitP2('A', ROUNDS, PLAYERS)).toBe(0);
  });
});
