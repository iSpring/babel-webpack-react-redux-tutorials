import "babel-polyfill";

const arr = Array.from(["a", "b", "c"]);

const asyncMethod = () => new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve();
    }, 100);
});