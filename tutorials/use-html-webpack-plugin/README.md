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

执行`npm start`进行打包，`bundleOutput`输出目录下产生了三个文件：`bundle.js`、`bundle.css`和`index.html`。

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
我们在实例化HtmlWebpackPlugin插件的时候，可以向其传递参数。

我们修改如下所示：
```
var htmlPlugin = new HtmlWebpackPlugin({
    title: 'Use HtmlWebpackPlugin',
    filename: 'index.html',
    favicon: './images/logo.png',
    inject: 'body',
    hash: true
});
```

其他代码保持不变，再次执行`npm start`进行打包，`bundleOutput`输出目录下产生了四个文件：`bundle.js`、`bundle.css`、`index.html`和`logo.png`。

生成的`index.html`内容如下所示：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Use HtmlWebpackPlugin</title>
  <link rel="shortcut icon" href="logo.png"><link href="bundle.css?8c55e2b1a35ab37d37df" rel="stylesheet"></head>
  <body>
  <script type="text/javascript" src="bundle.js?8c55e2b1a35ab37d37df"></script></body>
</html>
```

我们分别解释一下传递给`new HtmlWebpackPlugin(options)`的几个参数：

 - title: 用于设置生成的html文件的`<title>`的值，默认是`Webpack App`
 - filename: 指定生成的html文件的名字，默认是`index.html`
 - favicon: 指定生成的html文件的`shortcut icon`，用于浏览器显示当前页面的小图标
 - inject: 指定将`<script>`标签注入到html文件的什么位置
   - 值为`true`或`'body'`时，会将`<script>`标签放置于`<body>`标签之后
   - 值为`head`时，会将`<script>`标签放置于`<head>`标签内
   - 值为`false`是，产生的JavaScript文件和CSS文件都不会注入到html中
 - hash: `true|false` 当值为`true`时，在向html中注入JavaScript和CSS时，会将Webpack编译的hash值挂在打包的文件名后，而且所有的JavaScript和CSS使用同一个hash值，如`bundle.css?8c55e2b1a35ab37d37df`和`bundle.js?8c55e2b1a35ab37d37df`，只要需要编译的资源文件没有变化，那么无论进行多少次Webpack打包，hash值都不变，除非JavaScript或CSS等待打包资源被修改，那么Webpack打包会使用新的hash值。当值为`false`时，不设置hash值。

 以上只是`HtmlWebpackPlugin`插件的部分常用参数，更多信息可参考[完整配置](https://github.com/jantimon/html-webpack-plugin#configuration)。


## 使用模板
我们还可以基于一个已经存在html模板生成我们最终的html文件。

我们项目中有一个模板文件`template.html`，如下所示：
```
<!DOCTYPE html>
<html>
<head>
  <title><%= htmlWebpackPlugin.options.description %></title>
  <link rel="stylesheet" type="text/css" href="<%= htmlWebpackPlugin.options.bootstrap %>">
  <script type="text/javascript" href="<%= htmlWebpackPlugin.options.jQuery %>"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

这个模板文件中想使用bootstrap和jQuery，已经写好了相应的`<link>`标签和`<script>`标签，但是还没有谁知具体的`href`，我们可以通过`HtmlWebpackPlugin`对其进行设置，我们再次修改实例化插件的代码，如下所示：
```
var htmlPlugin = new HtmlWebpackPlugin({
    template: '!!ejs!./template.html',
    description: 'Use HtmlWebpackPlugin',
    bootstrap: 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    jQuery: 'http://code.jquery.com/jquery-1.12.4.min.js'
});
```

首先，我们需要使用[ejs-loader](https://github.com/okonet/ejs-loader)编译模板文件，安装如下：
```
npm install --save-dev ejs-loader
```

将`template`的值设置为`'!!ejs!./template.html'`，表示使用`ejs-loader`编译模板文件。

然后我们设置了三个自定义属性并为其赋值：`description`、`bootstrap`和`jQuery`。这三个值都会替换模板中的变量，生成最终的html文件。

执行`npm start`进行打包，`bundleOutput`输出目录下产生了三个文件：`bundle.js`、`bundle.css`和`index.html`。

生成的`index.html`文件如下所示：
```
<!DOCTYPE html>
<html>
<head>
  <title>Use HtmlWebpackPlugin</title>
  <link rel="stylesheet" type="text/css" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script type="text/javascript" href="http://code.jquery.com/jquery-1.12.4.min.js"></script>
<link href="bundle.css" rel="stylesheet"></head>
<body>
  <div id="root"></div>
<script type="text/javascript" src="bundle.js"></script></body>
</html>
```

由此可见，模板`template.html`结合我们传入的变量正确生成了最终的html文件。