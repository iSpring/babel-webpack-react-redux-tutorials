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
    new webpack.DefinePlugin({
      //对于string值，要使用JSON.stringify()
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development"),
      //对于boolean值和number值，不要使用JSON.stringify()
      '__DEV__': process.env.DEBUG
    })

    // new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};


if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}