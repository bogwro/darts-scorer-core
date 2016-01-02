import {assert} from 'chai';
import Game from '../../src/games/501';

describe('Game "501"', () => {
  let players = null;
  let game = null;
  let options = null;

  beforeEach(() => {
    players = [{name: 'Player 1'}, {name: 'Player 2'}];
    options = {};
    game = new Game(players, options);
  });

  it('is an instance of Darts501Game', () => {
    assert.instanceOf(game, Game);
  });

  let properties = ['throw', 'nextPlayer', 'nextRound', 'addPlayers', 'addPlayer', 'currentPlayer', 'currentRound', 'invalidateRound', 'roundsByPlayer', 'throwsByPlayer'];

  for(let prop of properties) {
    it('has defined property "' + prop + '" inherited from the BASE class', () => {
      assert.isDefined(game[prop]);
    });
  }

  it('has defined property `doubleIn`', () => {
    assert.isDefined(game.doubleIn);
  });

  it('has defined property `doubleOut`', () => {
    assert.isDefined(game.doubleOut);
  });

  it('calculates total points per round after each throw', () => {
    game = new Game([{}]);
    game.throw(20, 3);
    assert.strictEqual(game.currentRoundPoints, 60);
    game.throw(19, 3);
    assert.strictEqual(game.currentRoundPoints, 117);
    game.throw(18, 3);
    assert.strictEqual(game.currentRoundPoints, 171);
  });

  it('`currentPlayerTotalPoints`', () => {
    assert.strictEqual(game.currentPlayerTotalPoints, 501);
  });

  it('calculates total points per user and sums all the points from the throws', () => {
    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501);

    game.throw(20, 3);
    assert.strictEqual(game.currentRoundPoints, 60);
    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501 - 60);
    game.throw(19, 3);
    assert.strictEqual(game.currentRoundPoints, 117);
    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501 - 117);
    game.throw(18, 3);
    assert.strictEqual(game.currentRoundPoints, 171);
    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501 - 171);

    game.nextPlayer();

    game.throw(20);
    game.throw(20);
    game.throw(20);

    assert.strictEqual(game.currentRoundPoints, 60);

    game.nextPlayer();

    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501 - 171);

    game.throw(20);

    assert.strictEqual(game.currentRoundPoints, 20);
    assert.strictEqual(game.getPointsByPlayer(game.currentPlayer), 501 - 171 - 20);
  });

  it('player `busts` when scoring more points than needed (0) which invalidates whole round for that player', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 60});

    game.throw(20);
    game.throw(20, 3);

    assert.strictEqual(game.getPointsByPlayer(player1), 60);
    assert.strictEqual(game.currentRoundPoints, 0);
  });

  it('player wins when reaches 0 points by throwing double', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 60});

    game.throw(20);
    game.throw(20, 2);

    assert.strictEqual(player1.winner, true);
  });

  it('player `busts` when reaches 0 points without throwing double when doubleOut is set to true', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 60});

    game.throw(20, 2);
    game.throw(20);

    assert.strictEqual(game.getPointsByPlayer(player1), 60);
    assert.strictEqual(game.currentRoundPoints, 0);
  });

  it('player `busts` when reaches 1 point and `doubleOut` is set to `true`', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 10, doubleOut: true});

    game.throw(3, 3);

    assert.strictEqual(game.currentRoundPoints, 0);
    assert.strictEqual(game.currentRound.isDone, true);
  });

  it('player starts receiving points once hit double when `doubleIn` option set to `true`', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 60, doubleIn: true});

    game.throw(20);

    assert.strictEqual(game.currentRoundPoints, 0);
    assert.strictEqual(game.getPointsByPlayer(player1), 60);

    game.throw(20, 2);

    assert.strictEqual(game.currentRoundPoints, 40);
    assert.strictEqual(game.getPointsByPlayer(player1), 20);

    game.throw(10);

    assert.strictEqual(game.currentRoundPoints, 50);
    assert.strictEqual(game.getPointsByPlayer(player1), 10);

    assert.strictEqual(game.currentRound.isDone, true);
  });

  it('player can win by reaching `0` points without last throw being `double` when `doubleOut` is set to `false`', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2], {startingPoints: 60, doubleOut: false});

    game.throw(20);
    game.throw(20);
    game.throw(20);

    assert.strictEqual(game.currentRoundPoints, 60);
    assert.strictEqual(game.getPointsByPlayer(player1), 0);
    assert.strictEqual(player1.winner, true);
  });


});
