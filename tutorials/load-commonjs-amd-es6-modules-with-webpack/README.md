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

## 使用配置文件webpack.config.js
当我们的项目越来越复杂的时候，我们需要为Webpack配置更多的参数，这时候使用命令行CLI就显得捉襟见肘，我们可以在项目的根目录下创建配置文件webpack.config.js，对Webpack进行配置。

我们首先在项目中本地安装Webpack：
```
npm install --save-dev webpack@^1.13.3
```

我们的项目结构如下所示：
```
Project
  |--.gitignore
  |--index.html
  |--package.json
  |--README.md
  |--node_modules
  |--images
  |--.babelrc(babel配置文件)
  |--webpack.config.js(Webpack配置文件)
  |--buildOutput(Webpack输出目录)
  |    |--bundle.js(Webpack输出文件)
  |--src(源码)
       |--main.js(Webpack入口文件)
       |--Variables.js(CommonJS模块)
       |--Logger.js(AMD模块)
       |--Shape.js(ES6模块)
       |--Circle.js(ES6模块)
       |--Rectangle.js(ES6模块)

```

webpack.config.js配置如下所示：
```
var path = require("path");

module.exports = {
    entry: "./src/main",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    }
};
```

webpack.config.js其实是一个CommonJS模块，在Node.js的环境读取webpack.config.js，所以我们可以在webpack.config.js中使用Node.js相关的API。

 - `entry`指定了Webpack进行打包的入口文件。

 - `output.path`指定了打包后的文件的输出目录，`output.filename`则指定了打包后的文件名。

 - 我们可以在`module.loaders`中设置loader数组。何谓loader？loader就是用来专门加载打包某一种类型数据的加载器，比如我们用css-loader加载css文件，用json-loader加载json文件等，我们此处只指定了babel-loader。loaders数组中的每个元素可以配置如下属性：

  - `test`：其值可以是一个正则表达式，满足该正则表达式的文件才会能使用该loader。一般都是某种扩展名的文件使用某种loader，所以此处一般采用`test: /\.后缀名$/`的形式。

  - `exclude`：其值可以是一个正则表达式，满足该正则表达式的文件不会使用该loader。比如`exclude: /(node_modules|bower_components)/`表示不会使用该loader对npm包、bower包中的文件进行加载。

  - `include`：其值可以是一个正则表达式，与`exclude`相反，表示满足该正则表达式的文件可以使用该loader。

  - `loaders`：可以指定loader数组，表示用多种loader对一种类型的文件进行处理。比如对于scss文件可以设置`loaders: ["style-loader", "css-loader", "sass-loader"]`，需要注意的是，如果其执行顺序自右向左，即`scss文件 -> sass-loader -> css-loader -> style-loader`。

  - `loader`: 可以把`loader`看做`loaders`的简写形式。很多情况下，我们只需要指定一个loader，那么只需要把名字写在这里即可，比如`loader: babel`。`loaders: ["style-loader", "css-loader", "sass-loader"]`可以简写为`loader:style!css!sass`，loader之间用`!`分隔。

  - 其实`test`、`exclude`和`include`的值除了可以是正则表示外（对文件的绝对路径进行测试），还可以是包含绝对路径的字符串，甚至可以是一个方法签名为`function(absPath): bool`的方法，根据传入的绝对路径地址动态判断。设置其值还可以是一个上述三种值类型的数组，这种情况下需要同时满足数组中每个条件才能使用该loader。

我们项目中JavaScript的主文件是`src/main.js`，代码如下所示：
```
//引入CommonJS模块
import Variables from './Variables';// <=> const Variables = require('./Variables.js');

//引入AMD模块
import Logger from './Logger';// <=> const Logger = require('./Logger');

//引入ES6模块
import Circle from './Circle';

//引入ES6模块
import Rectangle from './Rectangle';

const circle = new Circle(Variables.defaultCircleInfo.radius);
const circleInfoString = circle.toString();
Logger(circleInfoString);
document.getElementById("circle").innerText = circleInfoString;

const rectangle = new Rectangle(Variables.defaultRectangleInfo.width, Variables.defaultRectangleInfo.height);
const rectangleInfoString = rectangle.toString();
Logger(rectangleInfoString);
document.getElementById("rectangle").innerText = rectangleInfoString;
```

在`src/main.js`文件中，通过`import`语句分别引入了CommonJS模块`Variables`、AMD模块`Logger`以及ES6模块`Circle`和`Rectangle`。

需要注意的是，`import`是`ES6`中定义的语法。Webpack 1.x无法识别`import`语法，只能使用`require(...)`，所以可以使用`const Variables = require('./Variables.js');`和`const Logger = require('./Logger');`分别引入对应的CommonJS模块和AMD模块。

为了避免在在同一个项目同时出现`import`和`require`两种引入依赖的代码，我们统一使用`import`。我可以通过使用babel-loader使得Webpack 1.x通过`import`引入所需依赖，并且我们项目中ES6模块的加载也需要使用babel-loader。

*Webpack 2.x已经原生支持`import`语法。*

安装babel相关的npm包：

```
npm install --save-dev babel-core babel-preset-es2015 babel-loader
```

还需要在项目的根目录下添加`.babelrc`文件，配置如下：
```
{
  "presets": ["es2015"]
}
```

为了修改`package.json`中的`scripts`字段，如下所示：
```
"scripts": {
    "clear": "rimraf buildOutput",
    "prestart": "npm run clear",
    "start": "webpack --progress --colors --watch"
}
```
这样我们就能通过`npm start`在根目录下运行Webpack了。`--progress`用于显示Webpack在打包时的进度信息，`--colors`用于用不同的颜色显示Webpack不同的输出信息，`--watch`参数用于监控项目中的文件变化，当文件变化的时候自动重新进行打包。

最终我们的`package.json`如下所示：
```
{
    "name": "load-commonjs-amd-es6-modules-with-webpack",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "clear": "rimraf buildOutput",
        "prestart": "npm run clear",
        "start": "webpack --progress --colors --watch"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-core": "^6.18.2",
        "babel-loader": "^6.2.7",
        "babel-preset-es2015": "^6.18.0",
        "rimraf": "^2.6.1",
        "webpack": "^1.13.3"
    },
    "reference": [
        "http://webpack.github.io/docs/usage.html",
        "http://webpack.github.io/docs/tutorials/getting-started/",
        "https://webpack.github.io/docs/list-of-loaders.html"
    ]
}
```

在项目的根目录下依次执行`npm install`和`npm start`。在Webpack打包完成后，在浏览器中打开`index.html`即可看到运行结果。

本文只是介绍了Webpack部分配置参数的使用，我们会在后续教程中通过示例进一步全面认识Webpack。


## 参考

[1] Webpack官网, [Webpack usage](http://webpack.github.io/docs/usage.html)

[2] Webpack官网, [Webpack configuration](https://webpack.github.io/docs/configuration.html)