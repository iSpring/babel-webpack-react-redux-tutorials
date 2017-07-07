# [使用Webpack加载图片和SVG](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-image-with-webpack/README.md)

本节将探讨如何使用[file-loader](https://github.com/webpack-contrib/file-loader)和[url-loader](https://github.com/webpack-contrib/url-loader)打包图片和SVG等资源。

本文项目最终结构如下所示：
```
Project
  |--buildOutput
  |--images
  |  |--npm.svg (0.24KB)
  |  |--github.png (6.17KB)
  |  |--star.png (9.14KB)
  |  |--webpack.png (52.7KB)
  |
  |--node_modules
  |--.babelrc
  |--index.html
  |--index.js
  |--index.css
  |--package.json
  |--README.md
  |--webpack.config.js
```

`index.html`如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
</head>

<body>
    <div id="star"></div>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```

`index.css`文件如下所示：
```
#star {
    width: 48px;
    height: 48px;
    background: url(images/star.png) no-repeat center;
}

img {
    display: block;
    max-width: 250px;
}
```

我们在`index.css`中设置了`#star`的背景是`star.png`。

`index.js`文件如下所示：
```
import "./index.css";

import githubPng from "./images/github.png";// <=> const github = require("./images/github.png");
import webpackPng from "./images/webpack.png";// <=> const webpack = require("./images/webpack.png");
import npmSvg from "./images/npm.svg";// <=> const npmSvg = require("./images/npm.svg");

const img1 = document.createElement("img");
img1.src = githubPng;
document.body.appendChild(img1);
console.log(githubPng);

const img2 = document.createElement("img");
img2.src = webpackPng;
document.body.appendChild(img2);
console.log(webpackPng);

const img3 = document.createElement("img");
img3.src = npmSvg;
document.body.appendChild(img3);
console.log(npmSvg);
```

我们在`index.js`中通过`import`（或`require()`）加载了`github.png`、`webpack.png`和`npm.svg`，根据这些资源创建了相应的DOM，并输出了资源的路径。

## [file-loader](https://github.com/webpack-contrib/file-loader)

为了能够在Webpack中使用这些图片资源文件，我们需要使用[file-loader](https://github.com/webpack-contrib/file-loader)。**`file-loader`的作用不是把图片等文件打包到一个JavaScript文件中，而是通过`file-loader`方便地获得要使用的图片等资源的URL。**

首先我们要安装`file-loader`：
```
npm install --save-dev file-loader
```

`webpack.config.js`配置如下所示：
```
var path = require("path");

var buildFolder = "buildOutput";

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, buildFolder),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|jpeg|png|svg)$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
```

对于图片和SVG文件，我们需要使用`file-loader`进行加载。

运行`npm start`进行打包，在`buildOutput`目录下输出结果如下所示：

<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/output.png" />
</div>

我们可以看到，图片和SVG的文件名变成了hash值，默认情况下，`file-loader`使用文件的hash值作为文件名。需要注意的是，这些图片文件没有打包到`bundle.js`中。`file-loader`的作用不是把图片等文件打包到一个JavaScript文件中，而是通过`file-loader`方便地获得要使用的图片等资源的URL。

我们双击打开`index.html`文件，发现界面上没有显示任何图片，图片加载不成功肯定是URL路径不对。我们在`index.js`中将这几个图片和SVG的路径进行了输出，我们打开控制台，输出如下：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/url1.png" />
</div>

`index.html`和`buildOutput`目录之间的相对位置如下所示：
```
Project
  |
  |--index.html
  |--buildOutput
      |--30b63bc34b872b05319d23070d29ff31.png
      |--0714810ae3fb211173e2964249507195.png
      |--ab8d3852300ee8fce6ce89d0a1b2a362.svg
      |--009911f7665c7be361e829ea741b70eb.png

```

由此可见，在运行时，`index.html`中使用了错误的URL路径，应该将路径改为`buildOutput/30b63bc34b872b05319d23070d29ff31.png`等。

为了解决URL路径问题，我们修改`webpack.config.js`，为`output`节点配置[publicPath](https://github.com/webpack/docs/wiki/configuration#outputpublicpath)属性，配置如下：
```
var path = require("path");

var buildFolder = "buildOutput";

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, buildFolder),
        filename: "bundle.js",
        publicPath: buildFolder + "/"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|jpeg|png|svg)$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
```

我们为配置了`output.publicPath`的值为`buildFolder + "/"`，我们执行`npm start`再次执行打包，刷新`index.html`页面，这次控制台输出如下所示：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/url2.png" />
</div>

这次URL输出路径是正确的，界面也能正确显示所有的图片，如下所示：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/UI.png" />
</div>

## [url-loader](https://github.com/webpack-contrib/url-loader)

我们之前提到`file-loader`不能将文件打包到JavaScript的输出文件中，我们想把一些比较小的图片打包到`bundle.js`中，这时我们可以使用[url-loader](https://github.com/webpack-contrib/url-loader)。

我们安装`url-loader`：
```
npm install --save-dev url-loader
```

我们可以把`url-loader`看做是`file-loader`的升级版，`url-loader`除了可以方便地获取图片等资源的URL路径，还可以选择性地将图片等资源打包到输出的JavaScript文件中，这样可以减少小文件的请求数量。`url-loader`依赖`file-loader`，在使用`url-loader`时，请确保已安装了`file-loader`。

我们修改`webpack.config.js`，如下所示：
```
var path = require("path");

var buildFolder = "buildOutput";

module.exports = {
    entry: "./index.js",

    output: {
        path: path.join(__dirname, buildFolder),
        filename: "bundle.js",
        publicPath: buildFolder + "/"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpg|jpeg|png|svg)$/,
            loader: 'url-loader', //url-loader?limit=10000
            query: {
                limit: 10 * 1024 //10KB
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
```

我们用`url-loader`替换了`file-loader`，并且通过
```
query: {
    limit: 10 * 1024 //10KB
}
```
为`url-loader`配置了`limit`参数为10KB，也可以通过`url-loader?limit=10000`的形式为其指定`limit`等参数。如果不配置`limit`参数，那么`url-loader`会将`index.js`中用到的所有图片和资源打包到`buildOutput/bundle.js`中。我们此处配置`limit`参数为10KB，`url-loader`只会将10KB以下的图片等资源打包到`buildOutput/bundle.js`中，超过10KB的图片只是拷贝到`buildOutput`目录下（当然，文件名会改成hash）。

重新执行`npm start`进行打包，在`buildOutput`目录下输出结果如下所示：

<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/output2.png" />
</div>

`github.png`、`star.png`、`npm.svg`都小于10KB，这三个文件被打包到了`buildOutput/bundle.js`中，而`webpack.png`大于10KB，所以没有被打包到`buildOutput/bundle.js`中。

刷新`index.html`页面，依然能正确显示图片，控制台输出如下：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-image-with-webpack/images/url3.png" />
</div>

由此可以看出，`github.png`和`npm.svg`已经被打包成了base64字符串存储在`bundle.js`中了。
