const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.common');
const PATHS = require('../PATHS');

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
