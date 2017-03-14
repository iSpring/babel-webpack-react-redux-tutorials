var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
        path: path.resolve(__dirname, "buildOutput"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // include: [
            //     path.resolve(__dirname, "src"),
            //     path.resolve(__dirname, "node_modules/MyShape")
            // ],
            // exclude: [
            //     path.resolve(__dirname, "node_modules/MyShape/index.js")
            // ],
            loader: 'babel'
        }]
    }
};