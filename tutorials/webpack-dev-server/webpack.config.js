var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
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
  // --content-base buildOutput --port=3344 --colors --inline --hot --open
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