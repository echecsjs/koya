import type { Game } from './types.js';

const BYE_SENTINEL = '';

function gamesForPlayer(player: string, games: Game[][]): Game[] {
  return games.flat().filter((g) => g.white === player || g.black === player);
}

function opponents(player: string, games: Game[][]): string[] {
  return gamesForPlayer(player, games)
    .filter((g) => g.black !== BYE_SENTINEL)
    .map((g) => (g.white === player ? g.black : g.white));
}

function score(player: string, games: Game[][]): number {
  let sum = 0;
  for (const g of gamesForPlayer(player, games)) {
    sum += g.white === player ? g.result : 1 - g.result;
  }
  return sum;
}

export { BYE_SENTINEL, gamesForPlayer, opponents, score };
