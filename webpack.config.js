var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'public');

console.log(BUILD_DIR, APP_DIR)

var config = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    APP_DIR + '/js/index.jsx',
  ],
  output: {
    path: __dirname + '/public',
    filename: 'js/build.js',
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.jsx?$/,
        query: {
          presets: [
            'latest',
            'react',
          ],
        },
      },
    ]
  },
  devServer: {
    proxy: {
      '**': 'http://localhost:8000'
    },
  },
};

module.exports = config;