import Shape from './Shape';

class Rectangle extends Shape{
  constructor(width, height){
    super();
    this.width = width;
    this.height = height;
  }

  getArea(){
    return this.width * this.height;
  }

  getLength(){
    return (this.width + this.height) * 2;
  }

  toString(){
    return `Rectangle width:${this.width}, Rectangle height:${this.height}, Rectangle area:${this.getArea()}, Rectangle length:${this.getLength()}`;
  }
}

export default Rectangle;