const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FILE_PATH = require('./FILE_PATH');
const Utils = require('./Utils');

class WebpackPlugins {
  constructor() {
    this.projectName = Utils.getProjectName();
  }

  getHtmlWebpackPluginConfig() {
    return new HtmlWebpackPlugin({
      template: FILE_PATH.template,
      title: this.projectName,
      filename: 'index.html',
      minify: {
        collapseWhitespace: Utils.isProdProcessENV()
      },
      hash: true
    });
  }

  getMiniCssExtractPlugiConfig() {
    return new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: Utils.isProdProcessENV() ? `${FILE_PATH.css.out}/[name].css` : '[name].[hash].css',
      chunkFilename: Utils.isProdProcessENV() ? '[id].css' : '[id].[hash].css'
    });
  }

  getCleanWebpackPluginConfig() {
    return new CleanWebpackPlugin(['dist']);
  }

  getHotModuleReplacement() {
    return new webpack.HotModuleReplacementPlugin();
  }

  getProdPlugins() {
    return [this.getCleanWebpackPluginConfig(), this.getMiniCssExtractPlugiConfig()];
  }

  getDevPlugins() {
    // return [this.HotModuleReplacement(), OpenBrowserPluginConfig];
    return [this.getHotModuleReplacement()];
  }

  getPlugins() {
    const pluginsConfig = Utils.isProdProcessENV() ? this.getProdPlugins() : this.getDevPlugins();
    return [this.getHtmlWebpackPluginConfig(), ...pluginsConfig];
  }
}

module.exports = new WebpackPlugins();
