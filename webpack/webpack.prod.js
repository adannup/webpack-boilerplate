const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const PATHS = require('../PATHS');
const { isProductionENV } = require('../utils/enviroment');
const webpackCommon = require('./webpack.common');

const getBundleAnalyzerPlugin = () => new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'report.html',
  openAnalyzer: false,
});

const getMiniCssExtractPlugin = () => new MiniCssExtractPlugin({
  filename: isProductionENV()
    ? `${PATHS.assets.css.output}/[name].[contenthash].css`
    : `${PATHS.assets.css.output}/[name].css`,
  chunkFilename: isProductionENV()
    ? `${PATHS.assets.css.output}/[id].[contenthash].css`
    : '[id].css',
});

const getForkTsCheckerWebpackPlugin = () => new ForkTsCheckerWebpackPlugin({
  async: false,
});

module.exports = merge(webpackCommon, {
  mode: 'production',
  entry: {
    app: [PATHS.entry],
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
  plugins: [getForkTsCheckerWebpackPlugin(), getMiniCssExtractPlugin(), getBundleAnalyzerPlugin()],
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    moduleIds: 'hashed',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss|less)$/,
          chunks: 'all',
        },
      },
    },
  },
});
