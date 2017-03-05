
## [babel-polyfill](http://babeljs.io/docs/usage/polyfill/)
我们之前一直强调ES6增加了新的语法特性，其实这种说法不严谨。严格来说，ES6相比于ES5新增了如下内容：

 - 新的语法特性，比如箭头函数、解构等

 - 新的API方法，比Object新增加了静态方法[Object.assign()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)、如Array新增加了静态方法[Array.from()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)等。

 - 新的全局对象，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等

默认情况下，Babel只会对ES6中的语法特性进行编译，而不会对新增的API方法以及新的全局对象进行处理。比如我们使用了ES6的`Object.assign()`方法或`Promise`类，这样默认情况下Babel编译出的代码会在不支持这两个特性的浏览器中会出现问题。为了解决这个问题，我们可以使用babel-polyfill。

首先通过npm引入[babel-polyfill]()：

```
npm install --save babel-polyfill
```

babel-polyfill可以模拟完整的ES6中的API环境，弥补缺失的API方法和全局对象。需要注意的是，在生产环境中，我们的项目是需要将babel-polyfill中的代码一起打包到最终发布的产品中的，所以通过npm安装的时候应该使用`--save`，而不是`--save-dev`等。

我们在源码文件的首行引入babel-polyfill：
```
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

如果结合webpack使用，我们可以在`webpack.config.js`配置文件中将`babel-polyfill`加入到入口数组中，如下所示：

```
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

这样Webpack就会将babel-polyfill打包到我们的产品代码中。关于Webpack我们会在后面的教程中详细介绍。