# [使用Flow进行静态类型检查](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/babel-flow-type/README.md)

<div align="center">
  <img src="https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/babel-flow-type/images/flow.png">
</div>

JavaScript是一门动态语言，它不像Java或C#等静态语言那样在编译期就可以知道变量类型。JavaScript是解释执行的，浏览器或Node.js在运行到某一行代码的时候才能确定该变量的具体类型。JavaScript动态语言的特性使得开发者可以灵活使用该语言，但是也使得构建大型Web应用更加困难，因为我们要确保传递的实参的类型与函数签名中形参的类型相一致。这种问题很难单纯靠开发者Code Review解决，为此Facebook开源了[Flow](https://flowtype.org/)，用于对JavaScript进行静态类型检查。

## Flow使用基础
A STATIC TYPE CHECKER FOR JAVASCRIPT

要想使用Flow，首先要通过npm安装它：

```
npm install --save-dev flow-bin
```

然后我们在项目的根目录下添加一个名为`.flowconfig`的空文件。

然后在项目的`package.json`中添加名为`flow`的script，`package.json`如下所示：

```
{
    "name": "use-flow-type",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "flow": "flow"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "flow-bin": "^0.41.0"
    }
}
```

### Flow示例1：Hello Flow
然后在`src`目录下添加了一个名为`example.js`的文件，代码如下所示：

```
/*@flow*/

(function() {
    function foo(x) {
        return x * 10;
    }

    foo('Hello, world!');
});
```

然后我们在根目录下运行`npm run flow`，输出错误如下：

<p align="center">
  <img src="https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/babel-flow-type/images/error1.png">
</p>

Flow判断出上面`fool(x)`期待的形参x是`number`类型，但是实际传入的确实`string`类型，因此报错。

需要注意的是，如果想让Flow对文件进行静态类型检查，那么必须在文件的首行加入`/*@flow*/`或`//@flow`的注释。如果没有该注释，Flow默认不会对该文件进行静态类型检查。

### Flow示例2：添加类型声明

Flow允许我们像静态语言那样显式地指定变量的类型，修改`example.js`，为函数的形参和返回值都指定静态类型，代码如下所示：

```
/*@flow*/

(function() {
    function foo(x: string, y: number): string {
        return x.length * y;
    }

    foo('Hello', 42);
});
```

我们通过设置`x: string`指定了形参x是`string`类型，通过设置`y: number`指定了形参y是`number`类型，并且通过`function foo(...): string`指定了foo函数的返回值是`string`类型。

执行`npm run flow`，输出错误如下：

<p align="center">
  <img src="https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/babel-flow-type/images/error2.png">
</p>

这是因为`return x.length * y`返回的实际值类型应该是`number`，而`function foo(): string`却声明返回的是`string`类型，所以报错。此处将方法签名改为`function foo(x: string, y: number): number`即可。

