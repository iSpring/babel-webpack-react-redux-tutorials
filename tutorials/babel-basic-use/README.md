# [Babel使用基础](https://github.com/iSpring/babel-webpack-react-redux-tutorials/tree/master/tutorials/babel-basic-use/README.md)

<div align="center">
  <img width="80%" src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/babel-basic-use/images/Babel.png" />
</div>

Babel原名叫做`6to5`，顾名思义，它的使命就是把ES6的代码编译成ES5，使得我们可以使用ES6的新特性与语法编写代码。

针对ES6的每一种新语法特性，Babel都提供了对应的插件以便将使用该语法的代码向下编译。比如ES6中新增了箭头函数语法，Babel提供了对应的插件[transform-es2015-arrow-functions](https：//babeljs.io/docs/plugins/transform-es2015-arrow-functions/)Babel提供了几十种插件用以将ES6和ES7的诸多语法转换成ES5等语言。可以单独引入某几种插件使用，Babel还将多种插件组合成一组，形成一个`预设(preset)`，比如将ES2015相关的插件组合成了es2015这个预设，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。

## babel-cli
使用Babel最简单的方式就是通过babel-cli，通过babel-cli可以在命令行中运行Babel。

我们先通过npm全局安装它来学习基础知识：

```
npm install -g babel-cli
```

我们在文件`example.js`中编写如下代码：

```
const square = n => n * n;
```

我们在命令行中执行：

```
babel example.js -o compolied-example.js
```

可以将example.js转换为ES5代码，使用`--out-file` 或着 `-o` 可以将结果写入到指定的文件。

如果我们想要把一个目录整个编译成一个新的目录，可以使用`--out-dir`或者`-d`。


当我们打开生成的compolied-example.js时，你会惊奇地发现代码没有任何变化。这是因为默认情况下，我们没有告诉Babel如何编译我们的代码，所以Babel只是对代码进行了拷贝，没有对代码进行任何编译。

我们可以通过`--plugins`参数告诉Babel使用哪些插件对代码进行编译，比如我们想用箭头函数插件，那么我首先要在当前目录下通过npm安装该插件：

```
npm install babel-plugin-transform-es2015-arrow-functions
```

然后通过CLI执行：

```
babel example.js -o compolied-example.js --plugins transform-es2015-arrow-functions
```

编译后的代码为：

```
const square = function (n) {
    return n * n;
};
```

如果我们的源文件中使用了多个ES6语法特性，那么我们可以通过`--plugins`参数指定多个插件，插件名字之间用逗号分隔，比如以下命令可以同时执行箭头函数插件和解构插件：

```
babel example.js -o compolied-example.js --plugins transform-es2015-arrow-functions,transform-es2015-destructuring
```

当源码使用了更多ES6语法特性的时候，通过`--plugins`参数指定插件的方式显得捉襟见肘。为此，Babel还将多种插件组合成一组，形成一个`预设(preset)`，所谓预设就是能满足一类功能的插件的集合。比如将ES2015相关的所有插件组合成了es2015这个预设，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。

通过`--presets`参数可以指定要使用的预设，如果我们要使用es2015这个预设，那首先要在当前目录中通过npm安装它：

```
npm install babel-preset-es2015
```

然后在CLI中执行：

```
babel example.js -o compolied-example.js --presets es2015
```

也可以通过`--presets`参数指定多个预设，预设名字之间用逗号分隔。

还可以设置参数`--ignore [regex]`或`-i [regex]`，不会对指定正则表达式文件进行编译，默认值是`node_modules`,即默认情况下不会对`node_modules`下的文件进行编译。

还可以设置参数`--extensions`或`-x`，指定只对特定后缀名的文件进行编译，默认值是`".js",".jsx",".es6",".es"`，即默认会对这些后缀名的文件进行编译。

## 在项目中使用Babel
尽管你可以把 Babel CLI 全局安装在你的机器上，但是按项目逐个安装在本地会更好。

有两个主要的原因。

 1. 在同一台机器上的不同项目或许会依赖不同版本的 Babel 并允许你有选择的更新。

 2. 这意味着你对工作环境没有隐式依赖，这让你的项目有很好的可移植性并且易于安装。

因为全局运行 Babel 通常不是什么好习惯所以如果你想要卸载全局安装的 Babel 的话，可以运行：

```
npm uninstall --g babel-cli
```

在项目的[src](https://github.com/iSpring/babel-webpack-react-redux-tutorials/tree/master/tutorials/babel-basic-use/src)目录下存放着使用了ES6语法的多个源文件，目录结构如下所示：

```
src
  main.js
  Shape.js
  Circle.js
  Rectangle.js
```

`Shape.js`定义了`Shape`类，`Circle.js`和`Rectangle.js`分别定义了`Circle`和`Rectangele`类，并且都继承自`Shape`类，`main.js`使用了这几个类。

要在项目本地安装 Babel CLI 可以运行：

```
npm install --save-dev babel-cli
```

然后运行命令安装es2015预设：

```
npm install --save-dev babel-preset-es2015
```

安装完成后，我们项目中的`package.json`如下所示：

```
{
    "name": "babel-basic-use",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {},
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-cli": "^6.18.0",
        "babel-preset-es2015": "^6.18.0"
    }
}
```

在上文中我们通过`--presets`或`--plugins`运行babel-cli，在项目中一般通过配置`.babelrc`文件的方式配置Babel。

我们在项目的根目录下放置了`.babelrc`文件，内容如下所示：

```
{
    "presets": ["es2015"],
    "plugins": []
}
```

可以通过`presets`数组和`plugins`数组配置要运行的预设和插件。

需要注意的是，Babel会首先运行`plugins`中的插件，然后再运行`presets`中的预设。`plugins`中插件的运行顺序是从头到尾，而`presets`中预设的运行顺序则是从尾到头。比如`.babelrc`存在配置如下：

```
{
    "presets": ["preset1", "preset2"],
    "plugins": ["plugin1", "plugin2"]
}
```

那么Babel运行的顺序是：

```
plugin1 -> plugin2 -> preset2 -> preset1
```

npm的package.json中有一个`scripts`对象字段，我们可以在其中定义通过npm可以运行的script，我们向其中添加`build`脚本，用Babel对src目录进行编译，如下所示：

```
"scripts": {
    "build": "babel src -d buildOutput"
}
```

这样，在项目的根目录下执行`npm run build`即可启动Babel对源码进行编译，输出到`buildOutput`目录下。

我们以src目录下的`Circle.js`对比编译前后的区别，`src/Circle.js`源码如下所示：

```
import Shape from './Shape';

class Circle extends Shape{
  constructor(radius){
    super();
    this.radius = radius;
  }

  getArea(){
    return Math.PI * this.radius * this.radius;
  }

  getLength(){
    return 2 * Math.PI * this.radius;
  }

  toString(){
    return `Circle radius:${this.radius}, Circle area:${this.getArea()}, Circle length:${this.getLength()}`;
  }
}

export default Circle;
```

在该文件中我们使用了ES6中的`import`、`class`、`extends`等基于类定义的语法。

编译后的`buildOutput/Circle.js`的代码如下所示：

```
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Shape2 = require('./Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(radius) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

    _this.radius = radius;
    return _this;
  }

  _createClass(Circle, [{
    key: 'getArea',
    value: function getArea() {
      return Math.PI * this.radius * this.radius;
    }
  }, {
    key: 'getLength',
    value: function getLength() {
      return 2 * Math.PI * this.radius;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Circle radius:' + this.radius + ', Circle area:' + this.getArea() + ', Circle length:' + this.getLength();
    }
  }]);

  return Circle;
}(_Shape3.default);

exports.default = Circle;
```

可以看到，编译后的文件中`import`、`class`、`extends`等关键词不见了，原有的ES6类文件被默认编译成了CommonJS模块。

CommonJS模块适合于Node.js环境中同步require使用，不适用于前端浏览器环境。我们想把ES6类文件编译成AMD模块，为此我们需要安装AMD相关的plugin：

```
npm install --save-dev babel-plugin-transform-es2015-modules-amd
```

然后将AMD插件添加到`.babelrc`的`plugins`数组中，如下所示：

```
{
  "presets": ["es2015"],
  "plugins": ["transform-es2015-modules-amd"]
}
```

然后重新运行`npm run build`，新生成的`buildOutput/Circle.js`的代码如下所示：

```
define(['exports', './Shape'], function (exports, _Shape2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Shape3 = _interopRequireDefault(_Shape2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Circle = function (_Shape) {
    _inherits(Circle, _Shape);

    function Circle(radius) {
      _classCallCheck(this, Circle);

      var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

      _this.radius = radius;
      return _this;
    }

    _createClass(Circle, [{
      key: 'getArea',
      value: function getArea() {
        return Math.PI * this.radius * this.radius;
      }
    }, {
      key: 'getLength',
      value: function getLength() {
        return 2 * Math.PI * this.radius;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return 'Circle radius:' + this.radius + ', Circle area:' + this.getArea() + ', Circle length:' + this.getLength();
      }
    }]);

    return Circle;
  }(_Shape3.default);

  exports.default = Circle;
});
```

可以看到编译后的`Circle.js`中在代码首行就通过`define`引入了依赖`Shape`，输出结果是一个AMD模块。

## 常见预设和插件

Babel官方提供了如下七种预设:

 - [es2015](https://babeljs.io/docs/plugins/preset-es2015/) 该预设用于编译ES2015新语法。

 - [es2016](https://babeljs.io/docs/plugins/preset-es2016/) 该预设用于编译ES2016新语法。

 - [es2017](https://babeljs.io/docs/plugins/preset-es2017/) 该预设用于编译ES2017新语法。

 - [latest](https://babeljs.io/docs/plugins/preset-latest/) 该预设会包含从2015年之后每年ECMAScript版本的新语法，目前包含es2015、es2016、es2017，只需要引入latest预设，就无需再分别引入以上三个预设。

 - [react](https://babeljs.io/docs/plugins/preset-react/) 该预设用于编译react的JSX语法。

 - [flow](https://babeljs.io/docs/plugins/transform-flow-strip-types/) 该预设只是用来删除掉代码中的类型声明，在以后的文章中会进行介绍。

 - [env](https://babeljs.io/docs/plugins/preset-env/) 该预设根据项目需要支持的环境自动选择Babel插件。

我们此处只列举部分插件：
 - [es2015-modules-amd](https://babeljs.io/docs/plugins/transform-es2015-modules-amd/) 该插件用于将ES6模块转换为AMD模块。

 - [es2015-modules-commonjs](https://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/) 该插件用于将ES6模块转换成CommonJS模块。

 - [es2015-modules-systemjs](https://babeljs.io/docs/plugins/transform-es2015-modules-systemjs/) 该插件用于将ES6模块转换为SystemJS模块。

 - [es2015-modules-umd](https://babeljs.io/docs/plugins/transform-es2015-modules-umd/) 该插件用于将ES6模块转换成UMD模块。

 - [object-assign](https://babeljs.io/docs/plugins/transform-object-assign/) 该插件用于为ES6中新增的API`Object.assign()`提供兼容性的模拟代码。

 - [object-set-prototype-of-to-assign](https://babeljs.io/docs/plugins/transform-object-set-prototype-of-to-assign/) 该插件用于为ES6中新增的API`Object.setPrototypeOf()`提供兼容性的模拟代码。

 ...


通过本文，我们应该掌握了使用Babel的基础知识。
