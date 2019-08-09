const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const { loaders } = require('./commonLoaders');
const { plugins } = require('./commonPlugins');
const PATHS = require('../PATHS');

module.exports = {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', PATHS.develop.entry, 'webpack-hot-middleware/client']
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.develop.output,
    publicPath: PATHS.develop.public
  },
  module: {
    rules: [
      ...loaders,
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [...plugins, new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};
