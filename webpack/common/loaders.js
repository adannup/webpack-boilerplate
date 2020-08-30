const os = require('os');

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
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          // https://medium.com/webpack/typescript-webpack-super-pursuit-mode-83cc568dea79
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: os.cpus().length - 1,
          poolTimeout: isProductionENV() ? 2000 : Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
        },
      },
      {
        loader: 'ts-loader',
        options: {
          // IMPORTANT! use happyPackMode mode to speed-up compilation
          // This implicitly sets *transpileOnly* to true
          // and WARNING! stops registering all errors to webpack.
          // https://github.com/TypeStrong/ts-loader#happypackmode
          happyPackMode: true,
        },
      },
    ],
    resolve: {
      extensions: ['.tsx', '.ts'],
    },
  },
];
