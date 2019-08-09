const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('../PATHS');
const { getProjectName, isProductionENV } = require('../utils/processEnvUtils');

const getHtmlWebpackPluginConfig = () => {
  return new HtmlWebpackPlugin({
    template: PATHS.assets.html.template,
    title: getProjectName(),
    filename: 'index.html',
    minify: {
      collapseWhitespace: isProductionENV()
    },
    hash: true
  });
};

const getCleanWebpackPluginConfig = () => {
  return new CleanWebpackPlugin({ verbose: true });
};

const plugins = [getHtmlWebpackPluginConfig(), getCleanWebpackPluginConfig()];

module.exports = {
  plugins
};
