import { koyaScore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const koyaLimitP1: Tiebreak = (player, rounds, players) =>
  koyaScore(player, rounds, players, rounds.length / 2 + 0.5);

export { koyaLimitP1, koyaLimitP1 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
