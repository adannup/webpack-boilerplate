const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = require('../../PATHS');
const { getProjectName, isProductionENV } = require('../../utils/processEnvUtils');

const getHtmlWebpackPluginConfig = () =>
  new HtmlWebpackPlugin({
    template: PATHS.assets.html.template,
    title: getProjectName(),
    filename: 'index.html',
    minify: {
      collapseWhitespace: isProductionENV(),
    },
    hash: true,
  });

const getCleanWebpackPluginConfig = () => new CleanWebpackPlugin({ verbose: true });

const getBundleAnalyzerPlugin = () =>
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    openAnalyzer: false,
  });

module.exports = [
  getHtmlWebpackPluginConfig(),
  getCleanWebpackPluginConfig(),
  getBundleAnalyzerPlugin(),
];
