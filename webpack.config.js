'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './client/index.js',
  mode: MODE,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ]
};
