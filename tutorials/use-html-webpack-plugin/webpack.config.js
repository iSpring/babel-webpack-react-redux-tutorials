var path = require("path");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",

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
            loader: 'css'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin()

        // new HtmlWebpackPlugin({
        //     title: 'Use HtmlWebpackPlugin',
        //     filename: 'index.html',
        //     favicon: './images/logo.png',
        //     inject: 'body',
        //     hash: true
        // })

        // new HtmlWebpackPlugin({
        //   template: '!!ejs!./template.html',
        //   description: 'Use HtmlWebpackPlugin',
        //   bootstrap: 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        //   jQuery: 'http://code.jquery.com/jquery-1.12.4.min.js'
        // })
    ]
};