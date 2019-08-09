const PATHS = require('../PATHS');

const loaders = [
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: PATHS.assets.images.output
        }
      }
    ]
  },
  {
    test: /\.(js|jsx)$/,
    resolve: {
      extensions: ['.js', '.jsx']
    },
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
          plugins: ['react-hot-loader/babel']
        }
      }
    ]
  }
];

module.exports = { loaders };
