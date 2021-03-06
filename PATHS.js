const path = require('path');

const entry = path.join(__dirname, 'src/index.jsx');
const output = path.join(__dirname, 'dist');

module.exports = {
  entry,
  output,
  develop: {
    publicPath: '/',
  },
  production: {
    publicPath: './', // https://github.com/webpack/webpack-dev-middleware/issues/269#issue-301197700
  },
  assets: {
    html: {
      template: path.join(__dirname, 'public/index.html'),
    },
    css: {
      publicPath: path.join(__dirname, '/dist/'), // https://stackoverflow.com/questions/51055490/minicssextractplugin-public-path-not-working
      output: 'assets/css',
    },
    images: {
      output: 'assets/images',
    },
  },
};
