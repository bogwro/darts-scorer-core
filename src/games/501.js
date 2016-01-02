import DartsBaseGame from './dartsBaseGame';

/**
 * Class representing a 501 Game
 *
 * @class Darts501Game
 */
export default class Darts501Game extends DartsBaseGame {

  static defaultOptions = {
    startingPoints: 501,
    doubleIn: false,
    doubleOut: true
  };

  /**
   * Initializes a new instance of the `Darts501Game` class.
   *
   * @constructs Darts501Game
   * @param {Player[]} players An array of players.
   * @param {Object} [options={}] The options object
   *
   * @example
   * // Creating the new instance
   * var game = new Darts501Game([new Player({name: 'Player 1'}), new Player({name: 'Player 2'})]);
   *
   */
  constructor(players, options = {}) {
    let opts = Object.assign({}, Darts501Game.defaultOptions, options);
    super(players, opts);
  }

  /**
   * Determines whether option `doubleIn` is set to `true` or `false`.
   *
   * @returns {boolean} If `true` it will affect game specific logic.
   */
  get doubleIn() {
    return this._options.doubleIn;
  }

  /**
   * Determines whether option `doubleOut` is set to `true` or `false`.
   *
   * @returns {boolean} If `true` it will affect game specific logic.
   */
  get doubleOut() {
    return this._options.doubleOut;
  }

  /**
   * Represents single `throw`.
   *
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   * @returns {Throw} `Throw` instance.
   */
  throw(num, multiplier = 1) {
    let currentThrow = super.throw(num, multiplier);

    if(this.currentPlayerTotalPoints === 0) {
      if(this.doubleOut) {
        if(multiplier === 2) {
          this.currentPlayer.winner = true;
        } else {
          this.invalidateRound(this.currentRound);
        }
      } else {
        this.currentPlayer.winner = true;
      }
    }

    if(this.currentPlayerTotalPoints < 0) {
      this.invalidateRound(this.currentRound);
    }

    if(num && this.doubleIn && (this.currentPlayerTotalPoints + num * multiplier) === this.startingPoints && multiplier !== 2) {
      this.invalidateThrow(currentThrow);
    }

    if(this.doubleOut && this.currentPlayerTotalPoints === 1) {
      this.invalidateRound(this.currentRound);
    }

    return currentThrow;

  }

  /**
   * @returns {number} Calculates points for `currentRound`
   */
  get currentRoundPoints() {
    return Array.from(this.currentRound.throws).reduce((prev, curr) => prev + curr.number * curr.multiplier, 0);
  }

  /**
   * @returns {number} Calculates total points for `currentPlayer`
   */
  get currentPlayerTotalPoints() {
    return this.getPointsByPlayer(this.currentPlayer);
  }

  /**
   * Calculates total points for specific player.
   *
   * @param {Player} player Instance of the `Player` class.
   * @returns {number} Total points.
   */
  getPointsByPlayer(player) {
    return this.startingPoints - this.throwsByPlayer(player).reduce((prev, curr) => prev + curr.number * curr.multiplier, 0);
  }

  /**
   * @returns {Number} Points that game starts with.
   */
  get startingPoints() {
    return parseInt(this._options.startingPoints, 10);
  }

}
