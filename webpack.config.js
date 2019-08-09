const webpackProdConfig = require('./webpackconfig/webpack.prod.config.js');

const environment = (process.env.NODE_ENV || 'production').trim();
if (environment === 'production') {
  module.exports = webpackProdConfig;
}
