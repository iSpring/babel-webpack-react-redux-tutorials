<div align="center">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/plugin.svg">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/webpack.svg">
</div>

# 使用ExtractTextWebpackPlugin分离CSS
我们在上一篇[《使用Webpack加载CSS、SASS、LESS资源并集成PostCSS》](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)中介绍了如何使用Webpack加载CSS、SASS、LESS等相关资源以及如何将PostCSS整合进入Webpack构建过程，在那篇课程中我们将CSS相关资源打包成了一个JavaScript文件`css.bundle.js`。

将多个CSS文件打包成一个JavaScript文件存在如下问题：
 1. 生成的`css.bundle.js`文件中存储了CSS字符串，在html页面中需要用用`<script>`标签引入该`css.bundle.js`文件，而且它会自动向该html文件中生成多个`<style>`标签，但是IE8等浏览器对document中的`<style>`标签有上线要求。所以这种自动注入`<style>`标签的方式兼容性不够，而且将CSS字符串转变成`<style>`标签也需要一定的解析执行的过程，速度有一定影响。
 2. 将原生的CSS文件打包成JavaScript文件时，会在生成的JavaScript文件中生成很多额外的函数用于在运行时将这些字符串注入成`<style>`标签。举例来说，一个1KB的未被压缩的CSS文件生成的对应的JavaScript文件大约有16KB，这导致了输出文件过于庞大，影响传输速度。

为了解决这两个问题，本文将介绍如何从JavaScript文件中分离出多有CSS资源并将这些CSS资源打包成一个CSS文件。

本文项目最终结构如下所示：
```
Project
  |--buildOutput
  |--css
  |  |--a.css
  |  |--b.scss
  |  |--c.less
  |  |--d.css
  |
  |--node_modules
  |--.babelrc
  |--browserslist
  |--index.html
  |--index.js
  |--package.json
  |--postcss.config.js
  |--README.md
  |--webpack.config.js
```

我们在`index.js`中引入了各种CSS文件，如下所示：
```
import './a.css';
import './b.scss';
import './c.less';
import './d.css';

console.log("index.js");
```

初始的`webpack.config.js`配置如下所示：
```
var path = require("path");

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
            loader: "css!postcss"
        }, {
            test: /\.scss$/,
            loader: "css!postcss!sass"
        }, {
            test: /\.less$/,
            loader: "css!postcss!less"
        }]
    },

    plugins: [
        new ExtractTextWebpackPlugin("bundle.css")
    ]
};
```

以上配置会把所有CSS文件打包到`bundle.js`中。

`extract-text-webpack-plugin`插件能够将JavaScript中引入的文件分离出来并打包到一个文件中。

首先我们安装`extract-text-webpack-plugin`插件：
```
npm install --save-dev extract-text-webpack-plugin
```

然后修改`webpack.config.js`如下所示：
```
var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

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
            loader: ExtractTextWebpackPlugin.extract("css!postcss")
        }, {
            test: /\.scss$/,
            loader: ExtractTextWebpackPlugin.extract("css!postcss!sass")
        }, {
            test: /\.less$/,
            loader: ExtractTextWebpackPlugin.extract("css!postcss!less")
        }]
    },

    plugins: [
        new ExtractTextWebpackPlugin("bundle.css")
    ]
};
```

使用插件`ExtractTextWebpackPlugin`分离CSS文件：
 1. 我们对`.css`文件、`.sass`、`.less`文件的loader都用`ExtractTextWebpackPlugin`进行了处理，将原有的loader信息传递给了`ExtractTextWebpackPlugin.extract()`方法。

 2. 我们通过`new ExtractTextWebpackPlugin("bundle.css")`实例化了一个ExtractTextWebpackPlugin插件实例，`bundle.css`指的是输出文件的文件名，并将该插件实例放置于`plugins`数组中。

执行`npm start`进行打包，输出结果有两个文件：`buildOutput/bundle.js`和`buildOutput/bundle.css`。`index.js`打包到了`buildOutput/bundle.js`文件中，该文件不包含CSS。`index.js`中所有依赖的CSS文件打包到了`buildOutput/bundle.css`文件中，只有1KB大小。

`index.html`文件需要分别引入这两个文件，如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
    <link rel="stylesheet" type="text/css" href="buildOutput/bundle.css">
</head>

<body>
    <p id="p1">字体样式来自于a.css，背景样式来自于d.css</p>
    <p id="p2">字体样式来自于b.scss，背景样式来自于d.css</p>
    <p id="p3">字体样式来自于c.less，背景样式来自于d.css</p>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```