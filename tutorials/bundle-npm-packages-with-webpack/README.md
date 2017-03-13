<p align="center">
  <img width="50%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/bundle-npm-packages-with-webpack/images/npm.png">
</p>

我们在[《使用Webpack加载ES6模块、ADM模块、CommonJS模块》](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/load-commonjs-amd-es6-modules-with-webpack)一文中学习了如何使用Webpack打包各种CommonJS模块、AMD模块以及ES6模块，我们在示例代码中演示的各种模块都是我们自己编写的。在实际项目中，我们需要依赖很多npm包，并且需要将这些npm模块通过Webpack打包到我们最终的输出文件中。

为了保持教程的连贯性，我们还是实现[《使用Webpack加载ES6模块、ADM模块、CommonJS模块》](https://github.com/iSpring/react-step-by-step-tutorials/tree/master/tutorials/load-commonjs-amd-es6-modules-with-webpack)中的相同功能，只不过这次只需要加载npm包中的模块。

我将之前教程中的ES6相关的模块打包，作为[myshape](https://www.npmjs.com/package/myshape)包发布到NPM平台。