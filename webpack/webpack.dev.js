const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const webpackCommon = require('./webpack.common');
const PATHS = require('../PATHS');

const getForkTsCheckerWebpackPlugin = () =>
  // TypeScript Loader
  // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
  // https://webpack.js.org/guides/build-performance/#typescript-loader
  // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme
  new ForkTsCheckerWebpackPlugin({
    // ESLint options
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint-options
    eslint: {
      // files: required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      files: './src/**/*.{ts,tsx,js,jsx}',
    },
    // IMPORTANT: If you are using fork-ts-checker-webpack-plugin alongside HappyPack or thread-loader
    // then ensure you set the syntactic diagnostic option like so:
    // https://github.com/TypeStrong/ts-loader#happypackmode
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
    },
  });

const getForkTsCheckerNotifierWebpackPlugin = () =>
  // https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin#readme
  // This is a webpack plugin that uses the node-notifier package to display build status
  // notifications to the user. It's purpose is to work with the fork-ts-checker-webpack-plugin.
  new ForkTsCheckerNotifierWebpackPlugin({
    title: 'TypeScript',
    excludeWarnings: false,
  });

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
  plugins: [
    getForkTsCheckerWebpackPlugin(),
    getForkTsCheckerNotifierWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Avoid Extra Optimization Steps
  // https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});
