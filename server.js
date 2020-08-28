const express = require('express');
const opn = require('opn');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack/webpack.dev');

const app = express();
const compiler = webpack(config);
const PORT = process.env.NODE_PORT || 3000;
const openURI = `http://localhost:${PORT}/`;

app.use(
  webpackDevMiddleware(compiler, {
    logLevel: 'error',
    stats: { colors: true },
    publicPath: config.output.publicPath,
  }),
);

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, () => {
  opn(openURI);
  // eslint-disable-next-line no-console
  console.log(`Server up on port: ${PORT}`);
});
