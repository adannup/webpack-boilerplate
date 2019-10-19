const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { loaders } = require('./commonLoaders');
const { plugins } = require('./commonPlugins');
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
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets.css.output}/[name].css`,
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};
