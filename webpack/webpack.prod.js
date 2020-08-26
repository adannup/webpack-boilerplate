const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const loaders = require('./common/loaders');
const plugins = require('./common/plugins');
const PATHS = require('../PATHS');

module.exports = {
  mode: 'production',
  entry: {
    app: [PATHS.production.entry],
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.production.output,
    publicPath: PATHS.production.publicPath,
  },
  module: {
    rules: [
      ...loaders,
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
  devtool: 'inline-source-map',
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets.css.output}/[name].css`,
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
