var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "index.js"),
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "[name].js"
    },

    plugins: [
        new HtmlWebpackPlugin()
    ]
};