<p align="center">
  <img width="50%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/bundle-npm-packages-with-webpack/images/npm.png">
</p>

我们在[《使用Webpack加载ES6模块、ADM模块、CommonJS模块》](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/load-commonjs-amd-es6-modules-with-webpack)一文中学习了如何使用Webpack打包各种CommonJS模块、AMD模块以及ES6模块，我们在示例代码中演示的各种模块都是我们自己编写的。在实际项目中，我们需要依赖很多npm包，并且需要将这些npm模块通过Webpack打包到我们最终的输出文件中。

为了保持教程的连贯性，我们还是实现[《使用Webpack加载ES6模块、ADM模块、CommonJS模块》](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/load-commonjs-amd-es6-modules-with-webpack)中的相同功能，只不过这次只需要加载npm包中的模块。

我将之前教程中的ES6相关的模块打包，作为[myshape](https://www.npmjs.com/package/myshape)包发布到NPM平台，其结构如下所示：

```
myshape
  |-package.json
  |-index.js
  |-Shape.js
  |-Circle.js
  |-Rectangle.js
```

项目的`package.json`如下所示：
```
{
    "name": "bundle-npm-packages-with-webpack",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "clear": "rimraf buildOutput",
        "prebuild": "npm run clear",
        "build": "webpack",
        "start": "npm run build"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-core": "^6.18.2",
        "babel-loader": "^6.2.7",
        "babel-preset-es2015": "^6.18.0",
        "rimraf": "^2.5.4",
        "webpack": "^1.13.3"
    },
    "dependencies": {
        "myshape": "^0.1.0"
    }
}
```

需要通过`npm install`安装所需npm包。

项目的目录结构如下所示：
```
Project
  |-package.json
  |-.babelrc
  |-webpack.config.js
  |-index.html
  |-README.md
  |-node_modules
  |-buildOutput
  | |-bundle.js
  |-src
    |-main.js

```


webpack.config.js配置如下所示：
```
var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
        path: path.resolve(__dirname, "buildOutput"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    }
};
```

.babelrc配置如下所示：
```
{
  "presets": ["es2015"]
}
```

`src/main.js`是项目的入口文件，如下所示：

```
//引入NPM模块
import Circle from 'MyShape/Circle';
import Rectangle from 'MyShape/Rectangle';

const circle = new Circle(1);
const circleInfoString = circle.toString();
console.log(circleInfoString);
document.getElementById("circle").innerText = circleInfoString;

const rectangle = new Rectangle(2, 1);
const rectangleInfoString = rectangle.toString();
console.log(rectangleInfoString);
document.getElementById("rectangle").innerText = rectangleInfoString;
```

我们通过`import Circle from 'MyShape/Circle';`和`import Rectangle from 'MyShape/Rectangle';`引入了`MyShape`这个npm包中相应的模块，并最终通过webpack将其打包到了最终输出的bundle.js文件中。

本示例虽然比较简单，但是演示了如何在如果通过webpack加载并打包npm包中的模块资源到最终的输出文件中，几乎所有的项目都会使用这一模式，我们在以后的课程中也会通过这种方式将react打包到bundle.js中。