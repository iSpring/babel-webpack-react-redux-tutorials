JavaScript是一门动态语言，它不像Java或C#等静态语言那样在编译器就可以知道变量类型。JavaScript是解释执行的，浏览器或Node.js在运行到某一行代码的时候才能确定该变量的具体类型。JavaScript动态语言的特性使得开发者可以灵活使用该语言，但是也使得构建大型Web应用更加困难，因为我们要确保传递的实参的类型与函数签名中形参的类型相一致。这种问题很难单纯靠开发者Code Review解决，为此Facebook开源了[Flow](https://flowtype.org/)，用于对JavaScript进行静态类型检查。

## Flow使用简介
A STATIC TYPE CHECKER FOR JAVASCRIPT

要想使用Flow，首先要通过npm安装它：

```
npm install --save-dev flow-bin
```

然后在项目的`package.json`中添加名为`flow`的script，如下所示：

```
"scripts": {
    "flow": "flow"
}
```

然后我们在项目的根目录下添加一个名为`.flowconfig`的空文件。


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

Flow判断出上面`fool(x)`的形参x期待是`number`类型，但是实际传入的确实`string`类型，因此报错。

需要注意的是，如果想让Flow对文件进行静态类型检查，那么必须在文件的首行加入`/*@flow*/`或`//@flow`的注释。如果没有该注释，Flow默认不会对该文件进行静态类型检查。

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