/* @flow */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    app: [path.resolve(__dirname, 'app', 'app.js')],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: process.env.NODE_ENV === 'production' ?
          ExtractTextPlugin.extract({
            loader: 'css-loader',
            options: {
              minimize: true || { safe: true },
            },
          })
          : ['style-loader', 'css-loader?sourceMap'],
      },
    ],
  },
  plugins: [],
  resolve: {
    modules: [
      'app',
      'server',
      'node_modules',
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ExtractTextPlugin('styles.css'));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
