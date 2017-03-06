/*@flow*/

function foo(i: any) {
    return i * 100 + i.length;
}

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