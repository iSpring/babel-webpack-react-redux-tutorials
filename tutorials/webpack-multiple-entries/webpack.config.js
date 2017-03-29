var path = require("path");

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlPlugin = new HtmlWebpackPlugin();

module.exports = {
    /*
    //if entry is a single string, only one chunk file created, must set output.filename and output.chunkFilename is ignored
    entry: "./src/page1.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "page1.bundle.js",//=>page1.bundle.js
        // filename: "[name].bundle.js"//=>main.bundle.js
        // filename: "[id].bundle.js"//=>0.bundle.js
    },*/

    /*
    //if entry is an array, still only create one chunk file, must set output.filename and output.chunkFilename is ignored
    entry: ["./src/page1.js", "./src/page2.js"],
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "page12.bundle.js"//=>page12.bundle.js
        // filename: "[name].bundle.js"//=>main.bundle.js
        // filename: "[id].bundle.js"//=>0.bundle.js
    },*/

    entry: {
        page1: ["./src/page1.js"],
        page2: ["./src/page2.js"]
    },
    output: {
        path: path.join(__dirname, "buildOutput"),
        // filename: "bundle.js"//=>bundle.js, only include page2.js
        filename: "[id].[name].bundle.js"//=>0.page1.bundle.js(chunk id:0, chunck name:page1)  1.page2.bundle.js(chunck id:1, chunck name:page2)
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },

    plugins: [htmlPlugin]
};