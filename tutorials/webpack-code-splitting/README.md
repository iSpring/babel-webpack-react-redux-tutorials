# [通过Webpack Code Splitting实现异步按需加载](https://github.com/iSpring/babel-webpack-react-redux-tutorials/tree/master/tutorials/webpack-code-splitting/README.md)

对于大型Web项目来说，把所有代码打包成一个JavaScript文件并不明智，因为这会导致生成的`bundle.js`非常庞大，需要花费更多的时间来加载它，导致用户体验下降。本文将介绍Webpack强大的代码分离(Code Splitting)功能，通过该特性我们可以将一个`bundle.js`文件拆分为多个chunk文件，实现在运行时按需异步加载相关资源。本文将从chunk的角度讲解Webpack的代码分离特性。

项目目录结构如下所示：
```
Project
  |--buildOutput
  |--node_modules
  |--.babelrc
  |--package.json
  |--README.md
  |--webpack.config.js
  |--src
     |--a.js
     |--b.js
     |--c.js
     |--d.js
     |--e.js
     |--page1.js
     |--page2.js
     |--page3.js
```

`a.js`文件如下所示：
```
module.exports = "module a";
```

`b.js`文件如下所示：
```
module.exports = "module b";
```

`c.js`文件如下所示：
```
module.exports = "module c";
```

`d.js`文件如下所示：
```
module.exports = "module d";
```

如上所示，`a.js`、`b.js`、`c.js`、`d.js`这四个文件都是普通的CommonJS模块。

`chunk`，英文直译过来是`数据块`的意思，我们可以把一个`chunk`看做是一个文件，这个文件里可以包含一个或多个模块（比如a.js、b.js等）。

`chunk`总的来说可以分为`entry chunk`和`normal chunk`，`normal chunk`指的就是`non-entry chunk`。

我们首先看一下最简单的`entry chunk`。

## 1. entry chunk
`page1.js`中引入了`a.js`和`b.js`模块，如下所示：
```
import a from "./a.js";
import b from "./b.js";

console.log("module a: ", a);
console.log("module b: ", b);
```

`page2.js`中引入了`c.js`和`d.js`模块，如下所示：
```
import c from "./c.js";
import d from "./d.js";

console.log("module c: ", c);
console.log("module d: ", d);
```

### 1.1 entry为字符串
`webpack.config.js`中的`entry`用于设置打包的入口文件，即要将哪些资源进行打包。`output.path`、`output.filename`分别用于设置打包的输出目录和输出文件。

当`entry`的值为字符串路径时，这个`entry`属于单一入口(single entry)。

我们将`webpack.config.js`配置如下所示：
```
entry: "./src/page1.js",
output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "page1.bundle.js"
}
```

此处，我们将`entry`配置成一个stirng值，即一个文件路径。`page1.js`中引入了`a.js`和`b.js`模块，执行`npm start`进行打包，在`buildOutput`目录下生成打包文件`page1.bundle.js`，该文件就是一个入口chunk(entry chunk)，即根据entry生成的打包文件。

打开`page1.bundle.js`文件我们可以看到其中定义了`webpackJsonp()`、`__webpack_require__()`之类的函数，通过这些方法可以在浏览器中加载相应的模块资源，我们把这些在运行时Webpack加载资源的逻辑代码叫做`webpack runtime`。就像`require.js`用于加载AMD模块资源一样，`webpack runtime`是用于加载Webpack打包后的资源的，它是在浏览器环境中加载和使用Webpack资源的关键。

所以
```
`page1.bundle.js` = webpack runtime + a.js + b.js
```

我们对`filename`做点修改，将设置为`filename: "[id].[name].bundle.js"`，此处的`[id]`表示chunk id，`[name]`表示chunk name，执行`npm start`重新进行打包，在`buildOutput`目录下生成打包文件`0.main.js`，也就是说我们生成的entry chunk的id为0，chunk name为`main`。在只有一个entry chunk的情况下，将`filename`设置为类似于`"[id].[name].bundle.js"`的值意义不大，大家知道其输出文件名的含义即可，我们会后面的multiple entry中讲解`"[id].[name].bundle.js"`的使用场景。

### 1.2 entry为字符串数组
`entry`还可以配置为一个字符串路径数组，这种`entry`也属于单一入口(single entry)。

修改`webpack.config.js`如下所示：
```
entry: ["./src/page1.js", "./src/page2.js"],
output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "page12.bundle.js"
}
```

我们将`entry`设置为字符串数组，每个字符串都表示一个路径，Webpack会将每个路径所对应的文件一起打包，生成一个打包文件。执行`npm start`，在`buildOutput`目录下生成打包文件`page12.bundle.js`。

```
page12.bundle.js = webpack runtime + a.js + b.js + c.js + d.js
```

`page12.bundle.js`是一个entry chunk，其chunk id为0，chunk name为`main`，可以设置`filename: "[id].[name].bundle.js"`进行验证。

### 1.3 entry为Object对象
当`entry`的值为字符串路径或者是字符串路径数组时，这种`entry`也属于单一入口(single entry)。一般情况下，single entry打包会生成一个输出文件（不考虑Code Splitting）。

当`entry`的值为Object对象时，这种`entry`叫做多入口(multiple entry)。一般情况下，multiple entry打包会生成多个输出文件。

我们修改`webpack.config.js`如下所示：
```
entry: {
    page1: ["./src/page1.js"],
    page2: ["./src/page2.js"]
},
output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "[id].[name].bundle.js
}
```

