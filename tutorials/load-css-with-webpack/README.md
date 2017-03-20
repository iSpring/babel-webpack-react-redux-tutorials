# [使用Webpack加载CSS、SASS、LESS资源并集成PostCSS](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)

<p align="center">
  <img with="80%" src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-css-with-webpack/images/CSS.png" />
</p>

本节将探讨如何使用Webpack加载CSS、SASS、LESS等资源，并结合PostCSS进行CSS后处理。

具体涉及到以下npm包：

 - style-loader
 - css-loader
 - less-loader
 - node-sass
 - sass-loader
 - postcss-loader
 - autoprefixer
 - precss

本文项目最终结构如下所示：
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
<p>
  <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-css-with-webpack/images/1.png" />
</p>

由此可见，index.html已经使用了`a.css`中的样式。

## 使用Webpack加载SASS
与CSS相比，[SASS](http://sass-lang.com/guide)更加强大。SASS是一个CSS预处理器，在SASS中我们可以通过使用变量、嵌套、混合、继承等对CSS进行处理。SASS文件有两种类型的后缀名：`.sass`和`.scss`。`.sass`文件内部使用缩进来确定CSS层级关系，`.scss`使用花括号来确定CSS层级关系，`.scss`更接近原生CSS语法格式。SASS可以将`.sass`和`.scss`文件编译为原生的`.css`文件。

b.scss如下所示：
```
$green-color: green;
#p2 {
    color: $green-color;
}
```

我们在`b.scss`中使用了SASS的变量这一特性，我们修改`index.js`，在其中引入`b.scss`，`index.js`如下所示：
```
import './css/a.css';
import './css/b.scss';

console.log("index.js");
```

修改`index.html`，如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
</head>

<body>
    <p id="p1">字体样式来自于a.css</p>
    <p id="p2">字体样式来自于b.scss</p>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```

为了能够将`.scss`文件编译为`.css`文件，我们需要安装`node-sass`。为了能够在Webpack中集成SASS，我们还需要安装`sass-loader`。
```
npm install --save-dev node-sass sass-loader
```

我们需要在webpack.config.js中为`.scss`文件设置对应的loader，新增如下配置：
```
{
    test: /\.scss$/,
    loader: 'style!css!sass'
}
```

我们对`.scss`设置的loader是`style!css!sass`，等价于`loaders: ['style-loader', 'css-loader', 'sass-loader']`，也就是对于`.scss`文件的处理流程是：
```
sass-loader -> css-loader -> style-loader
```

此时webpack.config.js的整个配置如下：
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
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    }
};
```

执行`npm start`进行打包，输出结果还是JavaScript文件`buildOutput/bundle.js`，其中内联了`a.css`和`b.scss`中的样式，只不过`b.scss`中的样式已经被编译成了CSS格式。

我们直接双击打开`index.html`文件，UI如下所示：
<p>
  <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-css-with-webpack/images/2.png" />
</p>

由此可见，`index.html`已经使用了`b.scss`中的样式。

## 使用Webpack加载LESS
[LESS](http://lesscss.org/)是另一个CSS预处理器，具有跟SASS类似的功能。LESS文件的后缀名是`.less`，LESS可以将`.less`文件编译为普通的CSS文件。

`c.less`文件如下所示：
```
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#p3{
    color: @light-blue;
}
```

我们在`c.less`文件中使用了变量和操作符`+`这两个特性。我们修改`index.js`，在其中引入`b.scss`，`index.js`如下所示：
```
import './css/a.css';
import './css/b.scss';
import './css/c.less';

console.log("index.js");
```

为了能够将`.less`文件编译为`.css`文件，我们需要安装`less`。为了能够在Webpack中集成LESS，我们还需要安装`less-loader`。

```
npm install --save-dev less less-loader
```

我们需要在webpack.config.js中为.scss文件设置对应的loader，新增如下配置：
```
{
    test: /\.less$/,
    loader: 'style!css!less'
}
```

我们对`.less`设置的loader是`style!css!less`，等价于`loaders: ['style-loader', 'css-loader', 'sass-loader']`，也就是对于`.less`文件的处理流程是：
```
less-loader -> css-loader -> style-loader
```

此时webpack.config.js的整个配置如下：
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
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    }
};
```

执行`npm start`进行打包，输出结果还是JavaScript文件`buildOutput/bundle.js`，其中内联了`a.css`、`b.scss`和`c.less`中的样式，只不过`b.scss`和`c.less`中的样式已经被编译成了CSS格式。

我们直接双击打开index.html文件，UI如下所示：
<p>
  <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-css-with-webpack/images/3.png" />
</p>

由此可见，`index.html`已经使用了`c.less`中的样式。

## 在Webpack中使用PostCSS
SASS和LESS都是CSS预处理器，只能对CSS进行预处理。[PostCSS](http://postcss.org/)可以对CSS进行后处理，可以把它当做CSS后处理器使用。所谓的后处理就是对原生的CSS进行一定的修改增强，比如有些CSS在不同的浏览器下需要添加`-webkit`、`-moz`、`-ms`等前缀，通过PostCSS就可以自定添加这些前缀，使得我们的CSS兼容更多的浏览器。

其实PostCSS不仅可以用作后处理器，还可以用作预处理器。也就是说，PostCSS完全可以实现SASS、LESS的功能。PostCSS = CSS预处理器 + CSS后处理器。

PostCSS本身不提供任何CSS预处理和后处理的功能，PostCSS提供了很多插件，使用不同的插件可以实现不同的CSS预处理或后处理功能，本文将介绍基于PostCSS的[precss](https://github.com/jonathantneal/precss)插件和[autoprefixer](https://github.com/postcss/autoprefixer)插件。

`d.css`文件如下所示：
```
p{
    float: left;
    clear: both;
    padding: 10px;
    font-size: 24px;
}

