"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a single `Throw`
 *
 * @class Throw
 */

var Throw = (function () {

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
    key: "toString",

    /**
     * @returns {string} `String` representation of the `Throw` instance.
     */
    value: function toString() {
      return [this.number, this.multiplier].toString();
    }
  }, {
    key: "number",

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
    key: "multiplier",
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
    key: "isSingle",
    get: function get() {
      return this.multiplier === 1;
    }

    /**
     * @returns {boolean} Helper getter.
     */

  }, {
    key: "isDouble",
    get: function get() {
      return this.multiplier === 2;
    }

    /**
     * @returns {boolean} Helper getter.
     */

  }, {
    key: "isTriple",
    get: function get() {
      return this.multiplier === 3;
    }
  }], [{
    key: "create",
    value: function create(num) {
      var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      return new Throw(num, multiplier);
    }
  }]);

  return Throw;
})();

exports.default = Throw;