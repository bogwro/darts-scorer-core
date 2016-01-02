import {assert} from 'chai';
import Game from '../../src/games/dartsBaseGame';

describe('Game BASE', () => {
  let players = null;
  let game = null;
  let options = null;

  beforeEach(() => {
    players = [{name: 'Player 1'}, {name: 'Player 2'}];
    options = {};
    game = new Game(players, options);
  });

  it('is an instance of DartsBaseGame', () => {
    assert.instanceOf(game, Game);
  });

  it('throws Error if not passing any players to constructor', () => {
    assert.throw(function() {
      return new Game([], options);
    }, Error);

    assert.throw(function() {
      return new Game(null, options);
    }, Error);

    assert.throw(function() {
      return new Game(undefined, options);
    }, Error);
  });

  it('instance can be created with passed players', () => {
    game = new Game([{}, {}]);
    assert.lengthOf(game.players, 2);
  });

  it('add 2 extra players we have 4 players available', () => {
    game = new Game([{}, {}]);
    game.addPlayers([{}, {}]);
    assert.lengthOf(game.players, 4);
  });

  it('has method "invalidateRound"', () => {
    assert.isFunction(game.invalidateRound);
  });

  it('has defined property "throwsPerRound"', () => {
    assert.isDefined(game.throwsPerRound);
  });

  it('current player is set to point to first player', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2]);

    assert.strictEqual(game.currentPlayer, player1);
  });

  it('iterates over players when "nextPlayer" is called', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2]);

    game.nextPlayer();
    assert.strictEqual(game.currentPlayer, player2);
  });

  it('iterates over players and points back at first one player', () => {
    let player1 = {name: 'Player 1'};
    let player2 = {name: 'Player 2'};

    game = new Game([player1, player2]);

    game.nextPlayer();
    game.nextPlayer();

    assert.strictEqual(game.currentPlayer, player1);
  });

  it('has defined "currentRound"', () => {
    assert.isDefined(game.currentRound);
  });

  it('has "currentRound" size set to 0 at the beginning of the game', () => {
    assert.strictEqual(game.currentRound.size, 0);
  });

  it('has "currentRound" size set to 3 after 3 throws', () => {
    let round = game.currentRound;

    game.throw(10, 1);
    game.throw(6, 3);
    game.throw(20, 3);

    assert.strictEqual(round.size, 3);
    assert.strictEqual(round.isDone, true);
  });

  it('provides method to invalidate round `invalidateRound(round)`', () => {
    let round = game.currentRound;

    let firstThrow = game.throw(20);

    let throwNumber = firstThrow.number;

    game.invalidateRound(round);

    assert.notEqual(Array.from(round.throws)[0].number, throwNumber);
  });

  it('provides method to invalidate throw `invalidateThrow(throw)`', () => {
    let round = game.currentRound;

    let firstThrow = game.throw(20, 3);

    let throwNumber = firstThrow.number;
    let throwMultiplier = firstThrow.multiplier;

    game.invalidateThrow(firstThrow);

    let invalidatedThrow = Array.from(round.throws)[0];

    assert.notEqual(invalidatedThrow.number, throwNumber);
    assert.notEqual(invalidatedThrow.multiplier, throwMultiplier);
  });

  it('provides method that returns "roundsByPlayer"', () => {
    let player = game.currentPlayer;
    let round = game.currentRound;

    assert.strictEqual(game.currentRoundNumber, 1);
    assert.lengthOf(game.roundsByPlayer(player), 1);

    game.throw(10);
    game.throw(10);
    game.throw(10);

    assert.strictEqual(round.isDone, true);

    game.nextPlayer();

    assert.notStrictEqual(game.currentPlayer, player);

    game.throw(20);
    game.throw(20);
    game.throw(20);

    game.nextPlayer();

    assert.strictEqual(game.currentPlayer, player);
    assert.strictEqual(game.currentRoundNumber, 2);
    assert.lengthOf(game.roundsByPlayer(player), 2);
    assert.lengthOf(game.throwsByPlayer(player), 3);
  });

});
