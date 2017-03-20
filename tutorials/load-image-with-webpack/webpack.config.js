// var path = require("path");

// var buildFolder = "buildOutput";

// module.exports = {
//     entry: "./index.js",

//     output: {
//         path: path.join(__dirname, buildFolder),
//         filename: "bundle.js",
//         publicPath: buildFolder + "/"
//     },

//     module: {
//         loaders: [{
//             test: /\.js$/,
//             loader: 'babel-loader'
//         }, {
//             test: /\.(jpg|jpeg|png|svg)$/,
//             loader: 'file-loader'
//         }, {
//             test: /\.css$/,
//             loader: 'style!css'
//         }]
//     }
// };

var path = require("path");

var buildFolder = "buildOutput";

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, buildFolder),
        filename: "bundle.js",
        publicPath: buildFolder + "/"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|jpeg|png|svg)$/,
            loader: 'url-loader', //url-loader?limit=10000
            query: {
                limit: 10 * 1024 //10KB
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};