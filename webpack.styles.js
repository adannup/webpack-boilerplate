const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Utils = require('./Utils');

class WebpackStyles {
  constructor() {
    this.css = {
      dev: ['style-loader', 'css-loader', 'sass-loader'],
      prod: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    };
  }

  getStyleConfig() {
    return Utils.isProdProcessENV() ? this.css.prod : this.css.dev;
  }
}

const webpackStyles = new WebpackStyles();
module.exports = webpackStyles;
