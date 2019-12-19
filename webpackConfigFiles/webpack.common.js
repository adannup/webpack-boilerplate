const { isProductionENV } = require('../utils/processEnvUtils');
const PATHS = require('../PATHS');
const loaders = require('./commonConfig/loaders');
const plugins = require('./commonConfig/plugins');

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
