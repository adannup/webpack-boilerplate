const { loaders, plugins } = require('./common');
const PATHS = require('../PATHS');
const { isProductionENV } = require('../utils/enviroment');

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    filename: isProductionENV() ? '[name].[chunkhash].js' : '[name].[hash].js',
    path: PATHS.output,
  },
  module: {
    rules: loaders,
  },
  plugins,
};
