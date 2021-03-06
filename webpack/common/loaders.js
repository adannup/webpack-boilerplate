const PATHS = require('../../PATHS');

module.exports = [
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: PATHS.assets.images.output,
        },
      },
    ],
  },
  {
    test: /\.(js|jsx)$/,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    exclude: /node_modules/,
    use: 'babel-loader?cacheDirectory=true',
  },
];
