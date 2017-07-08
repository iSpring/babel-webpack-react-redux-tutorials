var path = require("path");

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),

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
      loader: 'style!css'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
};