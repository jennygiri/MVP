const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|mp3|wav)$/i,
        use: 'file-loader',
      },
      //{
      //  test: /\.(mp3|wav)$/,
      //  loader: 'file-loader',
      //},
    ],
  },
  mode: 'development',
};

module.exports = config;