Flow支持如下内建的type类型：

 - [boolean](https://flowtype.org/docs/builtins.html#boolean) 声明布尔类型的变量，例如`var a: boolean = true;`。

 - [number](https://flowtype.org/docs/builtins.html#number) 声明数字类型的变量，例如`var a: number = 100;`。

 - [string](https://flowtype.org/docs/builtins.html#string) 声明字符串类型的变量，例如`var a: string = "Hello World !";`。

 - [null](https://flowtype.org/docs/builtins.html#null-and-void) 声明`null`类型的变量，例如`var a: null = null;`。

 - [void](https://flowtype.org/docs/builtins.html#null-and-void) 声明`undefined`类型的变量，例如`var a: void = undefined;`，也经常用`void`表示某函数无返回值。

 - [any](https://flowtype.org/docs/builtins.html#any) 声明的变量为任意类型，如果某个方法的形参有可能是多种值类型，那么我们就可以将这个形参声明为`any`。当将某个变量声明为`any`类型时，Flow不会对该变量进行静态类型检查，例如以下代码是没有错误的：

   ```
   function foo(i: any) {
        return i * 100 + i.length;
    }
   ```

   我们在开发中应该尽量避免使用`any`类型，否则有可能造成Flow忽略对必要变量的类型检查。

 - [mixed](https://flowtype.org/docs/builtins.html#mixed) 声明的变量为混合类型，`mixed`和`any`类型很像，但是二者存在区别。`any`类型的变量既可以被任意其他类型的变量赋值，又可以赋值给其他任意类型的变量。`mixed`类型的变量也可以被任意其他类型的变量赋值，但是不能赋值给其他类型的变量（其他类型的变量为`mixed`或`any`的情况除外）。

   如下代码可以通过Flow检查，没有错误：
   ```
   /*@flow*/

    var num: number = 0;
    var anyValue: any = 1;
    var mixedValue: mixed = 2;
    anyValue = num;
    mixedValue = num;
   ```
   如下代码最后一行存在静态类型错误：
   ```
   /*@flow*/

    var num: number = 0;
    var anyValue: any = 1;
    var mixedValue: mixed = 2;
    num = anyValue;
    num = mixedValue; //=>静态类型错误
   ```
   `mixed`类型的变量只能赋值给`mixed`和`any`类型的变量，不能给`boolean`、`number`、`string`、`null`、`void`类型的变量赋值，`any`类型的变量不存在这个限制，可以给任何类型的变量赋值。

 - [字面量枚举](https://flowtype.org/docs/builtins.html#literal-types) Flow允许我们定义枚举类型的变量，而且枚举类型的值可以是不同的类型，通过`type`声明字面量枚举，然后通过`|`将不同值连接起来。代码如下所示：
    ```
    /*@flow*/

    type Color = | [255, 0, 0] | "green" | "blue";

    var color1: Color = [255, 0, 0]; //没有错误
    var color2: Color = "green"; //没有错误
    var color3: Color = "yellow"; //静态类型错误
    ```
    我们定义了Color这一字面量枚举，用Color声明的变量只能取上面三个固定值中的一个：[255, 0, 0] 或 "green" 或 "blue"。

### Flow示例3：数组

Flow不仅可以指定变量属于哪个原子类型（例如`number`、`string`等），还可以为数组指定静态类型，修改`example.js`代码如下所示：

```
/*@flow*/

function total(numbers: Array<number>) {
    var result = 0;
    for (var i = 0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result;
}

total([1, 2, 3, 'Hello']);
```

执行`npm run flow`，输出错误如下：

<p align="center">
  <img src="https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/babel-flow-type/images/error3.png">
</p>

我们将`total(numbers)`方法中的numbers形参声明为Array<number>，表示numbers是一个数字数组，但是实际传入的实参[1, 2, 3, 'Hello']中包含字符串`Hello`，所以报错。

## .flowconfig
默认情况下，Flow会对[.flowconfig](https://flowtype.org/docs/advanced-configuration.html)所在目录下所有首行包含`/*@flow*/`或`//@flow`的文件进行静态类型检查。

我们可以在.flowconfig中通过指定`[include]`额外指定Flow要进行类型检查的文件路径或目录路径，这些路径既可以是相对于当前项目的相对路径，也可以是绝对路径。

假设我们的项目在电脑上的物理路径是/root/MyProject/，.flowconfig在MyProject目录下，且配置如下所示：
```
[include]
../externalFile.js
../externalDir/
../otherProject/*.js
../otherProject/**/coolStuff/
```
`../externalFile.js`表示Flow要对`/root/externalFile.js`进行类型检查。
`../externalDir/`表示Flow要对`/root/externalDir/`目录进行类型检查。
`../otherProject/*.js`表示Flow要对`/root/otherProject/`目录下的直接子文件中的JavaScript文件进行类型检查，不会检查再下一级目录中的JavaScript文件。
`../otherProject/**/coolStuff/`表示要对`/root/otherProject/`目录下所有名为`coolStuff`目录进行类型检查。

`*`表示通配符，表示任意文件名，`**`表示任意路径。

.flowconfig中还可以指定`[ignore]`设置要忽略检查的文件和目录，这些文件和目录是通过设置正则表达式进行匹配的，并且这些正则表达式匹配的都是绝对路径，所以大部分情况下正则表达式要以`.*`开头。如果某个文件同时被设置为`[include]`和`[ignore]`，那么这个文件最终会被Flow忽略类型检查。

假设.flowconfig中[ignore]配置如下：
```
[ignore]
.*/tests/.*
.*/src/\(foo\|bar\)/.*
.*\.ignore\.js
```

`.*/tests/.*`表示Flow会忽略所有名为`tests`的目录。
`.*/src/\(foo\|bar\)/.*`表示Flow会忽略`.*/src/foo`目录和`.*/src/bar`目录。
`.*\.ignore\.js`表示Flow会忽略所有名为`.ignore.js`的文件。

从Flow `v0.23.0`版本开始，我们可以在正则表达式中使用`<PROJECT_ROOT>`占位符，假设配置如下：
```
[ignore]
<PROJECT_ROOT>/node_modules
<PROJECT_ROOT>/buildOutput
```

Flow将会忽略`/root/MyProject/node_modules`和`/root/MyProject/buildOutput`两个目录。

我们简单列举了一些Flow常用的使用场景，关于更多Flow的信息可参见[Getting started with Flow](https://flowtype.org/docs/getting-started.html)。


## Babel与Flow结合使用
有一点要明确的是，Babel本身不认识Flow的语法，比如一个函数中定义如下：
```
/*@flow*/

function square(n: number) {
    return n * n;
}
square(50);
```
虽然上述函数满足`Flow`的类型检查，但是Bable不认识`n: number`这种语法，所以当执行`babel src -d buildOutput`时，Babel就以无法解析这种Flow的类型定义语法为而报错。

为此，我们需要安装能够解析Flow语法的插件：

```
npm install --save-dev babel-plugin-syntax-flow
```

然后我们将`syntax-flow`添加到`.babelrc`的`plugins`数组中，如下所示：

```
{
    "presets": [],
    "plugins": ["syntax-flow"]
}
```

需要注意的是，安装了[syntax-flow](https://babeljs.io/docs/plugins/syntax-flow/)这一插件之后，在执行`babel src -d buildOutput`的时候也不会对代码用Flow进行静态类型检查，这是因为`syntax-flow`插件只是让Babel认识静态类型语法，而不是去检查静态类型是否正确，我们还是应该用Flow去进行检查。

我们修改`example.js`代码如下所示：

```
/*@flow*/

function square(n: number) {
    return n * n;
}
square("Hello World!"); //静态类型错误
```

`.babelrc`中只使用了`syntax-flow`这个插件，此时执行`babel src -d buildOutput`没有得到静态语法错误，`buildOutput/example.js`输出结果如下：

```
/*@flow*/

function square(n: number) {
    return n * n;
}
square("Hello World!");
```

这不满足我们的实际需求，为了能够在build的过程中使用Flow进行静态类型检查，我们修改一下`package.json`中的`scripts`脚本，如下所示：

```
"scripts": {
    "clear": "rimraf buildOutput",
    "flow": "flow",
    "prebuild": "npm run clear && npm run flow",
    "build": "babel src -d buildOutput"
}
```

当我们执行`npm run build`时，由于npm script的hook机制，会首先自动执行`npm run prebuild`。在prebuild这一脚本中，我们先通过`npm run clear`执行build前的清理工作，删除buildOutput目录，在clear脚本执行完成后才执行`npm run flow`，flow脚本会根据`.flowconfig`对项目中的文件进行静态类型检查。当Flow检查到`src/example.js`中存在静态类型错误时，会终止脚本的执行，导致npm script中断，这样就保证了只有`npm run flow`通过之后，`npm run build`才能继续，从而保证了代码质量。

即上述`npm run build`的具体执行过程如下所示：

```
rimraf buildOutput => flow => babel src -d buildOutput
```

我们修改`example.js`中的代码，如下所示：

```
/*@flow*/

function square(n: number) {
    return n * n;
}
square(50);
```

再次执行`npm run build`，至此可以成功输出`buildOutput/example.js`，输出结果如下所示：

```
/*@flow*/

function square(n: number) {
    return n * n;
}
square(50);
```

你会发现输出结果中依然保留着`n: number`这样的静态类型语法，但是浏览器和Node.js环境都不认识这种语法，这样的代码还是不可用的。

为此我们可以安装[transform-flow-strip-types](https://babeljs.io/docs/plugins/transform-flow-strip-types/)插件：

```
npm install --save-dev babel-plugin-transform-flow-strip-types
```

然后向`.babelrc`中添加该插件，如下所示：

```
{
    "presets": [],
    "plugins": ["syntax-flow", "transform-flow-strip-types"]
}
```

`transform-flow-strip-types`插件能够删除输出结果中静态类型的语法，例如可以将`n: number`转换为`n`。

我们再次执行`npm run build`，`buildOutput/example.js`输出如下所示：

```
/*@flow*/

function square(n) {
    return n * n;
}
square(50);
```

这次输出结果中静态类型语法没有了，完美！

我们最终的`package.json`如下所示：
```
{
    "name": "babel-flow-type",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "clear": "rimraf buildOutput",
        "flow": "flow",
        "prebuild": "npm run clear && npm run flow",
        "build": "babel src -d buildOutput"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-cli": "^6.23.0",
        "babel-plugin-syntax-flow": "^6.18.0",
        "babel-plugin-transform-flow-strip-types": "^6.22.0",
        "rimraf": "^2.6.1"
    },
    "dependencies": {
        "flow-bin": "^0.41.0"
    }
}
```

`.babelrc`配置如下所示：
```
{
    "presets": [],
    "plugins": ["syntax-flow", "transform-flow-strip-types"]
}
```

`.flowconfig`配置如下所示：
```
[ignore]
<PROJECT_ROOT>/node_modules
<PROJECT_ROOT>/buildOutput
```
至此，我们就完美地将Flow与Babel结合在一起使用了。
