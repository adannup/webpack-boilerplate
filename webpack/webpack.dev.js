const { merge } = require('webpack-merge');
const webpack = require('webpack');

const PATHS = require('../PATHS');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', PATHS.entry, 'webpack-hot-middleware/client'],
  },
  output: {
    publicPath: PATHS.develop.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
