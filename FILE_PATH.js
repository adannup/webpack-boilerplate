const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js/index.js'),
  template: path.join(__dirname, 'src/index.html'),
  output: path.join(__dirname, 'dist'),
  public: '/'
};
