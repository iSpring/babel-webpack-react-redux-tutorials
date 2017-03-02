本文将介绍React相关的技术栈，以及各个技术相应的使命。

## [React](https://facebook.github.io/react/)
A JavaScript Library for Building User Interfaces

前端最重要的功能就是UI展示，而展示UI最重要的途径就是更新DOM树。打开一个前端项目，你会看到无处不充斥着更改DOM的代码，随意、凌乱甚至丑陋！于是，我们的业务逻辑被大片的DOM操作所掩盖，业务逻辑与DOM纷繁交杂，代码的可读性及可维护性没有保障。

React（又称React.js、ReactJS，本教程统称React）就是为了解决以上问题而诞生的，它可以让我们更关注于业务逻辑本身。

React由Facebook的软件工程师Jordan Walke创建，其灵感来源于PHP的HTML组件框架XHP。该框架首先于2011年部署于Facebook的newsfeed,随后于2012年部署于Instagram。它于2013年5月在JSConf US开源。

React与Angular、Ember等框架不同，它不是完整的`MV*`框架，它是一个用于创建UI界面的JavaScript库，它专注于提供清晰的View层解决方案。React将UI抽象成一个个的Component（组件），每个Component都是由对应的State（状态）控制UI的，State可以是我们的业务数据，当我们需要更新UI时，我们不需要直接更新Component的DOM结构，我们只需要更新Component的State即可，当Component的State变化的时候，Component会根据State的状态自动渲染DOM树，并且React在渲染的过程中引入了Virtual Dom（虚拟DOM）的概念，React并不直接操作真实的DOM，而是更新Virtual DOM，通过比较两个状态前后Virtual DOM的差异而得到最终要修改的DOM，这样React会以最小的代价操作DOM，减少不必要的DOM操作，提升效率。

React为前端开发人员提供了一种新的思路，它的使用流程是:

```
业务数据 -> setState() -> State -> render() -> Virtual DOM -> Real DOM -> UI
```

我们只需要通过业务逻辑更新Component的State，最终React会帮我们高效地完成DOM操作。

## [Babel](https://babeljs.io/)
A Compiler for Writing Next Generation JavaScript

我们在[《前端发展简史》](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/web-brief-history#ecmascript6)中曾讲到ECMAScript 2015（ECMAScript 6）和ECMAScript 2016标准已经发布。这两个版本的ECMAScript（尤其是ECMAScript 6）为ECMAScript增加了许多新特性，极大拓展了JavaScript语法和能力，以至于许多浏览器都只能支持部分ES6中的新特性。随之，Babel和TypeScript逐渐流行起来，编写ES6代码，然后用Babel或TypeScript将其编译为ES5等主流浏览器支持的JavaScript。本教程以Babel为主，也会涉及部分TypeScript的内容。

新的前端项目一般都用Babel（或TypeScript）编写，这样可以利用下一代JavaScript的各种语法糖，更加精简高效的完成工作。Babel提供了几十种插件用以将ES6和ES7的诸多语法转换成ES5等语言。可以单独引入某几种插件使用，Babel还将多种插件组合成一组，形成一个preset，比如将ES2015相关的插件组合成了es2015这个preset，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。React提供了一种`JSX`语法，该语法可以将HTML与JavaScript混写，浏览器本身是不支持`JSX`语法的。为此，Babel提供了`react`这个preset，用于将Ract的`JSX`代码编译成普通的JavaScript。TypeScript也支持`JSX`语法。

Babel是下一代JavaScript编译器，有了Babel，我们再也不同担心JavaScript语法的兼容性问题了。

## [Webpack](https://webpack.github.io/)
A Bundler for JavaScript and Friends

现在前端项目越来越庞大，JavaScript、CSS文件、图片、JSON等各种文件杂乱堆砌，在前端我们可能需要不同的方式来加载不同的资源文件，比如通过创建`<script>`标签引入JavaScript，通过`<link>`标签引入CSS，通过`<img>`标签获取图片，通过AJAX请求获取JSON...

这样的处理对于小项目尚可接受，但是在一些庞大的单页应用（SPA）中这种资源加载的方式存在两个问题：

 - 为了加载某个模块就要严格保证该模块所依赖的其他资源都要加载，这就使得资源加载的顺序要严格控制，无形中增大了开发的难度。
 
 - 每个资源文件的加载都需要一次HTTP请求，加载多个小文件会导致触发浏览器最大链接并发数的限制，使得许多资源文件延迟加载，资源的下载速度下降。
 
幸运的是，Webpack可以解决这些难题。

Webpack，顾名思义，就是对Web资源进行打包，它是一个Web资源打包器，它可以将CommonJs、 AMD、 ES6 modules、 CSS、 图片、 JSON、 Coffeescript、 LESS等各种前端资源文件进行打包，打包成一个（或多个）JavaScript文件，这样我们在前端只需要引入一个打包好的bundler.js文件就可以了，这个文件里面包含了我们需要的全部资源信息，就是这么简单！

Webpack使用灵活，而且支持自定义资源打包，已经成为主流的前端资源打包平台。

## [Redux](http://redux.js.org/)
A Predictable State Container for JavaScript Apps

我们之前提到，React本身专注于View视图层的解决方案，React组件的输入是State，输出是UI，当项目变得复杂的时候，组件与组件之间的通信变得复杂而且逐渐不可维护。为了解决React中组件之间通信以及共享状态的问题，Redux诞生了。

Redux的使用流程是：
```
dispatch(action) -> Reducer -> new state -> render()
```

Redux为Web应用提供了一种可预测的状态容器，整个App有一个很大的State。它提供了一种单向的工作流，当发生某一事件时，发送特定类型的Action，Reducer接收到Action之后根据其`type`类型更新State，State更新后用React重新渲染UI。

纯`React + Redux`的技术方案中，React只是用来作为View展现层，React不负责任何业务逻辑，Redux则管理着业务层并通过React更新UI。

Redux的这种单向的工作流可以避免多个React组件共享状态出现混乱。除了React，你也可以将Redux与其他视图层的库结合使用。

## 总结
React专注于解决View视图层的问题，它需要搭配其他技术以实现一个完整的前端项目。

在React的组件中，我们编写ES6代码以及React的JSX语法代码，然后用Redux将不同的组件串接起来，形成完整的业务线。

用Babel将整个项目中的ES6以及JSX代码编译成ES5以向下兼容。

最后用Webpack将整个前端项目中的资源文件进行打包处理。

```
React + Babel + Webpack + Redux
```
这种React技术方案已经比较成熟，本教程也将围绕着这几种技术讲解React技术栈。