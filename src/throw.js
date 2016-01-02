/**
 * Class representing a single `Throw`
 *
 * @class Throw
 */
export default class Throw {

  /**
   * Initializes a new instance of the `Throw` class.
   *
   * @constructs Throw
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   */
  constructor(num, multiplier = 1) {
    this._number = parseInt(num, 10);
    this._multiplier = parseInt(multiplier, 10);
  }

  /**
   * Factory function.
   *
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   * @returns {Throw} Instance of the `Throw` class.
   */
  static create(num, multiplier = 1) {
    return new Throw(num, multiplier);
  }

  /**
   * @returns {Number} Getter `number`.
   */
  get number() {
    return this._number;
  }

  /**
   * Sets `number`.
   * @param {Number} num Setter `number`.
   */
  set number(num) {
    this._number = num;
  }

  /**
   * @returns {Number} Getter `multiplier`.
   */
  get multiplier() {
    return this._multiplier;
  }

  /**
   * Sets `multiplier`.
   * @param {Number} multiplier Setter `multiplier`.
   */
  set multiplier(multiplier) {
    this._multiplier = multiplier;
  }

  /**
   * @returns {boolean} Helper getter.
   */
  get isSingle() {
    return this.multiplier === 1;
  }

  /**
   * @returns {boolean} Helper getter.
   */
  get isDouble() {
    return this.multiplier === 2;
  }

  /**
   * @returns {boolean} Helper getter.
   */
  get isTriple() {
    return this.multiplier === 3;
  }

  /**
   * @returns {string} `String` representation of the `Throw` instance.
   */
  toString() {
    return [this.number, this.multiplier].toString();
  }

}
