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

  addVectors(vector2) {
    this.x += vector2.x;
    this.y += vector2.y;
    return this;
  }

  divideVector(constant) {
    this.x /= constant;
    this.y /= constant;
    return this;
  }
}

export default TwoDVector;
