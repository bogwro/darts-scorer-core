'use strict';

var path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    'dartsScorerCore.min': ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    library: 'dartsScorerCore',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-strict-mode', 'transform-runtime']
        }
      }
    ]
  }
};
