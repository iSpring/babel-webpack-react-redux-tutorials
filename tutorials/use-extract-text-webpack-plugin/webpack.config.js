var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: ExtractTextPlugin.extract("css!postcss")
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: ExtractTextPlugin.extract("css!postcss!sass")
        }, {
            test: /\.less$/,
            exclude: /(node_modules|bower_components)/,
            loader: ExtractTextPlugin.extract("css!postcss!less")
        }]
    },

    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
};