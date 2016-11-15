var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/main"
  },
  output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "bundle.js",
    publicPath: "/lesson4"
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
      exclude: /(node_modules|bower_components)/,
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