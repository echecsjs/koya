import { describe, expect, it } from 'vitest';

import { koya } from '../index.js';
import { koyaLimitM1 } from '../limit-m1.js';
import { koyaLimitM2 } from '../limit-m2.js';

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

describe('koya limit variants', () => {
  it('base KS keeps threshold 50%', () => {
    expect(koya('A', ROUNDS, PLAYERS)).toBe(1);
  });

  it('KS/L-1 lowers the limit by half a point', () => {
    expect(koyaLimitM1('A', ROUNDS, PLAYERS)).toBe(2);
  });

  it('KS/L-2 lowers the limit by one point', () => {
    expect(koyaLimitM2('A', ROUNDS, PLAYERS)).toBe(2.5);
  });

  it('includes an opponent scoring exactly the lowered limit', () => {
    expect(koyaLimitM1('B', ROUNDS, PLAYERS)).toBe(1);
  });
});
