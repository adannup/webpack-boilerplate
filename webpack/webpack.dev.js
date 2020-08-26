const webpack = require('webpack');

const loaders = require('./common/loaders');
const plugins = require('./common/plugins');
const PATHS = require('../PATHS');

module.exports = {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', PATHS.develop.entry, 'webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.develop.output,
    publicPath: PATHS.develop.public,
  },
  module: {
    rules: [
      ...loaders,
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [...plugins, new webpack.HotModuleReplacementPlugin()]
};
