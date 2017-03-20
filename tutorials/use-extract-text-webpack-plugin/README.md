# [使用ExtractTextPlugin分离CSS以及文本文件](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/use-extract-text-webpack-plugin/README.md)

<div align="center">
    <img width="200" height="200" src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/plugin.svg">
    <img width="200" height="200" src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/webpack.svg">
</div>

我们在上一篇[《使用Webpack加载CSS、SASS、LESS资源并集成PostCSS》](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)中介绍了如何使用Webpack加载CSS、SASS、LESS等相关资源以及如何将PostCSS整合进入Webpack构建过程，在那篇课程中我们将CSS相关资源打包成了一个JavaScript文件`css.bundle.js`。

将多个CSS文件打包成一个JavaScript文件存在如下问题：
 1. 生成的`css.bundle.js`文件中存储了CSS字符串，在html页面中需要用用`<script>`标签引入该`css.bundle.js`文件，而且它会自动向该html文件中生成多个`<style>`标签，但是IE8等浏览器对document中的`<style>`标签有上线要求。所以这种自动注入`<style>`标签的方式兼容性不够，而且将CSS字符串转变成`<style>`标签也需要一定的解析执行的过程，速度有一定影响。
 2. 将原生的CSS文件打包成JavaScript文件时，会在生成的JavaScript文件中生成很多额外的函数用于在运行时将这些字符串注入成`<style>`标签。举例来说，一个1KB的未被压缩的CSS文件生成的对应的JavaScript文件大约有16KB，这导致了输出文件过于庞大，影响传输速度。

为了解决这两个问题，本文将介绍如何从JavaScript文件中分离出多有CSS资源并将这些CSS资源打包成一个CSS文件。

## 使用ExtractTextPlugin分离CSS

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
  |--txt
  |  |--e.txt
  |  |--f.txt
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
import './css/a.css';
import './css/b.scss';
import './css/c.less';
import './css/d.css';

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

var extractCSS = new ExtractTextWebpackPlugin("bundle.css");

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
        extractCSS
    ]
};
```

使用插件`ExtractTextWebpackPlugin`分离CSS文件：

 1. 我们对`.css`文件、`.sass`、`.less`文件的loader都用`ExtractTextWebpackPlugin`进行了处理，将原有的loader信息传递给了`ExtractTextWebpackPlugin.extract()`方法。

 2. 我们通过`var extractCSS = new ExtractTextWebpackPlugin("bundle.css");`实例化了一个ExtractTextWebpackPlugin插件实例，`bundle.css`指的是输出文件的文件名，并将该插件实例放置于`plugins`数组中。

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

## 使用ExtractTextPlugin分离txt文本文件

我们还可以使用ExtractTextPlugin分离txt等其他文本文件。

我们在`txt`目录下包含`e.txt`和`f.txt`两个文本文件。
`e.txt`内容如下：
```
这是第一个文本文件的内容。
```

`f.txt`内容如下：
```
这是第二个文本文件的内容。
```

我们在`index.js`中也加载这两个文件，如下所示：
```
import './css/a.css';
import './css/b.scss';
import './css/c.less';
import './css/d.css';

import './txt/e.txt';
import './txt/f.txt';

console.log("index.js");
```

txt等文本文件的加载需要使用[raw-loader](https://github.com/webpack-contrib/raw-loader)，它可以将读取文件的原始内容。

我们需要安装`raw-loader`：
```
npm install --save-dev raw-loader
```

然后要在`webpack.config.js`添加配置，对`.txt`文件使用`raw-loader`进行加载：
```
{
    test: /\.txt$/,
    loader: "raw"
}
```

为了能够使插件`ExtractTextPlugin`同时分离CSS相关文件以及txt文本文件，我们需要对`webpack.config.js`进行修改，如下所示：
```
var path = require("path");

var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextWebpackPlugin("bundle.css");

var extractTXT = new ExtractTextWebpackPlugin("bundle.txt");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel"
        }, {
            test: /\.css$/,
            loader: extractCSS.extract("css!postcss")
        }, {
            test: /\.scss$/,
            loader: extractCSS.extract("css!postcss!sass")
        }, {
            test: /\.less$/,
            loader: extractCSS.extract("css!postcss!less")
        }, {
            test: /\.txt$/,
            loader: extractTXT.extract("raw")
        }]
    },

    plugins: [
        extractCSS,
        extractTXT
    ]
};
```

1. 我们在`extractCSS`实例的基础上，又通过`var extractTXT = new ExtractTextWebpackPlugin("bundle.txt");`实例化了`extractTXT`这个ExtractTextWebpackPlugin实例，其输出文件为`bundle.txt`。`extractCSS`用于分离CSS相关文件，`extractTXT`用于分离txt文本文件。

2. 对于CSS、SASS、LESS文件，我们将`ExtractTextWebpackPlugin.extract()`替换成`extractCSS.extract()`，使用插件实例的`extract()`方法，而不是使用`ExtractTextWebpackPlugin`的全局`extract()`方法。

3. 对于文件文件，使用`extractTXT.extract("raw")`进行分离。

4. 将`extractCSS`和`extractTXT`这两个插件实例都添加到`plugins`数组中。

执行`npm install`进行打包，输出结果有三个文件：`buildOutput/bundle.js`、`buildOutput/bundle.css`和`buildOutput/bundle.txt`。新增的``buildOutput/bundle.txt``包含了`txt/e.txt`和`txt/f.txt`文件的内容。

我们修改`index.html`，向其中添加一个`<iframe>`标签，将其指向`buildOutput/bundle.txt`，如下所示：
```
...
<iframe src="buildOutput/bundle.txt" width="100%" height="100"></iframe>
...
```

双击打开`index.html`，UI如下所示：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/UI.png" />
</div>

由此可见，`index.html`正确加载了打包后的资源。
