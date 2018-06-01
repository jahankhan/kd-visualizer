import KdTree from '../scripts/kd_tree.js';
import MaxHeap from '../scripts/heap.js';
describe("KdTree", () => {
  // let KDTree = require('../scripts/kd_tree');
  let kdTree;
  let pointList = [
    [8,1],
    [6,6],
    [2,6],
    [2,7],
    [9,8],
    [5,7],
    [5,6],
    [1,3],
    [4,2],
    [7,5],
    [12,7]
  ];
  let nodes;

  beforeEach(() => {
    kdTree = new KdTree(null, 2);
    kdTree.buildOptimalTree(pointList);
    nodes = kdTree.getPoints(kdTree.root);
  });

  describe("buildOptimalTree", () => {
    it("should build properly", () => {
      // kdTree.buildOptimalTree(pointList);
      // let points = kdTree.getPoints(kdTree.root);
      expect(kdTree.root.data).toEqual([5,6]);
      expect(kdTree.getPoints(kdTree.root).map((node) => node.data)).toEqual(
        [[5,6],
        [2,6],
        [1,3],
        [4,2],
        [2,7],
        [5,7],
        [6,6],
        [7,5],
        [8,1],
        [9,8],
        [12,7]]
      );
    });

    describe("rangeSearch", () => {
      it("should get points within a 2d range", () => {
        // kdTree.buildOptimalTree(pointList);
        // let nodes = kdTree.getPoints(kdTree.root);
        let result = [nodes[1], nodes[2], nodes[3]];
        expect(kdTree.rangeSearch(kdTree.root, [[1,4],[1,6]])).toEqual(result);
      });
    });

    describe("kNearestNeigbors", () => {
      it("should return the nearest neighbor if passed same point", () => {
        expect(kdTree.kNearestNeigbors([2,6], kdTree.root, new MaxHeap(), 1)).toEqual([nodes[1]]);
      });



    });
  });


});
