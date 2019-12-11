const webpackProdConfig = require('./webpackConfigFiles/webpack.prod');

const environment = (process.env.NODE_ENV || 'production').trim();
if (environment === 'production') {
  module.exports = webpackProdConfig;
}
