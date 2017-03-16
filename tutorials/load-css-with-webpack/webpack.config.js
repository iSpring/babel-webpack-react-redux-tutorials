var path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },


    // entry: ["./a.css","./b.scss","./c.less","./d.css"],
    // output: {
    //     path: path.join(__dirname, "buildOutput"),
    //     filename: "bundle.js"
    // },


    // entry: {
    //     js: "./index.js",
    //     css: ["./css/a.css", "./css/b.scss", "./css/c.less", "./css/d.css"]
    // },

    // output: {
    //     path: path.join(__dirname, "buildOutput"),
    //     filename: "[name].bundle.js"
    // },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
        }]
    }
};