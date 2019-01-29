const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FILE_PATH = require('./FILE_PATH');
const Utils = require('./Utils');

class WebpackStyles {
  constructor() {
    this.css = {
      dev: ['style-loader', 'css-loader', 'sass-loader'],
      prod: ['css-loader', 'sass-loader']
    };
  }

  pluginExtractText() {
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: this.css.prod,
      publicPath: FILE_PATH.public
    });
  }

  getStyleConfig() {
    return Utils.isProdProcessENV() ? this.pluginExtractText() : this.css.dev;
  }
}

const webpackStyles = new WebpackStyles();
module.exports = webpackStyles;
