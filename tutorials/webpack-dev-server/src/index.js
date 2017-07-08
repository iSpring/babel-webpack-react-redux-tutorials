import "./index.css";
import Logger from "./Logger";

var div = document.createElement("div");
div.textContent = "Babel + Webpack + React + Redux";
document.body.appendChild(div);

var timer = -1;

function log(TheLogger){
    timer = setInterval(function(){
        TheLogger.log(new Date());
    }, 1000);
}

log(Logger);

// if(module.hot){
//     module.hot.accept('Logger', () => {
//         var NextLogger = require('/Logger');
//         log(NextLogger);
//     });
// }