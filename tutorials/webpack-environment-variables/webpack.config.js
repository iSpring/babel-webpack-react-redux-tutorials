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

  plugins: []
};

console.log(process.env.NODE_ENV);


// if(process.env.NODE_ENV === 'production'){
//   console.log("production environment");
// }else{
//   console.log("development environment");
// }

// new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // })

    // new webpack.EnvironmentPlugin(['NODE_ENV'])

    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development'
    // })

// if(process.env.NODE_ENV === 'production'){
//     module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
// }