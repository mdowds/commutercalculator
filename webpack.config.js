const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = env => {
    return {
        entry: './client/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    include: [ path.resolve(__dirname, 'client') ],
                    use: { loader: 'awesome-typescript-loader' }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    include: [ path.resolve(__dirname, 'client') ],
                    loader: "source-map-loader"
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        },
        plugins: [
            HtmlWebpackPluginConfig,
            new CopyWebpackPlugin([
                { from: 'img', to: 'img' }
            ]),
            new webpack.EnvironmentPlugin({
                GMAPS_API_KEY: null,
                CCAPI_URL: "http://127.0.0.1:5000"
            })
        ],
        devtool: "source-map"
    }
};
