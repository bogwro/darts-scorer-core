# darts-scorer-core

[![Build Status](https://travis-ci.org/bogwro/darts-scorer-core.svg?branch=master)](https://travis-ci.org/bogwro/darts-scorer-core)
[![Code Coverage](https://codecov.io/github/bogwro/darts-scorer-core/coverage.svg?branch=master)](https://codecov.io/github/bogwro/darts-scorer-core?branch=master)
[![Documentation Coverage](https://doc.esdoc.org/github.com/bogwro/darts-scorer-core/badge.svg)](https://doc.esdoc.org/github.com/bogwro/darts-scorer-core/)
[![npm](https://img.shields.io/npm/v/darts-scorer-core.svg)](https://www.npmjs.com/package/darts-scorer-core)
[![Dependency Status](https://david-dm.org/bogwro/darts-scorer-core.svg)](https://david-dm.org/bogwro/darts-scorer-core)
[![devDependency Status](https://david-dm.org/bogwro/darts-scorer-core/dev-status.svg)](https://david-dm.org/bogwro/darts-scorer-core#info=devDependencies)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> This is a core module for building Darts games and front-end.

It is easy to extend to match own needs.

Check-out [Online Playground](https://tonicdev.com/bogumil/darts-scorer-core)

[Online Implementation](http://bogwro.github.io/darts-scorer-angular)

[Implementation's Source Code](https://github.com/bogwro/darts-scorer-angular)

## Installation

```
npm install darts-scorer-core --save-dev
```

## Example Usage

Depends on the way how you want to use this library, 
there are two ways of building dependency on it.

* ES6

```
import dartsScorerCore from 'darts-scorer-core';
```

* Node / Browser



```
var dartsScorerCore = require("darts-scorer-core");

// `default` is used by `webpack` to be ready for ES6
// next line is not needed when used in workflow where `webpack` is being used
dartsScorerCore = dartsScorerCore.default || dartsScorerCore;
```

The rest of the code follows ES6 notation:

````javascript
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

### QA

Run tests & coverage report during development

```
npm run test:all
```

### Manage files

Use `terminal` to manage files using git commands, for example:

```
git status
git add .
```

Use dedicated script to commit changes to git repository:

```
npm run commit
```

Push changes to the server:

```
git push origin master
```

> Check status of the [build](https://travis-ci.org/bogwro/darts-scorer-core)


When the build is successful and there is at least one bug fix or new feature that is committed since last release than there should be a new [npm release](https://www.npmjs.com/package/darts-scorer-core) as well as new tag and release on [GitHub](https://github.com/bogwro/darts-scorer-core/releases)

### Upgrade Node version

```
nvm install stable && nvm current > .nvmrc
```

### Upgrade packages

```
npm run upgrade-packages
```

Test the app before committing

## License

MIT