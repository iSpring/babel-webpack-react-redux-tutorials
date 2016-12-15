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
	// 		// 用于存储webpack runtime的代码
	// 		name: "webpack-runtime"
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 用于存储webpack runtime的代码以及至少被3个entry都使用的公共模块
	// 		name: "webpack-runtime",
	// 		minChunks: 3
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 用于存储webpack runtime的代码以及至少被2个entry都使用的公共模块
	// 		name: "webpack-runtime",
	// 		minChunks: 2
	// 	})
	// ]
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		//顺序很重要
	// 		//common.js用于至少被2个entry都使用的公共模块
	// 		//webpack-runtime.js用于存储webpack runtime的代码
	// 		names: ["common", "webpack-runtime"],
	// 		minChunks: 2
	// 	})
	// ]
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			//顺序很重要
			//common.js用于至少被2个entry都使用的公共模块
			//vendor本身是一个entry，其包含vendor1和vendor2的代码，在此基础上vendor.js还会包含webpack runtime的代码
			names: ["common", "vendor"],
			minChunks: 2
		})
	]
};