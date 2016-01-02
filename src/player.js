/**
 * Provides all the logic to create instance of Player
 *
 * @class Player
 */
export default class Player {

  /**
   * @property {Object} defaultOptions
   * @property {Boolean} defaultOptions.isComputer
   */
  defaultOptions = {
    isComputer: false
  };

  /**
   * Initializes a new instance of the `Player` class.
   *
   * @constructs Player
   * @param {Object|*} user A user object.
   * @param {Object} [options={}] Options.
   *
   * @example
   * // Creating a new instance
   * var player1 = new Player({name: 'Player 1'});
   */
  constructor(user, options = {}) {
    /**
     * @type {Object|*}
     * @private
     */
    this._user = user;

    /**
     * @type {Object}
     * @private
     */
    this._options = Object.assign({}, this.defaultOptions, options);
  }

  /**
   * @returns {Boolean} Getter
   */
  get isComputer() {
    return this._options.isComputer;
  }

  /**
   * @param {Boolean} bool Setter
   */
  set isComputer(bool) {
    this._options.isComputer = bool;
  }

}
