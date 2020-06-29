const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.common');
const PATHS = require('../PATHS');

const getForkTsCheckerWebpackPlugin = () =>
  new ForkTsCheckerWebpackPlugin({
    eslint: {
      enabled: true,
      files: './src/**/*.{ts,tsx,js,jsx}',
    },
  });

const getForkTsCheckerNotifierWebpackPlugin = () =>
  new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false });

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
  devtool: 'cheap-eval-source-map',
  plugins: [
    getForkTsCheckerWebpackPlugin(),
    getForkTsCheckerNotifierWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});
