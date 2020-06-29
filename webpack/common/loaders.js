const PATHS = require('../../PATHS');
const { isProductionENV } = require('../../utils/enviroment');

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
    use: [
      {
        loader: 'thread-loader',
        options: {
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: require('os').cpus().length - 1,
          poolTimeout: isProductionENV() ? 2000 : Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
        },
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
        },
      },
    ],
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
