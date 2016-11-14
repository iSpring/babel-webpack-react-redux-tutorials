var path = require("path");

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
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
      // query: {
      //   presets: ['es2015']
      // }
    }, {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style!css'//必须先经过css-loader处理，然后经过style-loader处理
    }]
  }
};