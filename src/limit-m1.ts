import { koyaScore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const koyaLimitM1: Tiebreak = (player, rounds, players) =>
  koyaScore(player, rounds, players, rounds.length / 2 - 0.5);

export { koyaLimitM1, koyaLimitM1 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
