const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const { isProductionENV } = require('../utils/processEnvUtils');
const PATHS = require('../PATHS');
const webpackCommon = require('./webpack.common');

const getBundleAnalyzerPlugin = () =>
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    openAnalyzer: false,
  });

const getMiniCssExtractPlugin = () =>
  new MiniCssExtractPlugin({
    filename: isProductionENV()
      ? `${PATHS.assets.css.output}/[name].[contenthash].css`
      : `${PATHS.assets.css.output}/[name].css`,
    chunkFilename: isProductionENV()
      ? `${PATHS.assets.css.output}/[id].[contenthash].css`
      : '[id].css',
  });

const getForkTsCheckerWebpackPlugin = () =>
  new ForkTsCheckerWebpackPlugin({
    async: false,
    checkSyntacticErrors: true, // This option is useful if you're using ts-loader in happyPackMode with thread-loader.
    useTypescriptIncrementalApi: true,
    memoryLimit: 4096,
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
});
