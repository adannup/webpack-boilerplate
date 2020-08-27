const { loaders, plugins } = require("./common");

const PATHS = require('../PATHS');

module.exports = {
    output: {
        filename: '[name].bundle.js',
        path: PATHS.output, 
    },
    module: {
        rules: loaders
    },
    plugins,
}