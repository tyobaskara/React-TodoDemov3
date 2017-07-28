var path = require('path');
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                        minimize: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                        minimize: true
                    }
                }]
            }
        ],
        
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};