/*@define-mixin会使用press插件*/
@define-mixin shadow $blur {
    box-shadow: 5px 5px $blur;
}

@define-mixin gradient $startColor, $endColor{
    /*linear-gradient会使用到autoprefixer插件*/
    background: linear-gradient(to right, $startColor, $endColor);
}

#p1 {
    @mixin shadow 3px;
    @mixin gradient #FFC107, green;
}

#p2 {
    @mixin shadow 5px;
    @mixin gradient #FFC107, #03A9F4;
}

#p3 {
    @mixin shadow 10px;
    @mixin gradient #FFC107, #FF5722;
}
```

我们在`d.css`中使用了`@define-mixin`、变量以及`@mixin`语法，这些语法其实都是PostCSS的precss插件支持的。`linear-gradient`是CSS3支持的属性，但是不同浏览器的支持程度不同，为了兼容主流浏览器，我们需要添加各种浏览器前缀，但是在`d.css`中我们并没有这样做，这是因为我们可以通过使用PostCSS的autoprefixer插件进行CSS后处理，自动补齐对应的浏览器前缀。

我们修改`index.html`，如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
</head>

<body>
    <p id="p1">字体样式来自于a.css，背景样式来自于d.css</p>
    <p id="p2">字体样式来自于b.scss，背景样式来自于d.css</p>
    <p id="p3">字体样式来自于c.less，背景样式来自于d.css</p>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```

在`index.js`中引入`d.css`，`index.js`如下所示：
```
import './css/a.css';
import './css/b.scss';
import './css/c.less';
import './css/d.css';

console.log("index.js");
```

为了使用PostCSS，我们需要安装`postcss-loader`，为了使用插件precss和autoprefixer，我们也需要安装对应的npm包：
```
npm install --save-dev postcss-loader precss autoprefixer
```

PostCSS可以对CSS进行处理，由于SASS和LESS编译生成的也是CSS文件，所以PostCSS可以结合SASS和LESS使用，不过首先要使用SASS/LESS进行处理，之后才能使用PostCSS处理。

