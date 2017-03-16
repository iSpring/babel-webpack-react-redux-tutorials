var path = require("path");

var buildFolder = "buildOutput";

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, buildFolder),
        filename: "bundle.js",
        publicPath: buildFolder + "/"
    },

    module: {
        loaders: [{
            test: /\.(jpg|jpeg|png)$/,
            loader: 'file-loader'
        }]
    }
};

/*
[{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.less$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'style!css!postcss!less'
        }]
*/