var path = require("path");

var webpack = require('webpack');

module.exports = {
    // entry: "./src/index.js",
    // output: {
    //     path: path.join(__dirname, "buildOutput"),
    //     filename: "bundle.js"
    // },

    entry: ["./src/a.js", "./src/b.js"],
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },
};