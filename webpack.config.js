const webpackProd = require('./webpack/webpack.prod');

const environment = (process.env.NODE_ENV || 'production').trim();
if (environment === 'production') {
  module.exports = webpackProd;
}
