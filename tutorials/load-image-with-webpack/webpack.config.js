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
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|jpeg|png)$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};