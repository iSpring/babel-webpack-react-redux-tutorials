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