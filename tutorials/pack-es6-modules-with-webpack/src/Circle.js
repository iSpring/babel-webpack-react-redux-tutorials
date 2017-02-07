import Shape from './Shape';

class Circle extends Shape{
  constructor(radius){
    super();
    this.radius = radius;
  }

  getArea(){
    return Math.PI * this.radius * this.radius;
  }

  getLength(){
    return 2 * Math.PI * this.radius;
  }

  toString(){
    return `Circle radius:${this.radius}, Circle area:${this.getArea()}, Circle length:${this.getLength()}`;
  }
}

export default Circle;