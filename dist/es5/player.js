"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides all the logic to create instance of Player
 *
 * @class Player
 */

var Player = function () {

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

  function Player(user) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Player);

    this.defaultOptions = {
      isComputer: false
    };

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


  /**
   * @property {Object} defaultOptions
   * @property {Boolean} defaultOptions.isComputer
   */


  _createClass(Player, [{
    key: "isComputer",
    get: function get() {
      return this._options.isComputer;
    }

    /**
     * @param {Boolean} bool Setter
     */
    ,
    set: function set(bool) {
      this._options.isComputer = bool;
    }
  }]);

  return Player;
}();

exports.default = Player;