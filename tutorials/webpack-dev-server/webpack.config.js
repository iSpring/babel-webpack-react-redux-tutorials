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
    // new webpack.HotModuleReplacementPlugin()
  ]

  //webpack-dev-server --content-base buildOutput --port=3344 --colors --inline --hot --open
  // devServer: {
  //   contentBase: './buildOutput',
  //   port: '3344',
  //   stats: {
  //     colors: true
  //   },
  //   inline: true,
  //   hot: true,
  //   open: true
  // }
};