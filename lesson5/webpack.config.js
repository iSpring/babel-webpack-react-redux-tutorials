var path = require("path");

module.exports = {
  entry: {
    HelloWorld: path.resolve(__dirname, "src/HelloWorld.js")
  },
  output: {
    path: path.resolve(__dirname, "buildOutput"),
    filename: "[name].bundle.js"
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
  }
};