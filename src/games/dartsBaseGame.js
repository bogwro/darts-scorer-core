import Round from '../round';

/**
 * Provides all the logic to create multiplier games based on this class
 *
 * @class DartsBaseGame
 */
export default class DartsBaseGame {

  /**
   * @static
   * @property {Object} defaultOptions
   * @property {Boolean} defaultOptions.isComputer
   */
  static defaultOptions = {
    round: {
      throwsPerRound: 3
    }
  };

  _players = new Set();
  _playerRounds = new Map();

  _currentRoundNumber = 0;
  _currentPlayer = null;

  /**
   * Initializes a new instance of the `DartsBaseGame` class.
   *
   * @param {Player[]} players Collection of players.
   * @param {Object} [options={}] Options.
   */
  constructor(players, options = {}) {
    if(!players || !players.length) {
      throw Error('No players provided');
    }

    this.addPlayers(players);
    this._options = Object.assign({}, DartsBaseGame.defaultOptions, options);

    this._playersIterator = this._players[Symbol.iterator]();
    let data = this._playersIterator.next();
    this._currentPlayer = data.value;
    this.nextRound();
  }

  /**
   * Represents single `throw`. Delegates its execution to the `currentRound` object.
   *
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   * @returns {Throw} `Throw` instance.
   */
  throw(num, multiplier = 1) {
    return this.currentRound.throw(num, multiplier);
  }

  /**
   * Invalidates specific round.
   *
   * @param {Round} round `Round` instance.
   */
  invalidateRound(round) {
    round.invalidate();
  }

  /**
   * Invalidates specific `throw`.
   *
   * @param {Throw} dartsThrow `Throw` instance.
   */
  invalidateThrow(dartsThrow) {
    dartsThrow.number = 0;
    dartsThrow.multiplier = 1;
  }

  /**
   * Sets `currentPlayer` to the next one.
   * @returns {Player} Returns player.
   */
  nextPlayer() {
    let data = this._playersIterator.next();

    if(data.done) {
      this._playersIterator = this._players[Symbol.iterator]();
      this.nextRound();
      return this.nextPlayer();
    }

    this._currentPlayer = data.value;
    return this._currentPlayer;
  }

  /**
   * Creates new instance of the `Round` for each player.
   */
  nextRound() {
    let round;

    for(let player of this._players) {
      round = new Round(this._options.round);
      this._playerRounds.get(player).get('rounds').add(round);
      this._playerRounds.get(player).set('currentRound', round);
    }

    this._currentRoundNumber++;
  }

  /**
   * Adds a player to the game.
   *
   * @param {Player} player Instance of `Player` class.
   */
  addPlayer(player) {
    this._players.add(player);
    this._playerRounds.set(player, new Map().set('rounds', new Set()));
  }

  /**
   * Add multiple players to the game.
   *
   * @param {Player[]} players Array of players.
   */
  addPlayers(players) {
    for(let player of players) {
      this.addPlayer(player);
    }
  }

  /**
   * @returns {Player[]} Array of players.
   */
  get players() {
    return Array.from(this._players);
  }

  /**
   * @returns {number} Throws per round.
   */
  get throwsPerRound() {
    return this._options.round.throwsPerRound;
  }

  /**
   * @returns {Player} Return `Player`
   */
  get currentPlayer() {
    return this._currentPlayer;
  }

  /**
   * @returns {Round} Return `Round`.
   */
  get currentRound() {
    return this._playerRounds.get(this.currentPlayer).get('currentRound');
  }

  /**
   * @returns {number} Round number.
   */
  get currentRoundNumber() {
    return this._currentRoundNumber;
  }

  /**
   * @param {Player} player Instance of the `Player`.
   * @returns {Round[]} Array of rounds.
   */
  roundsByPlayer(player) {
    return Array.from(this._playerRounds.get(player).get('rounds'));
  }

  /**
   * @param {Player} player Instance of the `Player`.
   * @returns {Throw[]} Array of `Throw` instances.
   */
  throwsByPlayer(player) {
    return this.roundsByPlayer(player).reduce((prev, curr) => {
      return prev.concat(Array.from(curr.throws));
    }, []);
  }

}
