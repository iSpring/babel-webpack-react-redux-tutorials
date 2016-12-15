var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		main: path.join(__dirname, "main.js")
	},
	output: {
		path: path.join(__dirname, "buildOutput"),
		filename: "[name].js"
	}
};