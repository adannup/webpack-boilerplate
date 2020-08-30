const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const PATHS = require('../PATHS');
const webpackCommon = require('./webpack.common');

const getBundleAnalyzerPlugin = () =>
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    openAnalyzer: true,
  });

const getMiniCssExtractPlugin = () =>
  new MiniCssExtractPlugin({
    // Long Term Caching
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#long-term-caching
    filename: `${PATHS.assets.css.output}/[name].[contenthash].css`,
    chunkFilename: `${PATHS.assets.css.output}/[id].[contenthash].css`,
  });

const getForkTsCheckerWebpackPlugin = () =>
  new ForkTsCheckerWebpackPlugin({
    async: false,
  });

const getPlugins = () =>
  process.env.REPORT === 'analyze'
    ? [getForkTsCheckerWebpackPlugin(), getMiniCssExtractPlugin(), getBundleAnalyzerPlugin()]
    : [getForkTsCheckerWebpackPlugin(), getMiniCssExtractPlugin()];

module.exports = merge(webpackCommon, {
  mode: 'production',
  entry: {
    main: [PATHS.entry],
  },
  output: {
    publicPath: PATHS.production.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: PATHS.assets.css.publicPath,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: getPlugins(),
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    // Module Identifiers
    // https://webpack.js.org/guides/caching/#module-identifiers
    moduleIds: 'hashed',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    // SplitChunksPlugin - Default Configuration
    // https://webpack.js.org/plugins/split-chunks-plugin/#defaults
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // Extracting Boilerplate
          // https://webpack.js.org/guides/caching/#extracting-boilerplate
          // Example 2 of SplitChunksPlugin
          // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
          name: 'vendor',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
