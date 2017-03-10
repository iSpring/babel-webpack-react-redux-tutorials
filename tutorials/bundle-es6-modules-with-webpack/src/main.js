import Circle from './Circle';
import Rectangle from './Rectangle';
import './index.css';

const circle = new Circle(1);
document.getElementById("circle").innerText = circle.toString();

const rectangle = new Rectangle(2, 1);
document.getElementById("rectangle").innerText = rectangle.toString();