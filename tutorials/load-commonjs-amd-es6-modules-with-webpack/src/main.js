//引入CommonJS模块
import Variables from './Variables';// <=> const Variables = require('./Variables.js');

//引入AMD模块
import Logger from './Logger';// <=> const Logger = require('./Logger');

//引入ES6模块
import Circle from './Circle';

//引入ES6模块
import Rectangle from './Rectangle';

const circle = new Circle(Variables.defaultCircleInfo.radius);
const circleInfoString = circle.toString();
Logger(circleInfoString);
document.getElementById("circle").innerText = circleInfoString;

const rectangle = new Rectangle(Variables.defaultRectangleInfo.width, Variables.defaultRectangleInfo.height);
const rectangleInfoString = rectangle.toString();
Logger(rectangleInfoString);
document.getElementById("rectangle").innerText = rectangleInfoString;