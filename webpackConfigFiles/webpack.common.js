const TerserPlugin = require('terser-webpack-plugin');

const loaders = require('./commonConfig/loaders');
const plugins = require('./commonConfig/plugins');
const PATHS = require('../PATHS');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: PATHS.output,
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
