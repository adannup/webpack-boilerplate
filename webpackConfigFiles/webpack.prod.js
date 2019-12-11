const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.common');
const PATHS = require('../PATHS');

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
      filename: `${PATHS.assets.css.output}/[name].css`,
      chunkFilename: '[id].css',
    }),
  ],
});
