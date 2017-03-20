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