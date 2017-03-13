<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/load-commonjs-amd-es6-modules-with-webpack/images/logo.png">
</p>

## [Webpack](https://webpack.github.io/)
A Bundler for JavaScript and Friends

现在前端项目越来越庞大，JavaScript、CSS文件、图片、JSON等各种文件杂乱堆砌，在前端我们可能需要不同的方式来加载不同的资源文件，比如通过创建`<script>`标签引入JavaScript，通过`<link>`标签引入CSS，通过`<img>`标签获取图片，通过AJAX请求获取JSON...

这样的处理对于小项目尚可接受，但是在一些庞大的单页应用（SPA）中这种资源加载的方式存在两个问题：

 - 为了加载某个模块就要严格保证该模块所依赖的其他资源都要加载，这就使得资源加载的顺序要严格控制，无形中增大了开发的难度。

 - 每个资源文件的加载都需要一次HTTP请求，加载多个小文件会导致触发浏览器最大链接并发数的限制，使得许多资源文件延迟加载，资源的下载速度下降。

幸运的是，Webpack可以解决这些难题。

Webpack，顾名思义，就是对Web资源进行打包，它是一个Web资源打包器，它可以将CommonJs、 AMD、 ES6 modules、 CSS、 图片、 JSON、 Coffeescript、 LESS等各种前端资源文件进行打包，打包成一个（或多个）JavaScript文件，这样我们在前端只需要引入一个打包好的bundler.js文件就可以了，这个文件里面包含了我们需要的全部资源信息，就是这么简单！

Webpack使用灵活，而且支持自定义资源打包，已经成为主流的前端资源打包平台。

Webpack目前有1.x和2.x两个主要的分支，出于兼容性考虑，本教程使用1.x对Webpack进行讲解。

## Webpack CLI
使用Webpack最简单的方式就是通过NPM全局安装，然后用命令行CLI使用Webpack。

我们首先全局安装1.x的Webpack：

```
npm install -g webpack@^1.13.3
```

*最新的Webpack版本是2.x，通过`npm install -g webpack`默认会安装2.x的Webpack。*

我们借用Webpack[官网](http://webpack.github.io/docs/usage.html)的例子介绍Webpack CLI的使用。

我们有两个CommonJS格式的模块：

cats.js
```
var cats = ['dave', 'henry', 'martha'];
module.exports = cats;
```

app.js
```
cats = require('./cats.js');
console.log(cats);
```

app.js中使用了cats.js模块，我们可以使用如下命令将这两个文件打包为一个文件：
```
webpack ./app.js app.bunde.js
```

app.js是Webpack的入口文件，app.bundle.js是打包后的输出文件，这个文件中囊括了cats.js和app.js的内容。

其具体执行过程如下所示：

<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/load-commonjs-amd-es6-modules-with-webpack/images/how-it-works.png">
</p>

 1. Webpack会读取入口文件app.js，并分析其所依赖的模块（CommonJS模块、AMD模块、ES6模块等），以及其所依赖模块所依赖的模块。

 2. 在分析出入口文件所依赖的所有模块之后，Webpack会将这些文件打包成一个文件，并输出到指定的输出文件中。

## 参考

[1] Webpack官网, [Webpack usage](http://webpack.github.io/docs/usage.html)
