const FILE_PATH = require('./FILE_PATH');
const Utils = require('./Utils');
const webpackStyles = require('./webpack.styles');
const webpackPlugins = require('./webpack.plugins');

class WebpackConfig {
  constructor() {
    this.processENV = process.env.NODE_ENV;
    this.devtool = 'inline-source-map';
    this.entry = {
      dev: ['react-hot-loader/patch', FILE_PATH.entry, 'webpack-hot-middleware/client'],
      prod: [FILE_PATH.entry]
    };
  }

  getEntry() {
    const appConfig = Utils.isProdProcessENV() ? this.entry.prod : this.entry.dev;
    return {
      app: appConfig
    };
  }

  static getOutput() {
    const publicPath = Utils.isProdProcessENV() ? `.${FILE_PATH.public}` : FILE_PATH.public;

    return {
      filename: '[name].bundle.js',
      path: FILE_PATH.output,
      publicPath
    };
  }

  getDevTool() {
    return this.devtool;
  }

  static getModule() {
    const cssConfig = webpackStyles.getStyleConfig();
    return {
      rules: [
        {
          test: /\.scss$/,
          use: cssConfig
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [['env', { modules: false }], 'react'],
                plugins: ['react-hot-loader/babel']
              }
            }
          ]
        }
      ]
    };
  }
}

const webpackConfig = new WebpackConfig();
const webpackModuleConfig = {
  entry: webpackConfig.getEntry(),
  output: webpackConfig.getOutput(),
  module: webpackConfig.getModule(),
  devtool: webpackConfig.getDevTool(),
  plugins: webpackPlugins.getPlugins()
};

module.exports = {
  ...webpackModuleConfig
};
