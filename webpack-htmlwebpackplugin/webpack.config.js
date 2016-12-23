var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/main"
  },
  output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style!css'
    }]
  },
  plugins: [
    // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
      title: 'Use HtmlWebpackPlugin',
      filename: '../main.html'
    })
  ]
};