我们修改webpack.config.js中的loader，对`.css`、`.sass`、`.less`文件添加`postcss-loader`的处理流程，如下所示：
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
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
        }]
    }
};
```

`.css`文件的处理流程：
```
postcss-loader -> css-loader -> style-loader
```

`.sass`文件的处理流程：
```
sass-loader -> postcss-loader -> style-loader
```

`.less`文件的处理流程：
```
less-loader -> postcss-loader -> style-loader
```

上面的配置告诉Webpack在处理CSS相关的资源文件时要使用`postcss-loader`，但是PostCSS如何对这些文件进行处理呢？

我们需要在项目的根目录下添加`postcss.config.js`文件，配置如下：
```
module.exports = {
    plugins: [
        require("precss")(),
        require("autoprefixer")()
    ]
};
```

我们在其中配置了precss和autoprefixer这两个插件，`postcss-loader`会使使用这两个插件对CSS相关的资源文件进行预处理和后处理。

执行`npm start`进行打包，输出结果还是JavaScript文件`buildOutput/bundle.js`，其中内联了a.css、b.scss、c.less和d.css中的样式，只不过b.scss、c.less和d.css中的样式已经被编译成了CSS格式。

我们直接双击打开index.html文件，UI如下所示：
<p>
  <img src="https://rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/load-css-with-webpack/images/4.png" />
</p>

由此可见，`index.html`已经使用了`d.css`中的样式。

## 生成单独的CSS打包文件
我们之前将所有的css文件和`index.js`一起打包输出到了`buildOutput/bundle.js`中，然后在`index.html`中通过`<script>`标签加载该文件。

这样会存在一个潜在的问题：
 1. 如果我们将`<script src="buildOutput/bundle.js"></script>`放置到`<head>`标签内，那么文档还未加载完全，`index.js`中的JavaScript无法访问还未加载的DOM树（当然可以通过绑定load事件在做处理，那样会麻烦一些）。

 2. 如果我们将`<script src="buildOutput/bundle.js"></script>`放置到`</body>`标签后面，那时文档已经完全加载完，`index.js`中的JavaScript可以访问整个DOM树。但是，由于样式文件也被一起打包到了`bundle.js`中，所以且`bundle.js`是在document渲染完成之后才加载的，这会造成一开始打开网页时的document是没有任何样式的，后面`bundle.js`加载完之后突然换了另一种样式，这会造成闪顿的体验。

为了解决以上问题，我们应该将CSS和JavaScript分别打包到两个文件中。

首先我们在`index.js`中取消掉对CSS的引入，修改`index.js`如下所示：
```
// import './css/a.css';
// import './css/b.scss';
// import './css/c.less';
// import './css/d.css';

console.log("index.js");
```


我们需要修改webpack.config.js中的`entry`和`output`属性，配置如下所示：
```
var path = require("path");

module.exports = {
    entry: {
        js: "./index.js",
        css: ["./css/a.css", "./css/b.scss", "./css/c.less", "./css/d.css"]
    },

    output: {
        path: path.join(__dirname, "buildOutput"),
        filename: "[name].bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
        }]
    }
};
```

我们在`entry`中定义了两个入口：`js`和`css`，并在`output`中通过`[name].bundle.js`指定输出的文件名，此处的`[name]`就对应着`entry`中指定的两个入口的名称：`js`和`css`。

执行`npm start`进行打包，输出结果是两个JavaScript文件：`buildOutput/css.bundle.js`和`buildOutput/js.bundle.js`。`buildOutput/css.bundle.js`中包含了所有CSS文件内容，包括`a.css`、`b.sass`、`c.less`、`d.css`。
`buildOutput/js.bundle.js`中包含了`index.js`中JavaScript文件内容。这样，CSS和JavaScript的输出结果已经分离。

我们修改`index.html`如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
    <script type="text/javascript" src="buildOutput/css.bundle.js"></script>
</head>

<body>
    <p id="p1">字体样式来自于a.css，背景样式来自于d.css</p>
    <p id="p2">字体样式来自于b.scss，背景样式来自于d.css</p>
    <p id="p3">字体样式来自于c.less，背景样式来自于d.css</p>
</body>
<script type="text/javascript" src="buildOutput/js.bundle.js"></script>

</html>
```

我们在`index.html`的`<head>`标签中引入了`css.bundle.js`，这样在document文档加载完成之前就已经加载了所有的CSS样式。在`index.html`的`</body>`标签之后引入了`js.bundle.js`，这样在document文档加载完成之后才加载并执行JavaScript代码。
