var path = require("path");
var webpack = require('webpack');

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
    }]
  }
};