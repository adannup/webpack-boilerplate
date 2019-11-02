const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { loaders } = require('./commonLoaders');
const { plugins } = require('./commonPlugins');
const PATHS = require('../PATHS');

module.exports = {
  mode: 'production',
  entry: {
    app: [PATHS.production.entry],
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.production.output,
    publicPath: PATHS.production.publicPath,
  },
  module: {
    rules: [
      ...loaders,
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: PATHS.assets.css.publicPath,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets.css.output}/[name].css`,
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
