本文将介绍React相关的技术栈，以及各个技术相应使命。

## [React](https://facebook.github.io/react/)
前端最重要的功能就是UI展示，而展示UI最重要的途径就是更新DOM树。打开一个前端项目，你会看到无处不充斥着更改DOM的代码，随意、凌乱甚至丑陋！于是，我们的业务逻辑被大片的DOM操作所掩盖，业务逻辑与DOM纷繁交杂，代码的可读性及可维护性没有保障。

React（又称React.js、ReactJS，本教程统称React）就是为了解决以上问题而诞生的，它可以让我们更关注于业务逻辑本身。

React由Facebook的软件工程师Jordan Walke创建，其灵感来源于PHP的HTML组件框架XHP。该框架首先于2011年部署于Facebook的newsfeed,随后于2012年部署于Instagram。它于2013年5月在JSConf US开源。

React与Angular、Ember等框架不同，它不是完整的`MV*`框架，它专注于提供清晰的View层解决方案。React的宣传口号就是`A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES`。React将UI抽象成一个个的Component（组件），每个Component都是由对应的State（状态）控制UI的，State可以是我们的业务数据，当我们需要更新UI时，我们不需要直接更新Component的DOM结构，我们只需要更新Component的State即可，当Component的State变化的时候，Component会根据State的状态自动渲染DOM树，并且React在渲染的过程中引入了Virtual Dom(虚拟DOM)的概念，React并不直接操作真实的DOM，而是更新Virtual DOM，通过比较两个状态前后Virtual DOM的差异而得到最终要修改的DOM，这样React会以最小的代价操作DOM，减少不必要的DOM操作，提升效率。

React为前端开发人员提供了一种新的思路，它的业务流程是`业务逻辑 -> setState() -> State -> render() -> Virtual DOM -> Real DOM -> UI`，我们只需要通过业务逻辑更新Component的State，最终React会帮我们高效地完成DOM操作。

## [Babel](https://babeljs.io/)
我们在[前端发展简史](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/web-brief-history#ecmascript6)中曾讲到ECMAScript 2015（ECMAScript 6）和ECMAScript 2016标准已经发布。这两个版本的ECMAScript（尤其是ECMAScript 6）为ECMAScript增加了许多新特性，极大拓展了JavaScript语法和能力，以至于许多浏览器都只能支持部分ES6中的新特性。随之，Babel和TypeScript逐渐流行起来，编写ES6代码，然后用Babel或TypeScript将其编译为ES5等主流浏览器支持的JavaScript。

本教程以Babel为主，也会涉及一些TypeScript的内容。

Babel的口号是`Babel is a compiler for writing next generation JavaScript`。

新的前端项目一般都用Babel或TypeScript编写，这样可以利用下一代JavaScript的各种语法糖，更加精简高效的完成工作。Babel提供了几十种插件用以将ES6和ES7的语法转换成ES5等语言，可以单独引入某几种插件。Babel还将多种插件组合成一组，形成一个preset，比如将ES2015相关的插件组合成了es2015这个preset，在使用的时候只需要引入es2015这个preset，就可以玩转ES2015所有的语法糖。React提供了一种`JSX`语法，该语法可以将HTML与JavaScript混写，浏览器本身是不支持`JSX`语法的。为此，Babel提供了`react`这个preset，用于将Ract的`JSX`代码编译成普通的JavaScript。TypeScript也支持`JSX`语法。

有了Babel，我们再也不同担心JavaScript语法的兼容性问题了。

## Webpack

## Redux


## 参考

[1] Wikipedia, [React](https://en.wikipedia.org/wiki/React_(JavaScript_library))