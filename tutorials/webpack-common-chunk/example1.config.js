var path = require("path");

var webpack = require("webpack");

module.exports = {
	entry: {
		utility1: "./src/utility1",
		utility2: "./src/utility2",
		utility3: "./src/utility3"
	},

	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			// init.js用于存储webpack runtime的代码以及被所有entry都是用的公共模块，本例中init.js = webpack runtime
			name: "init"
		})
	]
};