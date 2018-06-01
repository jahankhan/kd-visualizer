import * as TreeUtil from '../scripts/tree_util';
describe("Util", () => {
  let tree;
  beforeEach(() => {
    let child = {
      data: [1,1]
    };
    let child2 = {
      data: [2,2]
    };
    tree = {
      data: [0,0],
      leftChild: child,
      rightChild: child2
    };
  });

  // it("properly traverses the tree inorder", () => {
  //
  // });
  describe("sortByDimension", () => {
    it("should properly sorts by dimension", () => {
      let list = [[6,5],[2,6],[0,3]];
      expect(TreeUtil.sortByDimension(list, 0)).toEqual([[0,3],[2,6],[6,5]]);
      expect(TreeUtil.sortByDimension(list, 1)).toEqual([[0,3],[6,5],[2,6]]);
    });
  });

  describe("getNextDim", () => {
    it("should get next dim", () => {
      expect(TreeUtil.getNextDim(0,3)).toEqual(1);
      expect(TreeUtil.getNextDim(2,3)).toEqual(0);
    });
  });



});
