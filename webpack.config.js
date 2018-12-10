'use strict';

const path = require('path');

const MODE = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './client/index.js',
  mode: MODE,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
};
