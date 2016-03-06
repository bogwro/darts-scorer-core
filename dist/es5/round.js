'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throw2 = require('./throw');

var _throw3 = _interopRequireDefault(_throw2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a round.
 *
 * @class Round
 */

var Round = function () {

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

  function Round() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Round);

    this._throws = new Set();
    this.defaultOptions = {
      throwsPerRound: 3
    };

    this._options = Object.assign({}, this.defaultOptions, options);
  }

  /**
   * @returns {number} Number of throws per round.
   */


  /**
   * @property {Object} defaultOptions Default options
   * @property {number} defaultOptions.throwsPerRound The default number of throws per round.
   *
   */


  _createClass(Round, [{
    key: 'throw',


    /**
     * Represents single `throw`.
     *
     * @param {number} num Number between 0 and 20 plus 25 (bull)
     * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
     * @returns {Throw} `Throw` instance.
     */
    value: function _throw(num, multiplier) {
      if (this.size < this.options.throwsPerRound) {
        var throwInstance = new _throw3.default(num, multiplier);

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

  }, {
    key: 'pop',
    value: function pop() {
      return this._throws.delete(Array.from(this._throws).pop());
    }

    /**
     * @returns {Number} Getter option `throwsPerRound`.
     */

  }, {
    key: 'clear',


    /**
     * Clear all throws for the round.
     */
    value: function clear() {
      this._throws.clear();
    }

    /**
     * @returns {boolean} `true` if `size` equals `0`. Otherwise `false`.
     */

  }, {
    key: 'invalidate',


    /**
     * Invalidates whole round with specific `number` and `multiplier`.
     *
     * @param {number} number Number between 0 and 20 plus 25 (bull)
     * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
     */
    value: function invalidate() {
      var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.clear();
      while (this.size < this.throwsPerRound) {
        this.throw(number, multiplier);
      }
    }

    /**
     * @returns {string} `String` representation of the `Round`.
     */

  }, {
    key: 'toString',
    value: function toString() {
      return Array.from(this._throws).join('-');
    }
  }, {
    key: 'size',
    get: function get() {
      return this._throws.size;
    }

    /**
     * @returns {Object} Options object.
     */

  }, {
    key: 'options',
    get: function get() {
      return this._options;
    }
  }, {
    key: 'throwsPerRound',
    get: function get() {
      return parseInt(this._options.throwsPerRound, 10);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.size === 0;
    }

    /**
     * @returns {boolean} `true` if `size` equals `throwsPerRound`. Otherwise `false`.
     */

  }, {
    key: 'isDone',
    get: function get() {
      return this.size === this.throwsPerRound;
    }

    /**
     * @returns {Set} Throws
     */

  }, {
    key: 'throws',
    get: function get() {
      return this._throws;
    }
  }]);

  return Round;
}();

exports.default = Round;