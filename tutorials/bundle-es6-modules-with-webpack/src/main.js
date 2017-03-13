import Circle from './Circle';
import Rectangle from './Rectangle';
import Variables from './Variables';
import Logger from './Logger';

const circle = new Circle(Variables.defaultCircleInfo.radius);
const circleInfoString = circle.toString();
Logger(circleInfoString);
document.getElementById("circle").innerText = circleInfoString;

const rectangle = new Rectangle(Variables.defaultRectangleInfo.width, Variables.defaultRectangleInfo.height);
const rectangleInfoString = rectangle.toString();
Logger(rectangleInfoString);
document.getElementById("rectangle").innerText = rectangleInfoString;