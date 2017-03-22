var a = require("./a");
var b = require("./b");

console.log(a);
console.log(b);

require.ensure([], function(require) {
    var c = require("./c");
    var d = require("./d");
    console.log(c);
    console.log(d);
});