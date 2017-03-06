/*@flow*/

var num: number = 0;
var anyValue: any = 1;
var mixedValue: mixed = 2;
num = anyValue;
num = mixedValue; //=>静态类型错误


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