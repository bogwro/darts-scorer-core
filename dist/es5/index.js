'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _ = require('./games/501');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Player: _player2.default,
  games: {
    Darts501Game: _2.default
  }
};