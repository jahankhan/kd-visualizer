import TwoDVector from '../scripts/vector';
describe("TwoDVector", () => {
  it("can construct a vector", () => {
    const vector = new TwoDVector(0,0);
    expect(vector.x).toEqual(0);
    expect(vector.y).toEqual(0);
  });
  let twoDVector;
  beforeEach(() => {
    twoDVector = new TwoDVector(10,6);
  });

  describe("divideVector", () => {
    it("should be able to divide a vector by a constant", () => {
      twoDVector.divideVector(2);
      expect(twoDVector.x).toEqual(5);
      expect(twoDVector.y).toEqual(3);
    });
  });

  describe("addVectors", () => {
    it("should be able to add two vectors", () => {
      twoDVector.addVectors(new TwoDVector(2,3));
      expect(twoDVector.x).toEqual(12);
      expect(twoDVector.y).toEqual(9);
    });
  });

  describe("addVector", () => {
    it("should be able to add a point to the vector", () => {
      twoDVector.addVector([2, 3]);
      expect(twoDVector.x).toEqual(12);
      expect(twoDVector.y).toEqual(9);
    });
  });
});
