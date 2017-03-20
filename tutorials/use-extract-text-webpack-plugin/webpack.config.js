var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: ExtractTextWebpackPlugin.extract("css!postcss")
        }, {
            test: /\.scss$/,
            loader: ExtractTextWebpackPlugin.extract("css!postcss!sass")
        }, {
            test: /\.less$/,
            loader: ExtractTextWebpackPlugin.extract("css!postcss!less")
        }]
    },

    plugins: [
        new ExtractTextWebpackPlugin("bundle.css")
    ]
};