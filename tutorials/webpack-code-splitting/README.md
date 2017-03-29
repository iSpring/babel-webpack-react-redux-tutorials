# Webpack Code Splitting

对于大型Web项目来说，把所有代码打包成一个JavaScript文件并不明智，因为这会导致生成的`bundle.js`非常庞大，需要花费更多的时间来加载它，导致用户体验下降。本文将介绍Webpack强大的代码分离(Code Splitting)功能，通过该特性我们可以将一个`bundler.js`文件拆分为多个chunk文件，实现在运行时按需异步加载相关资源。本文将从chunk的角度讲解Webpack的代码分离特性。

项目目录结构如下所示：
```
Project
  |--buildOutput
  |--node_modules
  |--.babelrc
  |--package.json
  |--README.md
  |--webpack.config.js
  |--src
     |--a.js
     |--b.js
     |--c.js
     |--d.js
     |--page1.js
     |--page2.js
     |--page3.js
```

`a.js`文件如下所示：
```
module.exports = "module a";
```

`b.js`文件如下所示：
```
module.exports = "module b";
```

`c.js`文件如下所示：
```
module.exports = "module c";
```

`d.js`文件如下所示：
```
module.exports = "module d";
```

如上所示，`a.js`、`b.js`、`c.js`、`d.js`这四个文件都是普通的CommonJS模块。

`page1.js`文件如下所示：
```
import a from "./a.js";
import b from "./b.js";

console.log("module a: ", a);
console.log("module b: ", b);
```

`page2.js`文件如下所示：
```
import c from "./c.js";
import d from "./d.js";

console.log("module c: ", c);
console.log("module d: ", d);
```

`page3.js`文件如下所示：
```
import a from "./a.js";
import b from "./b.js";

console.log("module a: ", a);
console.log("module b: ", b);

require.ensure(["./c.js", "./d.js"], function(){
  const c = require("./c.js");
  const d = require("./d.js");
  console.log("module c: ", c);
  console.log("module d: ", d);
}, "cd");
```

## entry chunk

## normal chunk