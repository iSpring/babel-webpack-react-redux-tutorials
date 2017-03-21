# [使用HtmlWebpackPlugin自动生成html文件](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/use-html-webpack-plugin/README.md)

本节将探讨如何使用HtmlWebpackPlugin自动生成html文件，并向生成的html文件中注入打包后的文件。

本文项目结构如下所示：
```
Project
  |--buildOutput
  |--images
  |  |--logo.png
  |
  |--node_modules
  |--.babelrc
  |--template.html
  |--index.js
  |--index.css
  |--package.json
  |--README.md
  |--webpack.config.js
```

在`index.js`中引入了`index.css`，如下所示：
```
import "./index.css";

console.log("index.js");
```

我们之前在文章[《使用ExtractTextPlugin分离CSS以及文本文件》](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/use-extract-text-webpack-plugin/README.md)中介绍了如何使用Webpack插件ExtractTextPlugin分离CSS并生成单独的输出文件，本文中也会使用该插件，需要安装相应的NPM模块：
```
npm install --save-dev extract-text-webpack-plugin@^1.0.1
```

为了使用Webpack插件HtmlWebpackPlugin，我们需要安装该模块：
```
npm install --save-dev html-webpack-plugin
```

## 基础使用

`webpack.config.js`配置如下所示：
```
var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var extractPlugin = new ExtractTextWebpackPlugin("bundle.css");

var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPlugin = new HtmlWebpackPlugin();

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: extractPlugin.extract('css')
        }]
    },
    plugins: [
        extractPlugin,
        htmlPlugin
    ]
};
```

我们通过`var htmlPlugin = new HtmlWebpackPlugin();`实例化了一个HtmlWebpackPlugin插件实例，并将其添加到`plugins`数组中。

执行`npm start`进行打包，`buildOutput`输出目录下产生了三个文件：`bundle.js`、`bundle.css`和`index.html`。

`index.js`被打包成了`bundle.js`，`index.css`被ExtractTextWebpackPlugin插件打包成了`bundle.css`，`index.html`文件是HtmlWebpackPlugin插件自动生成的。

生成的`index.html`文件如下所示：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  <link href="bundle.css" rel="stylesheet"></head>
  <body>
  <script type="text/javascript" src="bundle.js"></script></body>
</html>
```

我们可以看到，`index.html`中包含了打包生成的`bundle.css`和`bundle.js`。

## 参数配置

## 使用模板