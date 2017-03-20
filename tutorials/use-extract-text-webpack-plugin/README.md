<div align="center">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/plugin.svg">
    <img width="200" height="200" src="https://cdn.rawgit.com/iSpring/babel-webpack-react-redux-tutorials/master/tutorials/use-extract-text-webpack-plugin/images/webpack.svg">
</div>

# 使用ExtractTextWebpackPlugin分离CSS
我们在上一篇[《使用Webpack和PostCSS加载CSS、SASS、LESS资源》](https://github.com/iSpring/babel-webpack-react-redux-tutorials/blob/master/tutorials/load-css-with-webpack/README.md)中介绍了如何使用Webpack加载CSS、SASS、LESS等相关资源以及如何将PostCSS整合进入Webpack构建过程，在那篇课程中我们将CSS相关资源打包成了一个JavaScript文件。

将多个CSS文件打包成一个JavaScript文件存在如下问题：
 1.


本文将介绍如何从JavaScript文件中分离出CSS资源并将多个CSS资源打包成一个CSS文件。

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
