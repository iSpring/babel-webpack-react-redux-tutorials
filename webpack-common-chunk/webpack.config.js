var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		vendor: ["./vendor1", "./vendor2"],
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	},
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 顺序很重要，最后一个用于存储webpack runtime的代码
	// 		names: ["webpack-runtime"]
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 顺序很重要，最后一个用于存储webpack runtime的代码
	// 		names: ["webpack-runtime"],
	// 		minChunks: 3
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 顺序很重要，最后一个用于存储webpack runtime的代码
	// 		names: ["webpack-runtime"],
	// 		minChunks: 2
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 顺序很重要，webpack-runtime.js用于存储webpack runtime的代码，common.js用于存储其他公共模块
	// 		names: ["common", "webpack-runtime"],
	// 		minChunks: 2
	// 	})
	// ]
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			// 顺序很重要，vendor.js用于存储webpack runtime的代码，common.js用于存储其他公共模块
			names: ["common", "vendor"],
			minChunks: 2
		})
	]
};