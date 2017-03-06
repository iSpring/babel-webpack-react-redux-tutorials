JavaScript是一门动态语言，它不像Java或C#等静态语言那样在编译器就可以知道变量类型。JavaScript是解释执行的，浏览器或Node.js在运行到某一行代码的时候才能确定该变量的具体类型。JavaScript动态语言的特性使得开发者可以灵活使用该语言，但是也使得构建大型Web应用更加困难，因为我们要确保传递的实参的类型与函数签名中形参的类型相一致。这种问题很难单纯靠开发者Code Review解决，为此Facebook开源了[Flow](https://flowtype.org/)，用于对JavaScript进行静态类型检查。

## Flow使用简介
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

### Flow示例1
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
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/babel-flow-type/images/error1.png">
</p>

Flow判断出上面`fool(x)`期待的形参x是`number`类型，但是实际传入的确实`string`类型，因此报错。

需要注意的是，如果想让Flow对文件进行静态类型检查，那么必须在文件的首行加入`/*@flow*/`或`//@flow`的注释。如果没有该注释，Flow默认不会对该文件进行静态类型检查。

### Flow示例2

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

我们再次执行`npm run flow`，输出错误如下：

<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/babel-flow-type/images/error2.png">
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

### Flow示例3


## Babel与Flow结合使用



examples
https://flowtype.org/docs/five-simple-examples.html

commands
https://flowtype.org/docs/new-project.html#_
flow check
flow
flow stop
flow check --all

types
https://flowtype.org/docs/builtins.html

Type Annotations
https://flowtype.org/docs/type-annotations.html#_

.flowconfig
https://flowtype.org/docs/advanced-configuration.html#_