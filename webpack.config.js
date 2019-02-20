const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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

  getOutput() {
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

  getModule() {
    const cssConfig = webpackStyles.getStyleConfig();
    return {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.scss$/,
          use: cssConfig
        },
        {
          test: /\.(js|jsx)$/,
          resolve: {
            extensions: ['.js', '.jsx']
          },
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
                plugins: ['react-hot-loader/babel']
              }
            }
          ]
        }
      ]
    };
  }

  getOptimization() {
    return {
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
    };
  }

  getMode() {
    return Utils.isProdProcessENV() ? 'production' : 'development';
  }
}

const webpackConfig = new WebpackConfig();
const webpackModuleConfig = {
  entry: webpackConfig.getEntry(),
  output: webpackConfig.getOutput(),
  module: webpackConfig.getModule(),
  devtool: webpackConfig.getDevTool(),
  plugins: webpackPlugins.getPlugins(),
  optimization: webpackConfig.getOptimization(),
  mode: webpackConfig.getMode()
};

module.exports = {
  ...webpackModuleConfig
};
