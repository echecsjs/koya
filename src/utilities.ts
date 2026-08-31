import type { CompletedRound, Game, Player } from '@echecs/tournament';

function gamesForPlayer(player: string, rounds: CompletedRound[]): Game[] {
  return rounds
    .flatMap((r) => r.games)
    .filter((g) => g.white === player || g.black === player);
}

function opponents(player: string, rounds: CompletedRound[]): string[] {
  return gamesForPlayer(player, rounds).map((g) =>
    g.white === player ? g.black : g.white,
  );
}

function scoreFor(player: string, game: Game): number {
  if (game.result === 'draw') {
    return 0.5;
  }
  if (game.result === 'none') {
    return 0;
  }
  return (game.result === 'white' && game.white === player) ||
    (game.result === 'black' && game.black === player)
    ? 1
    : 0;
}

function koyaScore(
  player: string,
  rounds: CompletedRound[],
  players: Player[],
  threshold: number,
): number {
  let sum = 0;
  for (const opp of opponents(player, rounds)) {
    const opponent = players.find((p) => p.id === opp);
    if (opponent === undefined || opponent.points < threshold) {
      continue;
    }
    const gamesBetween = gamesForPlayer(player, rounds).filter(
      (g) => g.white === opp || g.black === opp,
    );
    for (const g of gamesBetween) {
      sum += scoreFor(player, g);
    }
  }
  return sum;
}

export { gamesForPlayer, koyaScore, opponents, scoreFor };
