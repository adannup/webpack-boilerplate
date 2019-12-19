const TerserPlugin = require('terser-webpack-plugin');

const { isProductionENV } = require('../utils/processEnvUtils');
const PATHS = require('../PATHS');
const loaders = require('./commonConfig/loaders');
const plugins = require('./commonConfig/plugins');

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    filename: isProductionENV() ? '[name].bundle.[chunkhash].js' : '[name].bundle.[hash].js',
    path: PATHS.output,
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
    moduleIds: 'hashed',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss|less)$/,
          chunks: 'all',
        },
      },
    },
  },
};
