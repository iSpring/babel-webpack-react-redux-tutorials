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


## 在项目中使用Babel
尽管你可以把 Babel CLI 全局安装在你的机器上，但是按项目逐个安装在本地会更好。

有两个主要的原因。

 1. 在同一台机器上的不同项目或许会依赖不同版本的 Babel 并允许你有选择的更新。

 2. 这意味着你对工作环境没有隐式依赖，这让你的项目有很好的可移植性并且易于安装。

因为全局运行 Babel 通常不是什么好习惯所以如果你想要卸载全局安装的 Babel 的话，可以运行：

```
npm uninstall --g babel-cli
```

在项目的[src](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/babel-basic-use/src)目录下存放着使用了ES6语法的多个源文件，目录结构如下所示：

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

`Circle.js`源码如下所示：

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

## presets and plugins

## editors
https：//github.com/babel/babel-sublime