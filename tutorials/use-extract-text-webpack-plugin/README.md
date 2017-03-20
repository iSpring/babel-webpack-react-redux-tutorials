<div align="center">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/plugin.svg">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/webpack.svg">
</div>

# 使用ExtractTextWebpackPlugin分离CSS
我们在上一篇[《使用Webpack加载CSS、SASS、LESS资源并集成PostCSS》](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)中介绍了如何使用Webpack加载CSS、SASS、LESS等相关资源以及如何将PostCSS整合进入Webpack构建过程，在那篇课程中我们将CSS相关资源打包成了一个JavaScript文件`css.bundle.js`。

将多个CSS文件打包成一个JavaScript文件存在如下问题：
 1. 生成的`css.bundle.js`文件中存储了CSS字符串，在html页面中需要用用`<script>`标签引入该`css.bundle.js`文件，而且它会自动向该html文件中生成多个`<style>`标签，但是IE8等浏览器对document中的`<style>`标签有上线要求。所以这种自动注入`<style>`标签的方式兼容性不够，而且将CSS字符串转变成`<style>`标签也需要一定的解析执行的过程，速度有一定影响。
 2. 将原生的CSS文件打包成JavaScript文件时，会在生成的JavaScript文件中生成很多额外的函数用于在运行时将这些字符串注入成`<style>`标签。举例来说，一个1KB的未被压缩的CSS文件生成的对应的JavaScript文件大约有16KB，这导致了输出文件过于庞大，影响传输速度。

为了解决这两个问题，本文将介绍如何从JavaScript文件中分离出多有CSS资源并将这些CSS资源打包成一个CSS文件。

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

我们在`index.js`中引入了各种CSS文件，如下所示：
```
import './a.css';
import './b.scss';
import './c.less';
import './d.css';

console.log("index.js");
```
