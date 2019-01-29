const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FILE_PATH = require('./FILE_PATH');
const Utils = require('./Utils');

class WebpackPlugins {
  constructor() {
    this.projectTitle = 'webpack-boilerplate';
  }

  getHtmlWebpackPluginConfig() {
    return new HtmlWebpackPlugin({
      template: FILE_PATH.template,
      title: this.projectTitle,
      filename: 'index.html',
      minify: {
        collapseWhitespace: Utils.isProdProcessENV()
      },
      hash: true
    });
  }

  getExtractTextPluginConfig() {
    return new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
      disable: false
    });
  }

  getCleanWebpackPluginConfig() {
    return new CleanWebpackPlugin(['dist']);
  }

  getHotModuleReplacement() {
    return new webpack.HotModuleReplacementPlugin();
  }

  getProdPlugins() {
    return [this.getCleanWebpackPluginConfig(), this.getExtractTextPluginConfig()];
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
// const OpenBrowserPluginConfig = new OpenBrowserPlugin({ url: 'http://localhost:3000' });

module.exports = new WebpackPlugins();
