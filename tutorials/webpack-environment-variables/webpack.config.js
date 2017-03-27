var path = require("path");

var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development")
    // })

    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};


if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}