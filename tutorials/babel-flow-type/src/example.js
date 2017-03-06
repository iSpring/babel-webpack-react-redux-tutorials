/*@flow*/

type Color = | [255, 0, 0] | "green" | "blue";

var color1: Color = [255, 0, 0]; //没有错误
var color2: Color = "green"; //没有错误
var color3: Color = "yellow"; //静态类型错误


// (function() {
//     function length(x) {
//         return x.length;
//     }

//     var total = length('Hello') + length(null);
// })

// function total(numbers: Array < number > ) {
//     var result = 0;
//     for (var i = 0; i < numbers.length; i++) {
//         result += numbers[i];
//     }
//     return result;
// }

// total([1, 2, 3, 'Hello']);