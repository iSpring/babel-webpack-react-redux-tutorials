//引入NPM模块
import Circle from 'MyShape/Circle';
import Rectangle from 'MyShape/Rectangle';

const circle = new Circle(1);
const circleInfoString = circle.toString();
console.log(circleInfoString);
document.getElementById("circle").innerText = circleInfoString;

const rectangle = new Rectangle(2, 1);
const rectangleInfoString = rectangle.toString();
console.log(rectangleInfoString);
document.getElementById("rectangle").innerText = rectangleInfoString;