# Koya

[![npm](https://img.shields.io/npm/v/@echecs/koya)](https://www.npmjs.com/package/@echecs/koya)
[![Test](https://github.com/mormubis/koya/actions/workflows/test.yml/badge.svg)](https://github.com/mormubis/koya/actions/workflows/test.yml)
[![Coverage](https://codecov.io/gh/mormubis/koya/branch/main/graph/badge.svg)](https://codecov.io/gh/mormubis/koya)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Koya** is a TypeScript library implementing the Koya tiebreak system for
round-robin chess tournaments, following the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(section 9.2). Zero runtime dependencies.

## Installation

```bash
npm install @echecs/koya
```

## Quick Start

```typescript
import { koya } from '@echecs/koya';

const games = [
  { blackId: 'B', result: 1, round: 1, whiteId: 'A' },
  { blackId: 'C', result: 0.5, round: 2, whiteId: 'A' },
  { blackId: 'A', result: 0, round: 3, whiteId: 'D' },
];

const score = koya('A', games);
// Returns points scored against opponents who achieved >= 50% of the maximum score
```

## API

### `koya(playerId, games)`

**FIDE section 9.2** — Koya score. Returns the total points scored by `playerId`
only in games played against opponents who achieved at least 50% of the maximum
possible score in the tournament. Designed for round-robin (all-play-all)
tournaments. Byes are excluded from both the threshold calculation and the score
sum.

```typescript
koya(playerId: string, games: Game[]): number
```

Drop-in compatible with the shared `Tiebreak` type
`(playerId: string, games: Game[], players: Player[]) => number`.

## Contributing

Contributions are welcome. Please open an issue at
[github.com/mormubis/koya/issues](https://github.com/mormubis/koya/issues).
