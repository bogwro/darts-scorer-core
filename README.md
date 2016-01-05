# darts-scorer-core

[![Build Status](https://travis-ci.org/bogwro/darts-scorer-core.svg?branch=master)](https://travis-ci.org/bogwro/darts-scorer-core)
[![Code Coverage](https://codecov.io/github/bogwro/darts-scorer-core/coverage.svg?branch=master)](https://codecov.io/github/bogwro/darts-scorer-core?branch=master)
[![Documentation Coverage](https://doc.esdoc.org/github.com/bogwro/darts-scorer-core/badge.svg)](https://doc.esdoc.org/github.com/bogwro/darts-scorer-core/)
[![npm](https://img.shields.io/npm/v/darts-scorer-core.svg)](https://www.npmjs.com/package/darts-scorer-core)

> This is a core module for building Darts games and front-end.

It is easy to extend to match own needs.

## Installation

```
npm install darts-scorer-core --save-dev
```

## Example Usage

````javascript
import dartsScorerCore from 'darts-scorer-core';

let player1 = new dartsScorerCore.Player('Player 1');
let player2 = new dartsScorerCore.Player('Player 2');

let game = new dartsScorerCore.games.Darts501Game([player1, player2]);

game.throw(10);
game.throw(15, 2);
game.throw(20, 3);

console.log('Player 1 points', game.currentPlayerTotalPoints);

game.nextPlayer();

game.throw(1);
game.throw(18, 2);
game.throw(19, 3);

console.log('Player 2 points', game.currentPlayerTotalPoints);

game.nextRound();

````

## Contributing

Follow the [airbnb styleguide](https://github.com/airbnb/javascript#ecmascript-6-styles).

Requires node `^5.0.0`.

```
npm install 
```

## License

MIT