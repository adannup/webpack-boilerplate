const { isProductionENV } = require('../utils/enviroment');
const PATHS = require('../PATHS');
const loaders = require('./common/loaders');
const plugins = require('./common/plugins');

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    filename: isProductionENV() ? '[name].bundle.[chunkhash].js' : '[name].bundle.[hash].js',
    path: PATHS.output,
    pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
  },
  module: {
    rules: loaders,
  },
  plugins,
};
