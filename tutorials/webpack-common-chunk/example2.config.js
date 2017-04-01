var path = require("path");

var webpack = require("webpack");

module.exports = {
	entry: {
		pageA: "./src/pageA",
		pageB: "./src/pageB"
	},

	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	},

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		//本例中init.js = webpack runtime + polyfill + utility2
	// 		name: "init"
	// 	})
	// ]

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			//本例中init.js = webpack runtime
			name: "init",
			minChunks: Infinity
		})
	]
};