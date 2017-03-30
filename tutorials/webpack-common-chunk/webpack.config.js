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
	// 		// init.js用于存储webpack runtime的代码以及被所有entry都是用的公共模块，本例中init.js = webpack runtime
	// 		name: "init"
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// init.js用于存储webpack runtime的代码以及至少被3个entry都使用的公共模块，即init.js = webpack runtime + utility2.js
	// 		name: "init",
	// 		minChunks: 3
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// init.js用于存储webpack runtime的代码以及至少被2个entry都使用的公共模块，即init.js = webpack runtime + utility2.js + utility3.js
	// 		name: "init",
	// 		minChunks: 2
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		//顺序很重要
	// 		//common.js用于至少被2个entry都使用的公共模块，即common.js = utility2.js + utility3.js
	// 		//init.js用于存储webpack runtime的代码，即init.js = webpack runtime
	// 		names: ["common", "init"],
	// 		minChunks: 2
	// 	})
	// ]

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			//顺序很重要
			//common.js用于至少被2个entry都使用的公共模块，即common.js = utility2.js + utility3.js
			//vendor本身是一个entry，其包含vendor1和vendor2的代码，在此基础上vendor.js还会包含webpack runtime的代码，即vendor.js = webpack runtime + vendor1.js + vendor2.js
			names: ["common", "vendor"],
			minChunks: 2
		})
	]
};