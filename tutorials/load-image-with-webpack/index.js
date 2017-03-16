import "./index.css";

import github from "./images/github.png";
import webpack from "./images/webpack.png";

// const github = require("./images/github.png");
const img1 = document.createElement("img");
img1.src = github;
document.body.appendChild(img1);
console.log(github);

// const webpack = require("./images/webpack.png");
const img2 = document.createElement("img");
img2.src = webpack;
document.body.appendChild(img2);
console.log(webpack);