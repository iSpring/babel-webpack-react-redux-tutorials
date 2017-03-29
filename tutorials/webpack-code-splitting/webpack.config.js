var path = require("path");

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlPlugin = new HtmlWebpackPlugin();

module.exports = {
    //output.filename always must be set because it set entry chunk file name.
    //output.chunkFilename is only used for non-entry chunk and will be ignored for entry chunk.

    /*
    //If entry is a single string, only one chunk file created, must set output.filename. In this case, output.chunkFilename is ignored.
    entry: "./src/page1.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "page1.bundle.js", //=>page1.bundle.js(chunk id: 0, chunk name: main)
        // filename: "[id].[name].bundle.js" //=>0.main.bundle.js(chunk id: 0, chunk name: main)
    },
    */


    /*
    //If entry is an array, still only create one chunk file, must set output.filename. In this case, output.chunkFilename is ignored.
    entry: ["./src/page1.js", "./src/page2.js"],
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "page12.bundle.js"//=>page12.bundle.js(chunk id: 0, chunk name: main)
        // filename: "[id].[name].bundle.js"//=>0.main.bundle.js(chunk id: 0, chunk name: main)
    },*/


    /*
    //If entry is an object, every key/value will create a chunk file. We can use key as [name]. We must set output.filename. In this case, output.chunkFilename is ignored.
    entry: {
        page1: ["./src/page1.js"],
        page2: ["./src/page2.js"]
    },
    output: {
        path: path.join(__dirname, "buildOutput"),
        // filename: "bundle.js"//=>bundle.js, only include page2.js
        filename: "[id].[name].bundle.js"//=>0.page1.bundle.js(chunk id: 0, chunck name: page1)  1.page2.bundle.js(chunck id:1, chunck name:page2)
    },*/


    //If use require.ensure() to split code, we can use chunkFilename to set name for new created normal chunk.
    entry: "./src/page3.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        // filename: "page3.bundle.js"//page3.bundle.js(chunk id: 0, chunck name: main) includes webpack runtime, 1.page3.bundle.js(chunk id: 1, chunk name: cd) doesn't include webpack runtime
        // filename: "[id]-[name].js"//0-main.js(chunk id: 0, chunk name: main) 1.1-cd.js(chunk id: 1, chunk name: cd)
        filename: "page3.bundle.js",
        chunkFilename: "[id].[name].js" //page3.bundle.js(chunk id: 0, chunck name: main) 1.cd.js(chunk id: 1, chunk name: cd)
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },

    plugins: [htmlPlugin]
};