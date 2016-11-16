var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/HelloWorld.jsx"),
  output: {
    path: path.resolve(__dirname, "buildOutput"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: __dirname,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [ "es2015", "react", "react-hmre" ]
      }
    }]
  }
};