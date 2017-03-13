var path = require("path");

module.exports = {
    entry: {
        main: "./index.js"
    },
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
    }
};