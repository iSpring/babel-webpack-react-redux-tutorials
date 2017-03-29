
# [在Webpack中使用环境变量](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/webpack-environment-variables/README.md)

本文将介绍如何使用cross-env、DefinePlugin、EnvironmentPlugin为Webpack定义环境变量。

项目目录结构如下所示：
```
Project
  |--buildOutput
  |--node_modules
  |--.babelrc
  |--package.json
  |--README.md
  |--index.html
  |--webpack.config.js
  |--src
     |--index.js
     |--utils.js
```

## cross-env

我们知道，Webpack的配置文件是`webpack.config.js`，它是一个普通的CommonJS模块，当我们用Webpack进行打包时，Webpack会在Node.js运行环境中读取该模块。

在`webpack.config.js`中，可以通过`process.env`读取Node.js运行环境中的环境变量。

`webpack.config.js`配置如下：
```
var path = require("path");

var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  },

  plugins: []
};


if(process.env.NODE_ENV === 'production'){
  console.log("production environment");
}else{
  console.log("development environment");
}
```

我们想通过`process.env.NODE_ENV`判断当前运行在生产环境（线上部署）还是开发环境。

在Linux平台上，我们可以定义如下npm script设置环境变量：
```
start_linux: NODE_ENV=production webpack
```

在Windows平台上，上面的脚本不能使用，我们可以定义如下npm script设置环境变量：
```
start_windows:set NODE_ENV=production && webpack
```

