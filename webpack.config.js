const path = require('path');
const webpack = require('webpack');
const GlobEntries = require('webpack-glob-entries');

module.exports = {
    mode: 'production',
    entry: GlobEntries('./ts-dist/**/test/*.js'),
    output: {
        path: path.resolve(__dirname, 'dist'), // eslint-disable-line
        libraryTarget: 'commonjs',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader' }],
    },
    target: 'web',
    externals: [
        /k6(\/.*)?/,
    ],
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /ovartem-petstore-api\/dist\/utils\/getEnv\.js/,
            require.resolve('./ts-dist/utils/getEnv')
        ),
        new webpack.NormalModuleReplacementPlugin(
            /ovartem-petstore-api\/dist\/BaseConfig\.js/,
            require.resolve('./ts-dist/BaseConfig')
        ),
    ],
    resolve: {
        fallback: {
        }
    },
    optimization: {
        // Don't minimize, as it's not used in the browser
        minimize: false,
    }
};
