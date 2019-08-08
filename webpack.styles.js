const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FILE_PATH = require('./FILE_PATH');
const Utils = require('./Utils');

class WebpackStyles {
  constructor() {
    this.css = {
      dev: ['style-loader', 'css-loader', 'sass-loader'],
      prod: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: FILE_PATH.css.publicPath
          }
        },
        'css-loader',
        'sass-loader'
      ]
    };
  }

  getStyleConfig() {
    return Utils.isProdProcessENV() ? this.css.prod : this.css.dev;
  }
}

const webpackStyles = new WebpackStyles();
module.exports = webpackStyles;
