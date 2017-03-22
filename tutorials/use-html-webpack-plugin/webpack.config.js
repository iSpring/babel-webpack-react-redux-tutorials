var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var extractPlugin = new ExtractTextWebpackPlugin("bundle.css");

var HtmlWebpackPlugin = require('html-webpack-plugin');

// var htmlPlugin = new HtmlWebpackPlugin();

// var htmlPlugin = new HtmlWebpackPlugin({
//     title: 'Use HtmlWebpackPlugin',
//     filename: 'index.html',
//     favicon: './images/logo.png',
//     inject: 'body', //true | 'head' | 'body' | false
//     hash: true
// });

var htmlPlugin = new HtmlWebpackPlugin({
    template: '!!ejs!./template.html',
    description: 'Use HtmlWebpackPlugin',
    bootstrap: 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    jQuery: 'http://code.jquery.com/jquery-1.12.4.min.js'
});

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
            loader: extractPlugin.extract('css')
        }]
    },
    plugins: [
        extractPlugin,
        htmlPlugin
    ]
};