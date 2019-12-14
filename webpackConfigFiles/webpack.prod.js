const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const { isProductionENV } = require('../utils/processEnvUtils');
const PATHS = require('../PATHS');
const webpackCommon = require('./webpack.common');

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
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionENV()
        ? `${PATHS.assets.css.output}/[name].[contenthash].css`
        : `${PATHS.assets.css.output}/[name].css`,
      chunkFilename: isProductionENV()
        ? `${PATHS.assets.css.output}/[id].[contenthash].css`
        : '[id].css',
    }),
  ],
});