不同操作系统设置环境变量的方法不同，为此我们可以使用[cross-env](https://www.npmjs.com/package/cross-env)这个npm模块，它可以为我们解决跨平台设置环境变量的问题。

安装如下所示：

```
npm install --save-dev cross-env
```

在使用时，我们只需要定义如下的npm script即可跨平台设置环境变量：
```
start: cross-env NODE_ENV=production webpack
```

我们配置`package.json`中的`scripts`如下所示：
```
"scripts": {
  "clear": "rimraf buildOutput",
  "prebuild:dev": "npm run clear",
  "build:dev": "cross-env NODE_ENV=development webpack --progress --colors",
  "prebuild:prod": "npm run clear",
  "build:prod": "cross-env NODE_ENV=production webpack --progress --colors",
  "start": "npm run build:dev"
}
```

我们为`build:dev`这个npm script设置了`NODE_ENV=development`，该npm script用于开发环境打包；为`build:prod`这个npm script设置了`NODE_ENV=production`，该npm script用于生产环境打包。

我们执行`npm run build:dev`，进行开发环境打包，在控制台中可以看到如下输出结果：
<div align="center">
  <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/webpack-environment-variables/images/1.png" />
</div>

由此可以看到通过`cross-env`，我们正确设置了环境变量。

我们可以在`webpack.config.js`中根据根据环境变量进行不同的设置，比如
```
if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
```

以上代码表示在为生产环境进行打包时，我们需要将代码进行混淆压缩，对于开发环境不需要进行此项设置。

## DefinePlugin

`index.js`是项目的入口文件，其引入了`utils.js`，如下所示：
```
import utils from './utils';

var max = utils.max(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log("max: ", max);

var min = utils.min(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log("min: ", min);

```

`utils.js`代码如下所示：
```
if(process.env.NODE_ENV === 'production'){
  //for production
  exports.max = function(){
    return Math.max.apply(null, arguments);
  };

  exports.min = function(){
    return Math.min.apply(null, arguments);
  };
}else{
  //for development
  exports.max = function(){
    var result = Infinity;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] < result){
        result = arguments[i];
      }
    }
    return result;
  };

  exports.min = function(){
    var result = -Infinity;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i] > result){
        result = arguments[i];
      }
    }
    return result;
  };
}
```

我们在`utils.js`中，分别为production环境和development环境分别定义了不同的模块实现，这样就可以在production环境中运行生产环境的代码，在development中运行开发环境的代码。

上面的代码判断是用Node.js运行时的环境变量`NODE_ENV`进行判断的，对应`process.env.NODE_ENV`。

如果此时执行`npm run build:prod`用Webpack进行打包，产生的`bundle.js`中`utils.js`代码如下所示：
```
...
/* WEBPACK VAR INJECTION */(function(process) {'use strict';

  if (process.env.NODE_ENV === 'production') {
    //for production
    exports.max = function () {
      return Math.max.apply(null, arguments);
    };

    exports.min = function () {
      return Math.min.apply(null, arguments);
    };
  } else {
    //for development
    exports.max = function () {
      var result = Infinity;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < result) {
          result = arguments[i];
        }
      }
      return result;
    };

    exports.min = function () {
      var result = -Infinity;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > result) {
          result = arguments[i];
        }
      }
      return result;
    };
  }
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))
...
```

这样build出来的代码是错误的，在打开`index.html`页面的时候，`bundle.js`中的代码会读取`window.process.env.NODE_ENV`，但是`window`不存在`process`属性。

我们想用`process.env.NODE_ENV`进行打包判断的真正意图是让Webpack在打包时进行区分，但是由于源代码`index.js`、`utils.js`不是运行在Node.js环境中的，所以其无法读取Node.js环境变量。

为了让我们的源代码在编译打包时能够读取Node.js环境变量，我们可以使用`DefinePlugin`插件。

我们修改`webpack.config.js`配置，如下所示：
```
...
var path = require("path");

var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV | "development")
    })
  ]
};
```

我们为实例化了一个`webpack.DefinePlugin`类型的插件，并将其放入了`plugins`数组中。

该插件接收一个对象参数，key表示的是要被替换的字面量，value表示用什么值替换该字面量。比如，当执行`npm run build:prod`时，环境变量`NODE_ENV`的值为`production`，那么Webpack会将源码`index.js`、`utils.js`中所有用到`process.env.NODE_ENV`的地方都被替换成`"production"`，注意两边有引号。

执行`npm run build:prod`后产生的`bundle.js`中`utils.js`代码如下所示：
```
...
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  if (true) {
    //for production
    exports.max = function () {
      return Math.max.apply(null, arguments);
    };

    exports.min = function () {
      return Math.min.apply(null, arguments);
    };
  } else {
    //for development
    exports.max = function () {
      var result = Infinity;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < result) {
          result = arguments[i];
        }
      }
      return result;
    };

    exports.min = function () {
      var result = -Infinity;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > result) {
          result = arguments[i];
        }
      }
      return result;
    };
  }
...
```

我们在`DefinePlugin`中配置了`'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV | "development")`，
因此

```
if(process.env.NODE_ENV === 'production')
```
会被Webpack修改为
```
if('production' === 'production')
```

所以在`bundle.js`中会看到最终代码
```
if(true)
```

这样在生产环境中运行的就是生产环境相关的代码。

但是还有一个问题，我们在生产环境中也包含了开发环境相关的代码，这些开发环境相关的代码在生产环境中不会使用到，属于`dead code`，我们在打包时最好将这些`dead code`去掉，这样可以减小打包后的代码体积。

为此，我们可以使用之前提到过的`UglifyJsPlugin`，使用如下所示：

```
module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
```

这样build出来的代码不会包含`dead code`这样的无用代码，而且代码还会被压缩混淆，如下所示：
```
...
function(n,t,r){"use strict";t.max=function(){return Math.max.apply(null,arguments)},t.min=function(){return Math.min.apply(null,arguments)}}
...
```

需要注意的是，由于Webpack只是简单将字面量替换成我们给定的值，所以对于字符串类型的值，我们需要调用`JSON.stringify()`，如果传入的是字符串`production`，那么得到带引号的`"production"`。如果不调用`JSON.stringify()`，那么`bundle.js`中会出现如下的代码
```
if ((production) === 'production')
```
这显然是不对的，所以对于字符串类型的值，需要使用`JSON.stringify()`。

对于boolean值，我们不能调用`JSON.stringify()`，否则会导致`JSON.stringify("false")` => `"false"`，这样Webpack在计算字符串`"false"`的值是会得到`true`，这是错误的，所以对于boolean值，不能调用`JSON.stringify()`。

同样，对于number值，我们也不能调用`JSON.stringify()`。

## EnvironmentPlugin
Webpack还提供了`EnvironmentPlugin`插件，该插件是对`DefinePlugin`插件的包装，它可以方便地将Node.js环境变量的值直接替换掉项目源代码中`process.env.XXX`等字面量。

比如
```
new webpack.EnvironmentPlugin(['NODE_ENV'])
```
等价于
```
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
```