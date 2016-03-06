'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dartsBaseGame = require('./dartsBaseGame');

var _dartsBaseGame2 = _interopRequireDefault(_dartsBaseGame);

var _throw2 = require('../throw');

var _throw3 = _interopRequireDefault(_throw2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a 501 Game
 *
 * @class Darts501Game
 */

var Darts501Game = function (_DartsBaseGame) {
  _inherits(Darts501Game, _DartsBaseGame);

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

  function Darts501Game(players) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Darts501Game);

    var opts = Object.assign({}, Darts501Game.defaultOptions, options);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Darts501Game).call(this, players, opts));
  }

  /**
   * Determines whether option `doubleIn` is set to `true` or `false`.
   *
   * @returns {boolean} If `true` it will affect game specific logic.
   */


  _createClass(Darts501Game, [{
    key: 'throw',


    /**
     * Represents single `throw`.
     *
     * @param {number} num Number between 0 and 20 plus 25 (bull)
     * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
     * @returns {Throw} `Throw` instance.
     */
    value: function _throw(num) {
      var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      var currentThrow = _get(Object.getPrototypeOf(Darts501Game.prototype), 'throw', this).call(this, num, multiplier);

      if (this.currentPlayerTotalPoints === 0) {
        if (this.doubleOut) {
          if (multiplier === 2) {
            this.currentPlayer.winner = true;
          } else {
            this.invalidateRound(this.currentRound);
          }
        } else {
          this.currentPlayer.winner = true;
        }
      }

      if (this.currentPlayerTotalPoints < 0) {
        this.invalidateRound(this.currentRound);
      }

      if (num && this.doubleIn && this.currentPlayerTotalPoints + num * multiplier === this.startingPoints && multiplier !== 2) {
        this.invalidateThrow(currentThrow);
      }

      if (this.doubleOut && this.currentPlayerTotalPoints === 1) {
        this.invalidateRound(this.currentRound);
      }

      return currentThrow;
    }

    /**
     * @returns {number} Calculates points for `currentRound`
     */

  }, {
    key: 'getPointsByPlayer',


    /**
     * Calculates total points for specific player.
     *
     * @param {Player} player Instance of the `Player` class.
     * @returns {number} Total points.
     */
    value: function getPointsByPlayer(player) {
      return this.startingPoints - this.throwsByPlayer(player).reduce(function (prev, curr) {
        return prev + curr.number * curr.multiplier;
      }, 0);
    }

    /**
     * @returns {Number} Points that game starts with.
     */

  }, {
    key: 'getCheckoutHint',


    /**
     * Calculates step-by-step throws to check-out in the same round.
     *
     * @param {number} points Total number of points left.
     * @param {number} leftThrows Number of throws.
     * @returns {Array} Array of possible throws as string.
     */
    value: function getCheckoutHint(points) {
      var leftThrows = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

      var results = [];

      var possibleThrows = [];

      var singles = [];
      var doubles = [];
      var triples = [];

      var num = 20;

      var getPoints = function getPoints(throwInstance) {
        return throwInstance.number * throwInstance.multiplier;
      };

      while (num > 0) {
        singles.push(new _throw3.default(num));
        doubles.push(new _throw3.default(num, 2));
        triples.push(new _throw3.default(num, 3));

        num--;
      }

      singles.push(new _throw3.default(25));
      doubles.push(new _throw3.default(25, 2));

      possibleThrows = possibleThrows.concat(singles, doubles, triples);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = doubles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var double = _step.value;


          if (points === getPoints(double)) {
            results.push([double]);
          }

          if (leftThrows > 1) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = possibleThrows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var possibleThrow = _step2.value;


                if (getPoints(possibleThrow) + getPoints(double) === points) {
                  results.push([possibleThrow, double]);
                }

                if (leftThrows > 2) {
                  var _iteratorNormalCompletion3 = true;
                  var _didIteratorError3 = false;
                  var _iteratorError3 = undefined;

                  try {

                    for (var _iterator3 = possibleThrows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var possibleThrow2 = _step3.value;

                      if (getPoints(possibleThrow) + getPoints(possibleThrow2) + getPoints(double) === points) {
                        results.push([possibleThrow2, possibleThrow, double]);
                      }
                    }
                  } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                      }
                    } finally {
                      if (_didIteratorError3) {
                        throw _iteratorError3;
                      }
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return results;
    }
  }, {
    key: 'doubleIn',
    get: function get() {
      return this._options.doubleIn;
    }

    /**
     * Determines whether option `doubleOut` is set to `true` or `false`.
     *
     * @returns {boolean} If `true` it will affect game specific logic.
     */

  }, {
    key: 'doubleOut',
    get: function get() {
      return this._options.doubleOut;
    }
  }, {
    key: 'currentRoundPoints',
    get: function get() {
      return Array.from(this.currentRound.throws).reduce(function (prev, curr) {
        return prev + curr.number * curr.multiplier;
      }, 0);
    }

    /**
     * @returns {number} Calculates total points for `currentPlayer`
     */

  }, {
    key: 'currentPlayerTotalPoints',
    get: function get() {
      return this.getPointsByPlayer(this.currentPlayer);
    }
  }, {
    key: 'startingPoints',
    get: function get() {
      return parseInt(this._options.startingPoints, 10);
    }
  }]);

  return Darts501Game;
}(_dartsBaseGame2.default);

Darts501Game.defaultOptions = {
  startingPoints: 501,
  doubleIn: false,
  doubleOut: true
};
exports.default = Darts501Game;