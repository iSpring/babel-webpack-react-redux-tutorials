
# Webpack中使用环境变量

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
  |  |--index.js
  |  |--utils.js
```

`index.js`是入口文件，其引入了`utils.js`，如下所示：
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

## cross-env

我们知道，Webpack的配置文件是`webpack.config.js`，它是一个普通的CommonJS模块，当我们用Webpack进行打包时，Webpack会在Node.js运行环境中读模块。

`webpack.config.js`中可以通过`progress.env`读取Node.js运行环境中的环境变量。

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

## DefinePlugin

在实际开发中build出的代码与线上部署的代码是有不同的，比如线上部署的代码要求进行混淆、压缩等优化处理，但是这些优化对于开发环境作用不明显，但是却会增加开发调试的难度。再比如在开发环境中，我们会对一些操作进行控制台输出，但是线上环境却不能这样。为了让开发过程build出的代码和线上部署的代码不同，我们需要有一个或多个开关对代码进行控制标识，告诉Webpack要在什么环境下进行打包。

我们在`utils.js`中，分别为production环境和development环境分别定义了不同的模块实现，这样就可以在production环境中运行生产环境的代码，在development中运行开发环境的代码。

上面的代码判断是用Node.js运行时的环境变量`NODE_ENV`进行判断的，对应`process.env.NODE_ENV`。如果此时进行Webpack打包，我们会在`bundle.js`中看到如下的代码：
```
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
```

## EnvironmentPlugin