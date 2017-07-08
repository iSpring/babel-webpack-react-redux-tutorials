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
	// 		// init.js用于存储webpack runtime的代码以及被所有entry都使用的公共模块，本例中init.js = webpack runtime + polyfill
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
	//      //vendor.js包含webpack runtime是一个很不好的体验，因为每次编译webpack runtime都可能变化，会使得vendor.js缓存失效
	// 		names: ["common", "vendor"],
	// 		minChunks: 2
	// 	})
	// ]

	//http://stackoverflow.com/questions/35908253/webpack-how-to-bundle-entries-to-multiple-common-chunks-with-commonschunkplugin
	//https://doc.webpack-china.org/guides/code-splitting-libraries/
	//如果设置了多个CommonsChunkPlugin实例，那么处理流程是这样的：
	//1. 每个实例都设置了name，有可能设置了chunks属性，也有可能没有设置
	//2. 假设output.entry设置了三个entry: chunk1、chunk2、chunk3，那么在使用CommonsChunkPlugin插件之前就相当于我们有了三个chunk
	//3. 先使用第一个CommonsChunkPlugin插件处理这三个插件，如果这个插件设置了chunks: ['chunk1', 'chunk2']，
	//那么久从chunk1和chunk2中提取公共使用的模块（具体行为受到minChunks影响），提取到的公共模块放到该插件指定的name属性的chunk中，
	//如果name是chunk4，那么就创建一个新的chunk4存放该公共代码，如果name是chunk1、chunk2、chunk3中的某个chunk，那么就会把公共代码放到对应的chunk中
	//4. 经过第一个插件的处理，我们chunks数量可能发生了变化，基于这些chunks，进行第二次插件的同样处理。
	//5. 最终处理完成后，最后一个chunk包含webpack runtime
	//6. 一般讲vendor chunk放到第一个插件中
	plugins: [
		//vendor不经常变化，为了使用缓存，通过指定chunks把它单独弄出来，init包含webpack runtime和其他公共模块
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