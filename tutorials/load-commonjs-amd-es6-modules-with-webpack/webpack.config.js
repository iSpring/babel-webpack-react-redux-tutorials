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
        }]
    }
};