Babel原名叫做`6to5`，顾名思义，它的使命就是把ES6的代码编译成ES5，使得我们可以使用ES6的新特性与语法编写代码。

针对ES6的每一种新语法特性，Babel都提供了对应的插件以便将使用该语法的代码向下编译。比如ES6中新增了箭头函数语法，Babel提供了对应的插件[ransform-es2015-arrow-functions](https://babeljs.io/docs/plugins/transform-es2015-arrow-functions/)Babel提供了几十种插件用以将ES6和ES7的诸多语法转换成ES5等语言。可以单独引入某几种插件使用，Babel还将多种插件组合成一组，形成一个`预设(preset)`，比如将ES2015相关的插件组合成了es2015这个预设，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。

## babel-cli
使用Babel最简单的方式就是通过babel-cli，通过babel-cli可以在命令行中运行Babel。

我们先通过npm全局安装它来学习基础知识。

```
npm install -g babel-cli
```

我们在文件`example.js`中编写如下代码:

```
const square = n => n * n;
```

我们在命令行中执行:

```
babel example.js -o compolied-example.js
```

可以将example.js转换为ES5代码，使用`--out-file` 或着 `-o` 可以将结果写入到指定的文件。

当我们打开生成的compolied-example.js时，你会惊奇地发现代码没有任何变化。这是因为默认情况下，我们没有告诉Babel如何编译我们的代码，所以Babel只是对代码进行了拷贝，没有对代码进行任何编译。

我们可以通过`--plugins`参数告诉Babel用哪些插件对代码进行编译，比如我们想用箭头函数插件，那么我首先要在当前目录下通过npm安装该插件:

```
npm install babel-plugin-transform-es2015-arrow-functions
```

然后通过CLI执行:

```
babel example.js -o compolied-example.js --plugins transform-es2015-arrow-functions
```

编译后的代码为:

```
const square = function (n) {
    return n * n;
};
```

如果我们的源文件中使用了多个ES6语法特性，那么我们可以通过`--plugins`参数指定多个插件，插件名字之间用逗号分隔，比如以下命令可以同时执行箭头函数插件和解构插件:

```
babel example.js -o compolied-example.js --plugins transform-es2015-arrow-functions,transform-es2015-destructuring
```

当源码使用了更多ES6语法特性的时候，通过`--plugins`参数指定插件的方式显得捉襟见肘。为此，Babel还将多种插件组合成一组，形成一个`预设(preset)`，所谓预设就是能满足一类功能的插件的集合。比如将ES2015相关的所有插件组合成了es2015这个预设，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。

通过`--presets`参数可以指定要使用的预设，假设我们要使用es2015这个预设，那首先要在当前目录中通过npm安装它:

```
npm install babel-preset-es2015
```

然后在CLI中执行:

```
babel example.js -o compolied-example.js --presets es2015
```

也可以通过`--presets`参数指定多个预设，预设名字之间用逗号分隔。

## presets and plugins

## editors
https://github.com/babel/babel-sublime