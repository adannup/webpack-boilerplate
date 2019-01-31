const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  template: path.join(__dirname, 'public/index.html'),
  output: path.join(__dirname, 'dist'),
  public: '/'
};
