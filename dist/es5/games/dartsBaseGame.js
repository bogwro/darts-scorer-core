'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _round = require('../round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides all the logic to create multiplier games based on this class
 *
 * @class DartsBaseGame
 */

var DartsBaseGame = function () {

  /**
   * Initializes a new instance of the `DartsBaseGame` class.
   *
   * @param {Player[]} players Collection of players.
   * @param {Object} [options={}] Options.
   */

  function DartsBaseGame(players) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, DartsBaseGame);

    this._players = new Set();
    this._playerRounds = new Map();
    this._currentRoundNumber = 0;
    this._currentPlayer = null;

    if (!players || !players.length) {
      throw Error('No players provided');
    }

    this.addPlayers(players);
    this._options = Object.assign({}, DartsBaseGame.defaultOptions, options);

    this._playersIterator = this._players[Symbol.iterator]();
    var data = this._playersIterator.next();
    this._currentPlayer = data.value;
    this.nextRound();
  }

  /**
   * Represents single `throw`. Delegates its execution to the `currentRound` object.
   *
   * @param {number} num Number between 0 and 20 plus 25 (bull)
   * @param {number} [multiplier=1] Multiplier is between 1 and 3 for all of the numbers but 25 (which has only x2 multiplier).
   * @returns {Throw} `Throw` instance.
   */


  /**
   * @static
   * @property {Object} defaultOptions
   * @property {Boolean} defaultOptions.isComputer
   */


  _createClass(DartsBaseGame, [{
    key: 'throw',
    value: function _throw(num) {
      var multiplier = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      return this.currentRound.throw(num, multiplier);
    }

    /**
     * Invalidates specific round.
     *
     * @param {Round} round `Round` instance.
     */

  }, {
    key: 'invalidateRound',
    value: function invalidateRound(round) {
      round.invalidate();
    }

    /**
     * Invalidates specific `throw`.
     *
     * @param {Throw} dartsThrow `Throw` instance.
     */

  }, {
    key: 'invalidateThrow',
    value: function invalidateThrow(dartsThrow) {
      dartsThrow.number = 0;
      dartsThrow.multiplier = 1;
    }

    /**
     * Sets `currentPlayer` to the next one.
     * @returns {Player} Returns player.
     */

  }, {
    key: 'nextPlayer',
    value: function nextPlayer() {
      var data = this._playersIterator.next();

      if (data.done) {
        this._playersIterator = this._players[Symbol.iterator]();
        this.nextRound();
        return this.nextPlayer();
      }

      this._currentPlayer = data.value;
      return this._currentPlayer;
    }

    /**
     * Creates new instance of the `Round` for each player.
     */

  }, {
    key: 'nextRound',
    value: function nextRound() {
      var round = void 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var player = _step.value;

          round = new _round2.default(this._options.round);
          this._playerRounds.get(player).get('rounds').add(round);
          this._playerRounds.get(player).set('currentRound', round);
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

      this._currentRoundNumber++;
    }

    /**
     * Adds a player to the game.
     *
     * @param {Player} player Instance of `Player` class.
     */

  }, {
    key: 'addPlayer',
    value: function addPlayer(player) {
      this._players.add(player);
      this._playerRounds.set(player, new Map().set('rounds', new Set()));
    }

    /**
     * Add multiple players to the game.
     *
     * @param {Player[]} players Array of players.
     */

  }, {
    key: 'addPlayers',
    value: function addPlayers(players) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var player = _step2.value;

          this.addPlayer(player);
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

    /**
     * @returns {Player[]} Array of players.
     */

  }, {
    key: 'roundsByPlayer',


    /**
     * @param {Player} player Instance of the `Player`.
     * @returns {Round[]} Array of rounds.
     */
    value: function roundsByPlayer(player) {
      return Array.from(this._playerRounds.get(player).get('rounds'));
    }

    /**
     * @param {Player} player Instance of the `Player`.
     * @returns {Throw[]} Array of `Throw` instances.
     */

  }, {
    key: 'throwsByPlayer',
    value: function throwsByPlayer(player) {
      return this.roundsByPlayer(player).reduce(function (prev, curr) {
        return prev.concat(Array.from(curr.throws));
      }, []);
    }
  }, {
    key: 'players',
    get: function get() {
      return Array.from(this._players);
    }

    /**
     * @returns {number} Throws per round.
     */

  }, {
    key: 'throwsPerRound',
    get: function get() {
      return this._options.round.throwsPerRound;
    }

    /**
     * @returns {Player} Return `Player`
     */

  }, {
    key: 'currentPlayer',
    get: function get() {
      return this._currentPlayer;
    }

    /**
     * @returns {Round} Return `Round`.
     */

  }, {
    key: 'currentRound',
    get: function get() {
      return this._playerRounds.get(this.currentPlayer).get('currentRound');
    }

    /**
     * @returns {number} Round number.
     */

  }, {
    key: 'currentRoundNumber',
    get: function get() {
      return this._currentRoundNumber;
    }
  }]);

  return DartsBaseGame;
}();

DartsBaseGame.defaultOptions = {
  round: {
    throwsPerRound: 3
  }
};
exports.default = DartsBaseGame;