执行`npm start`进行打包，在`buildOutput`目录下生成打包文件`0.page1.bundle.js`和`1.page2.bundle.js`。

当`entry`的值为Object对象时，该对象中的每个key-value键值对都会创建一个entry chunk，其key值相当于chunk name，value值表示该entry chunk要打包哪些资源文件，value值可以为字符串路径或字符串路径数组。在本例中，key分别为`page1`和`page2`，所以会产生两个entry chunk。

```
0.page1.bundle.js = webpack runtime + a.js + b.js

1.page2.bundle.js = webpack runtime + c.js + d.js
```


## 2. normal chunk
通过上面的示例，我想大家已经明白了什么是entry chunk，下面开始今天的正题Code Splitting。

Webpack允许我们在代码中创建分离点(Code Splitting Point)，在分离点处将会产生一个新的normal chunk文件。

我们在`e.js`中用ES6语法定义了一个`Person`类，如下所示：
```
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAge(age) {
        this.age = age;
    }

    getAge() {
        return this.age;
    }

    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}

export default Person;
```

`page3.js`文件如下所示：
```
import a from "./a.js";
import b from "./b.js";

console.log("module a: ", a);
console.log("module b: ", b);

//创建代码分离点
require.ensure(["./c.js", "./d.js", "./e.js"], function() {
    const c = require("./c.js");
    const d = require("./d.js");
    const Person = require("./e.js");
    const person = new Person("ZhangSan", 28);
    console.log("module c: ", c);
    console.log("module d: ", d);
    console.log("person: ", person.toString());
}, "cde");
```

我们在`page3.js`中通过`require.ensure([], function(){}, chunkName)`创建了一个代码分离点，`require.ensure(dependencies, callback, chunkName)`方法能够保证`dependencies`这些依赖可以在`callback`回调中同步加载require，Webpack会将`c.js`、`d.js`、`e.js`一起打包形成一个新的normal chunk文件（这个文件有可能很大），在浏览器中，满足某些条件的情况下，我们的代码会运行到分离点处时，此时Webpack就会异步加载之前打包生成的normal chunk文件，这样就实现了将某些功能从首屏资源文件中拆分出去，在浏览器中根据用户操作按需动态加载资源文件，这样可以加快首屏显示的速度，提升用户体验。

`require.ensure(dependencies, callback, chunkName)`方法中的`dependencies`可以保留空数组[]，Webpack一样能智能地分析`callback`回调方法，从中找出`callback`回调中需要同步加载的资源文件并打包成normal chunck。

`require.ensure(dependencies, callback, chunkName)`方法最后有一个可选的`chunkName`参数，通过该参数可以给新生成的normal chunk设置chunk name，给其设置chunk name有两个好处：
 - 可以通过`output.chunkName`配置为`[name]`设置生成的normal chunk的文件名
 - 具有相同chunk name的多个normal chunk会合并为一个文件

修改`webpack.config.js`，配置如下所示：
```
entry: "./src/page3.js",
output: {
    path: path.join(__dirname, "buildOutput"),
    filename: "page3.bundle.js",
    chunkFilename: "[id].[name].js"
}
```

执行npm start进行打包，在`buildOutput`目录下生成打包文件`page3.bundle.js`和`1.cde.bundle.js`。

`page3.bundle.js`包含了`webpack runtime`和代码分离点处callback回调内部的代码逻辑，但是不包含`c.js`、`d.js`和`e.js`。`1.cde.bundle.js`中包含了`c.js`、`d.js`和`e.js`的代码，不包含`webpack runtime`。

即
```
page3.bundle.js = webpack runtime + 异步callback逻辑

1.cde.bundle.js = `c.js` + `d.js` + `e.js`

```

`page3.bundle.js`部分代码截图如下所示：
<div align="center">
    <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/webpack-code-splitting/images/page3.bundle.js.png" />
</div>

在`page3.js`创建代码分离点的时，如果我们不传入chunkName参数，那么最终通过`chunkFilename: "[id].[name].js"`生成的normal chunk的文件名为`1.1.js`，可读性较差。

从上面的例子中我们可以看到通过`require.ensure()`方法可以异步加载CommonJS和ES6模块资源文件。其实通过`require(dependencies, callback)`也可以异步加载AMD模块，例如：
```
require(["module-a", "module-b"], function(a, b) {
  // ...
});
```
这种写法跟`require.js`中异步按需动态加载AMD模块的方式很类似，在此不再赘述。

## 3. 总结
1. chunk分为entry chunk和normal chunk。

2. entry chunk是入口文件，在不考虑Code Splitting的情况下，single entry只会生成一个chunk，即一个entry chunk，可通过`output.fileName`指定输出的文件名。 如果single entry中有代码分离点，那么需要通过`output.chunkName`设置新生成的normal chunk文件名。multiple entry会产生多个entry chunk，需要通过`ouput.chunkName`指定各个chunk的文件名。一般情况下，entry chunk = webpack runtime + modules.

3. normal chunk一般是被entry chunk在运行时动态加载的文件，通过代码`require.ensure([], function(...){})`或`require([amd1, amd2], function(amd1, amd2){})`可以设置代码的分离点(Code Splitting Point)，Webpack会将其创建一个新的normal chunk。一般情况下，normal chunk不包含webpack runtime，只包含一些modules代码。生成的normal chunk的文件名可以通过`output.chunkName`设定，在代码分离点处我们可以传入一个chunk name以便在`output.chunkName`中使用`[name]`作为输出的文件名。