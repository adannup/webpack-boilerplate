const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = require('../../PATHS');
const { getProjectName, isProductionENV } = require('../../utils/enviroment');

const getHtmlWebpackPluginConfig = () => new HtmlWebpackPlugin({
  template: PATHS.assets.html.template,
  title: getProjectName(),
  filename: 'index.html',
  minify: {
    collapseWhitespace: isProductionENV(),
  },
  hash: true,
});

const getCleanWebpackPluginConfig = () => new CleanWebpackPlugin({ verbose: true });

module.exports = [getHtmlWebpackPluginConfig(), getCleanWebpackPluginConfig()];
