import { koyaScore } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const koyaLimitM2: Tiebreak = (player, rounds, players) =>
  koyaScore(player, rounds, players, rounds.length / 2 - 1);

export { koyaLimitM2, koyaLimitM2 as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
