// Classes - constructor/prototype (the original way)
// No syntactic sugar
function Shape(h, w, type) {
  this.height = h;
  this.width = w;
  this.type = type;
}

Shape.prototype.getType = function () {
  return this.type;
};

// instance
let aSquare = new Shape(10, 10, "square");
console.log(aSquare);
console.log(aSquare.getType());
