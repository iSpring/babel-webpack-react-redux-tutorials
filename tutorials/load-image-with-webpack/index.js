import "./index.css";

import githubPng from "./images/github.png";
import webpackPng from "./images/webpack.png";

// const github = require("./images/github.png");
const img1 = document.createElement("img");
img1.src = githubPng;
document.body.appendChild(img1);
console.log(githubPng);

// const webpack = require("./images/webpack.png");
const img2 = document.createElement("img");
img2.src = webpackPng;
document.body.appendChild(img2);
console.log(webpackPng);

const npmSvg = require("./images/npm.svg");
const img3 = document.createElement("img");
img3.src = npmSvg;
document.body.appendChild(img3);
console.log(npmSvg);