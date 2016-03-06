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
   * Factory function.
   *
   * @param {string} str String representing the throw
   * @returns {Throw} Instance of the `Throw` class.
   *
   * @example
   * let throwInstance1 = Throw.fromString('T20'); // triple 20
   * let throwInstance2 = Throw.fromString('S15'); // single 15
   * let throwInstance3 = Throw.fromString('DB'); // double Bull
   */
  static fromString(str) {
    let regExp = /(S|D|T)(\d{1,2}|B)/ig
    let [, multiplierStr, num] = regExp.exec(str);
    let multiplierMap = new Map([['S', 1], ['D', 2], ['T', 3]]);
    let multiplier = multiplierMap.get(multiplierStr);

    return Throw.create(num, multiplier);
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
   * Returns one of the followings: 'S' (single) or 'D' (double) or 'T' (triple)
   * @returns {number} String representing `multiplier`
   * @example
   * let throwInstance = new Throw(10, 2);
   * throwInstance.multiplierAsString //=> 'D'
   */
  get multiplierAsString() {
    let map = new Map([[1, 'S'], [2, 'D'], [3, 'T']]);
    return map.get(this.multiplier);
  }

  /**
   * @returns {string} `String` representation of the `Throw` instance.
   */
  toString() {
    let val = this._number === 25 ? 'B' : this._number;
    return `${this.multiplierAsString}${val}`;
  }

}
