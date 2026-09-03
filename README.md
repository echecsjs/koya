# Koya

[![npm](https://img.shields.io/npm/v/@echecs/koya)](https://www.npmjs.com/package/@echecs/koya)
[![Coverage](https://codecov.io/gh/echecsjs/koya/branch/main/graph/badge.svg)](https://codecov.io/gh/echecsjs/koya)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Spec](https://img.shields.io/badge/Spec-FIDE-green.svg)](SPEC.md)

**Koya** computes the Koya tiebreak — a
[FIDE](https://handbook.fide.com/chapter/TieBreakRegulations032026)-defined
method for breaking tied scores in round-robin (all-play-all) chess tournaments
(section 9.2). TypeScript, zero runtime dependencies.

## Installation

```bash
npm install @echecs/koya
```

## Quick Start

```typescript
import { koya, tiebreak } from '@echecs/koya';
import type { Bye, CompletedRound, Game, Pairing, Player } from '@echecs/koya';

// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2
  [{ black: 'A', result: 0, white: 'D' }], // round 3
  // Unplayed rounds use kind to classify the bye type
  [{ black: '', kind: 'half-bye', result: 0.5, white: 'A' }], // round 4
];

const score = koya('A', games);
// Returns points scored against opponents who achieved >= 50% of the maximum score
```

## API

### `koya(player, games)`

**FIDE section 9.2.** Returns the total points `player` scored against opponents
who reached at least 50% of the tournament's maximum possible score. Round-robin
format only.

Byes (unplayed rounds) count toward neither the 50% threshold nor the score sum.
Array position sets the round: `games[0]` = round 1, `games[1]` = round 2, etc.
Unplayed rounds are classified by the `kind` field of the `Bye` type
(`'full' | 'half' | 'pairing' | 'zero'`).

```typescript
koya(player: string, games: Game[][]): number
```

`tiebreak` is an alias for `koya` for use in tiebreak pipelines.

### `/limit-m1`

**FIDE C.07 sections 9.2 + 14.5.** Koya with the threshold lowered to 50% − ½:
opponents qualify when they scored at least half the rounds minus one half
point.

```typescript
import { koyaLimitM1, tiebreak } from '@echecs/koya/limit-m1';
```

### `/limit-m2`

**FIDE C.07 sections 9.2 + 14.5.** Koya with the threshold lowered to 50% − 1:
opponents qualify when they scored at least half the rounds minus one point.

```typescript
import { koyaLimitM2, tiebreak } from '@echecs/koya/limit-m2';
```

### `/limit-p1`

**FIDE C.07 sections 9.2 + 14.5.** Koya with the threshold raised to 50% + ½:
opponents qualify when they scored at least half the rounds plus one half point.

```typescript
import { koyaLimitP1, tiebreak } from '@echecs/koya/limit-p1';
```

### `/limit-p2`

**FIDE C.07 sections 9.2 + 14.5.** Koya with the threshold raised to 50% + 1:
opponents qualify when they scored at least half the rounds plus one point.

```typescript
import { koyaLimitP2, tiebreak } from '@echecs/koya/limit-p2';
```

### Exports

```typescript
// Functions
export { koya, tiebreak } from '@echecs/koya';

// Types
export type { Bye, CompletedRound, Game, Pairing, Player } from '@echecs/koya';
```

Each limit variant subpath exports its named function (e.g. `koyaLimitP1`), a
`tiebreak` alias, and the same `Bye`, `CompletedRound`, `Game`, `Pairing`, and
`Player` types.

## Contributing

Contributions are welcome. Please open an issue at
[github.com/echecsjs/koya/issues](https://github.com/echecsjs/koya/issues).
