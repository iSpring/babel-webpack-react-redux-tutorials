var path = require("path");

var webpack = require("webpack");

module.exports = {
	entry: {
		pageA: "./pageA",//a-b-c + a-b + a-c
		pageB: "./pageB",//a-b-c + a-b + b-c
		pageC: "./pageC",//a-b-c + a-c + b-c
		adminPageA: "./adminPageA",//a-b-c + admin
		adminPageB: "./adminPageB",//a-b-c + admin
		adminPageC: "./adminPageC",//a-b-c + admin
	},

	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	},

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
	// 	new webpack.optimize.CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
	// 	new webpack.optimize.CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
	// ]

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "admin-commons",
			chunks: ["adminPageA", "adminPageB"]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			chunks: ["pageA", "pageB", "admin-commons"],
			minChunks: 2
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "c-commons",
			chunks: ["pageC", "adminPageC"]
		})
	]
};