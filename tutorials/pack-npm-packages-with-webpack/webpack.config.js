var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/main.js")
  },
  output: {
    path: path.resolve(__dirname, "buildOutput"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules/MyShape")
      ],
      exclude: [
        path.resolve(__dirname, "node_modules/MyShape/index.js")
      ],
      loader: 'babel'
    }, {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, "src")
      ],
      loader: 'style!css'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack',
      filename: 'index.html'
    })
  ]
};