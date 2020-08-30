const { merge } = require('webpack-merge');
const webpack = require('webpack');

const PATHS = require('../PATHS');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', PATHS.entry, 'webpack-hot-middleware/client'],
  },
  output: {
    publicPath: PATHS.develop.publicPath,
    // Output Without Path Info
    // https://webpack.js.org/guides/build-performance/#output-without-path-info
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // Devtool
  // https://webpack.js.org/guides/build-performance/#devtool
  devtool: 'eval-cheap-module-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // Avoid Extra Optimization Steps
  // https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});
