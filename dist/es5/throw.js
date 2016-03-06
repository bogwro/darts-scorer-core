'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a single `Throw`
 *
 * @class Throw
 */

var Throw = function () {

  /**
   * Initializes a new instance of the `Throw` class.
   *
   * @constructs Throw
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   */

  function Throw(num) {
    var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    _classCallCheck(this, Throw);

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


  _createClass(Throw, [{
    key: 'toString',


    /**
     * @returns {string} `String` representation of the `Throw` instance.
     */
    value: function toString() {
      var val = this._number === 25 ? 'B' : this._number;
      return '' + this.multiplierAsString + val;
    }
  }, {
    key: 'number',


    /**
     * @returns {Number} Getter `number`.
     */
    get: function get() {
      return this._number;
    }

    /**
     * Sets `number`.
     * @param {Number} num Setter `number`.
     */
    ,
    set: function set(num) {
      this._number = num;
    }

    /**
     * @returns {Number} Getter `multiplier`.
     */

  }, {
    key: 'multiplier',
    get: function get() {
      return this._multiplier;
    }

    /**
     * Sets `multiplier`.
     * @param {Number} multiplier Setter `multiplier`.
     */
    ,
    set: function set(multiplier) {
      this._multiplier = multiplier;
    }

    /**
     * @returns {boolean} Helper getter.
     */

  }, {
    key: 'isSingle',
    get: function get() {
      return this.multiplier === 1;
    }

    /**
     * @returns {boolean} Helper getter.
     */

  }, {
    key: 'isDouble',
    get: function get() {
      return this.multiplier === 2;
    }

    /**
     * @returns {boolean} Helper getter.
     */

  }, {
    key: 'isTriple',
    get: function get() {
      return this.multiplier === 3;
    }

    /**
     * Returns one of the followings: 'S' (single) or 'D' (double) or 'T' (triple)
     * @returns {number} String representing `multiplier`
     * @example
     * let throwInstance = new Throw(10, 2);
     * throwInstance.multiplierAsString //=> 'D'
     */

  }, {
    key: 'multiplierAsString',
    get: function get() {
      var map = new Map([[1, 'S'], [2, 'D'], [3, 'T']]);
      return map.get(this.multiplier);
    }
  }], [{
    key: 'create',
    value: function create(num) {
      var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

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

  }, {
    key: 'fromString',
    value: function fromString(str) {
      var regExp = /(S|D|T)(\d{1,2}|B)/ig;

      var _regExp$exec = regExp.exec(str);

      var _regExp$exec2 = _slicedToArray(_regExp$exec, 3);

      var multiplierStr = _regExp$exec2[1];
      var num = _regExp$exec2[2];

      var multiplierMap = new Map([['S', 1], ['D', 2], ['T', 3]]);
      var multiplier = multiplierMap.get(multiplierStr);

      return Throw.create(num, multiplier);
    }
  }]);

  return Throw;
}();

exports.default = Throw;