const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
