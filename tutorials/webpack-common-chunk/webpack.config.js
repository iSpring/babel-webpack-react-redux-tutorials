var path = require("path");

var webpack = require("webpack");

//vendor1
//vendor2
//utility1
//utility2
//utility3
//pageA = polyfill + jQuery + underscore + utility1 + utility2
//pageB = polyfill + jQuery + underscore + utility2 + utility3
//pageC = polyfill + jQuery + underscore + utility2 + utility3

module.exports = {
	entry: {
		vendor: ["./src/polyfill", "./src/jQuery", "./src/underscore"],
		pageA: "./src/pageA",
		pageB: "./src/pageB",
		pageC: "./src/pageC"
	},

	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	},

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// 在不使用CommonsChunkPlugin插件时，会生成四个entry chunk文件，pageA.js、pageB.js、pageC.js和vendor.js，这四个文件中都包含webpack runtime和polyfill，
	// 		// 所以CommonsChunkPlugin插件会将这四个文件中的webpack runtime和polyfill提取出来，放到init.js中
	// 		// init.js用于存储webpack runtime的代码以及被所有entry都是用的公共模块，本例中init.js = webpack runtime + polyfill
	// 		name: "init"
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		// init.js用于存储webpack runtime的代码以及至少被3个entry都使用的公共模块，即init.js = webpack runtime + polyfill + utility2.js
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
	// 		// init.js只用于存储webpack runtime的代码，即init.js = webpack runtime
	// 		name: "init",
	// 		minChunks: Infinity
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		//顺序很重要
    //      //If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name.
	// 		//common.js用于至少被2个entry都使用的公共模块，即common.js = polyfill + utility2.js + utility3.js
	// 		//init.js用于存储webpack runtime的代码，即init.js = webpack runtime
	// 		names: ["common", "init"],
	// 		minChunks: 2
	// 	})
	// ]

	//http://stackoverflow.com/questions/39548175/can-someone-explain-webpacks-commonschunkplugin
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: "common",
	// 		minChunks: 2
	// 	}),

	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: "init",
	// 		minChunks: 2
	// 	})
	// ]

	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		//顺序很重要
	// 		//common.js用于至少被2个entry都使用的公共模块，即common.js = utility2.js + utility3.js
	// 		//vendor本身是一个entry，其包含vendor1和vendor2的代码，在此基础上vendor.js还会包含webpack runtime的代码，即vendor.js = webpack runtime + vendor1.js + vendor2.js
	// 		names: ["common", "vendor"],
	// 		minChunks: 2
	// 	})
	// ]

	//http://stackoverflow.com/questions/35908253/webpack-how-to-bundle-entries-to-multiple-common-chunks-with-commonschunkplugin
	plugins: [
		//vender不经常变化，为了使用缓存，通过指定chunks把它单独弄出来，init包含webpack runtime和其他公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			chunks: ["vendor"]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "init",
			chunks: ["pageA", "pageB", "pageC"]
		})
	]
};