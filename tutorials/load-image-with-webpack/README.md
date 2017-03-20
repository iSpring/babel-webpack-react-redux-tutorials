# 使用Webpack加载图片和SVG

本节将探讨如何使用[file-loader](https://github.com/webpack-contrib/file-loader)和[url-loader](https://github.com/webpack-contrib/url-loader)打包图片和SVG等资源。

本文项目最终结构如下所示：
```
Project
  |--buildOutput
  |--images
  |  |--github.png
  |  |--webpack.png
  |  |--star.png
  |  |--npm.svg
  |
  |--node_modules
  |--.babelrc
  |--index.html
  |--index.js
  |--index.css
  |--package.json
  |--README.md
  |--webpack.config.js
```

`index.html`如下所示：
```
<!DOCTYPE html>
<html>

<head>
    <title>Webpack</title>
</head>

<body>
    <div id="star"></div>
</body>
<script type="text/javascript" src="buildOutput/bundle.js"></script>

</html>
```

`index.css`文件如下所示：
```
#star {
    width: 48px;
    height: 48px;
    background: url(images/star.png) no-repeat center;
}

img {
    display: block;
    max-width: 250px;
}
```

`index.js`文件如下所示：
```
import "./index.css";

import githubPng from "./images/github.png";// <=> const github = require("./images/github.png");
import webpackPng from "./images/webpack.png";// <=> const webpack = require("./images/webpack.png");
import npmSvg from "./images/npm.svg";// <=> const npmSvg = require("./images/npm.svg");

const img1 = document.createElement("img");
img1.src = githubPng;
document.body.appendChild(img1);
console.log(githubPng);

const img2 = document.createElement("img");
img2.src = webpackPng;
document.body.appendChild(img2);
console.log(webpackPng);

const img3 = document.createElement("img");
img3.src = npmSvg;
document.body.appendChild(img3);
console.log(npmSvg);
```