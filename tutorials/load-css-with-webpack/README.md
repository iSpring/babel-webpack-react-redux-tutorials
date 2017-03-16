<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/load-css-with-webpack/images/CSS.png" />
</p>

# 使用Webpack加载CSS、SASS、LESS

本节将探讨如何使用Webpack加载CSS、SASS、LESS等资源，并结合PostCSS进行CSS后处理。具体涉及到以下npm包：

 - style-loader
 - css-loader
 - less-loader
 - node-sass
 - sass-loader
 - postcss-loader
 - autoprefixer
 - precss

本文的Demo项目最终结构如下所示：
```
Project
  |--buildOutput
  |--css
  |  |--a.css
  |  |--b.scss
  |  |--c.less
  |  |--d.css
  |
  |--node_modules
  |--.babelrc
  |--browserslist
  |--index.html
  |--index.js
  |--package.json
  |--postcss.config.js
  |--README.md
  |--webpack.config.js
```

初始`index.html`如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
</head>

<body>
    <p id="p1">字体样式来自于a.css</p>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```

## 使用Webpack加载CSS

`a.css`样式如下：
```
#p1 {
    color: red;
}
```

我们想让index.html使用a.css的样式，于是我们在index.js中编写如下代码：
```
import './css/a.css';

console.log("index.js");
```

Webpack本身只能加载CommonJS模块、AMD模块等，但它不知道如何加载CSS文件，这时我们需要引入[css-loader](https://github.com/webpack-contrib/css-loader)和[style-loader](https://github.com/webpack-contrib/style-loader)这两个npm包：
```
npm install --save-dev css-loader style-loader
```

然后我们需要为`.css`扩展名配置`loader: 'style!css'`，webpack.config.js如下所示：
```
var path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'css'
        }]
    }
};
```

`loader: 'style!css'`等价于`loaders: ['style-loader', 'css-loader']`，也就是说我们同时使用了`css-loader`和`style-loader`对`.css`文件进行加载处理。

`css-loader`可以处理CSS文件中的`@import`和`url()`资源引用，并将CSS文件打包写入到JavaScript文件中，即将CSS文件中的内容内联到JavaScript文件中。`style-loader`的作用是将JavaScript输出文件中内联的CSS自动生成`<style>`标签并插入到浏览器的document中。

需要注意`style-loader`和`css-loader`的顺序，`css-loader`在右侧，表示先执行，之后再让`style-loader`执行，也就是`!`右侧的loader先执行，`!`左侧的loader后执行。

我们通过`npm start`进行打包，输出结果只有一个JavaScript文件`buildOutput/bundle.js`，其中内联了`a.css`中的样式，打开`bundle.js`可以查看到如下的内联CSS：
```
...

exports.push([module.id, "#p1 {\r\n    color: red;\r\n}", ""]);

...
```

我们直接双击打开`index.html`文件，UI如下所示：
<img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/load-css-with-webpack/images/1.png" />


## 使用Webpack加载SASS

## 使用Webpack加载LESS

## 在Webpack中使用PostCSS