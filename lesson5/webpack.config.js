var path = require("path");

module.exports = {
  entry: {
    HelloWorld: path.resolve(__dirname, "src/HelloWorld.jsx")
  },
  output: {
    path: path.resolve(__dirname, "buildOutput"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, "src"),
      loader: 'babel'
    }, {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, "src")
      ],
      loader: 'style!css'
    }]
  }
};