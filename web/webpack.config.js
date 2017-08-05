const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
        loaders: [
            { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new CopyWebpackPlugin([
            { from: 'img', to: 'img' }
        ])
    ],
    devtool: "source-map"
};
