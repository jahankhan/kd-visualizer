class TwoDVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  addVector(vector) {
    this.x += vector[0];
    this.y += vector[1];
    return this;
  }

  divideVector(constant) {
    this.x /= constant;
    this.y /= constant;
    return this;
  }
}

export default TwoDVector;
