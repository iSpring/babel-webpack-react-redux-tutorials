var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextWebpackPlugin("bundle.css");

var extractTXT = new ExtractTextWebpackPlugin("bundle.txt");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel"
        }, {
            test: /\.css$/,
            loader: extractCSS.extract("css!postcss")
        }, {
            test: /\.scss$/,
            loader: extractCSS.extract("css!postcss!sass")
        }, {
            test: /\.less$/,
            loader: extractCSS.extract("css!postcss!less")
        }, {
            test: /\.txt$/,
            loader: extractTXT.extract("raw")
        }]
    },

    plugins: [
        extractCSS,
        extractTXT
    ]
};