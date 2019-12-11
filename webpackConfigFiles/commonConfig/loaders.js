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
  {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
    resolve: {
      extensions: ['.tsx', '.ts'],
    },
  },
  // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
  },
];
