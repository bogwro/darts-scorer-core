import Throw from './throw';

/**
 * Class representing a round.
 *
 * @class Round
 */
export default class Round {

  _throws = new Set();

  /**
   * @property {Object} defaultOptions Default options
   * @property {number} defaultOptions.throwsPerRound The default number of throws per round.
   *
   */
  defaultOptions = {
    throwsPerRound: 3
  };

  /**
   * Initializes a new instance of the `Round` class.
   *
   * @constructs Round
   * @param {Object} [options={}] The options object
   *
   * @example
   * var round = new Round();
   *
   * round.throw(20, 3);
   * round.throw(20, 3);
   * round.throw(20, 3);
   *
   * round.isDone //> `true`
   */
  constructor(options = {}) {
    this._options = Object.assign({}, this.defaultOptions, options);
  }

  /**
   * @returns {number} Number of throws per round.
   */
  get size() {
    return this._throws.size;
  }

  /**
   * @returns {Object} Options object.
   */
  get options() {
    return this._options;
  }

  /**
   * Represents single `throw`.
   *
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   * @returns {Throw} `Throw` instance.
   */
  throw(num, multiplier) {
    if(this.size < this.options.throwsPerRound) {
      let throwInstance = new Throw(num, multiplier);

      this._throws.add(throwInstance);

      return throwInstance;
    } else {
      return false;
    }
  }

  /**
   * Removes last throw from the round.
   *
   * @returns {boolean} Returns `true` or `false`.
   */
  pop() {
    return this._throws.delete(Array.from(this._throws).pop());
  }

  /**
   * @returns {Number} Getter option `throwsPerRound`.
   */
  get throwsPerRound() {
    return parseInt(this._options.throwsPerRound, 10);
  }

  /**
   * Clear all throws for the round.
   */
  clear() {
    this._throws.clear();
  }

  /**
   * @returns {boolean} `true` if `size` equals `0`. Otherwise `false`.
   */
  get isEmpty() {
    return this.size === 0;
  }

  /**
   * @returns {boolean} `true` if `size` equals `throwsPerRound`. Otherwise `false`.
   */
  get isDone() {
    return this.size === this.throwsPerRound;
  }

  /**
   * @returns {Set} Throws
   */
  get throws() {
    return this._throws;
  }

  /**
   * Invalidates whole round with specific `number` and `multiplier`.
   *
   * @param {number} number Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   */
  invalidate(number = 0, multiplier = 1) {
    this.clear();
    while(this.size < this.throwsPerRound) {
      this.throw(number, multiplier);
    }
  }

  /**
   * @returns {string} `String` representation of the `Round`.
   */
  toString() {
    return Array.from(this._throws).join('-');
  }

}
