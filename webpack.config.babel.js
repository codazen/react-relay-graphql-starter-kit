/* @flow */

import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

export default (env: any = {}) => {
  const isProduction = env.production;

  const clientConfig = {
    entry: {
      app: ['babel-polyfill', './app/app.js'],
    },
    target: 'web',
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
          use: isProduction ?
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
    plugins: isProduction ? [
      new ExtractTextPlugin('styles.css'),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true })]
      : [],
    devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
    resolve: {
      modules: [
        'app',
        'server',
        'node_modules',
      ],
    },
    devServer: {
      historyApiFallback: true,
      quiet: true,
    },
  };

  const serverConfig = {
    entry: {
      server: ['babel-polyfill', './server/index.js'],
    },
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    ],
    devtool: 'cheap-module-source-map',
    resolve: {
      modules: [
        'app',
        'server',
        'node_modules',
      ],
    },
  };

  return isProduction ? [serverConfig, clientConfig] : clientConfig;
};
