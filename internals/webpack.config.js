/* @flow */

const path = require('path');

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'react', 'stage-0', {
            plugins: [
              './build/babelRelayPlugin',
            ],
          }],
          plugins: ['transform-flow-strip-types'],
        },
      },
    ],
  },
};
