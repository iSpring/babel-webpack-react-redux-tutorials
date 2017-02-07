class Shape{
  constructor(){
    if(new.target === Shape){
      throw TypeError("Shape is an abstract class and can't be instantiated.");
    }
  }

  getArea(){
    return 0;
  }

  getLength(){
    return 0;
  }
}

export default Shape;