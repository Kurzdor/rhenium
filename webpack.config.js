'use strict';

let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: process.env.NODE_ENV === 'production' ? 'production': 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    library: 'Rhenium',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist/'),
    filename: 'rhenium.js'
  }
};