// Classes and sub classes - 2015 version
class Shape {
  constructor(h, w, type) {
    this.height = h;
    this.width = w;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getArea() {
    return this.height * this.width;
  }
}

class Square extends Shape {
  constructor(h, w) {
    // calls the parent/superclass constructor
    super(h, w, "square");
  }

  getArea() {
    return this.height ** 2;
  }
}

const aSquare = new Shape(10, 10, "square");
console.log(aSquare);
console.log(aSquare.getType());
console.log(aSquare.getArea());

const actualSquare = new Square(5, 5);
console.log(actualSquare);
console.log(actualSquare.getType());
console.log(actualSquare.getArea());
