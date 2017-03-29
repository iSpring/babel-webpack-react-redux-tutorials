import a from "./a.js";
import b from "./b.js";

console.log("module a: ", a);
console.log("module b: ", b);

require.ensure([], function() {
    const c = require("./c.js");
    const d = require("./d.js");
    const Person = require("./e.js");
    const person = new Person("ZhangSan", 28);
    console.log("module c: ", c);
    console.log("module d: ", d);
    console.log("person: ", person.toString());
}, "cde");