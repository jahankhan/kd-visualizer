import KDTree from './kd_tree';
import KDNode from './kd_node';
import TreeVis from './tree_vis';
import TwoDVis from './two_d_vis';
import MaxHeap from './heap';
import BoidVis from './boid_vis';
import { setScene } from './three_d_vis';
import { inorderTraversal, findAxisMedian } from './tree_util';
document.addEventListener('DOMContentLoaded', () => {
  const threedPointList = [
    [8,1,1],
    [6,6,2],
    [2,6,4],
    [2,7,1],
    [9,8,8],
    [5,7,1],
    [5,6,3]
  ];

  const twodPointList = [
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
    [12,7],
  ];
  // console.log(pointList);

  const tree = new KDTree(null, 2);
  tree.buildOptimalTree(twodPointList);
  console.log(tree.getPoints(tree.root));
  const treeVis = new TreeVis(tree);
  treeVis.drawTree(tree.root);
  const twoDVis = new TwoDVis(tree);
  twoDVis.drawVis(tree.root);
  // setScene();
  // console.
  // console.log(tree.rangeSearch(tree.root, [[1, 4], [1, 6]]));
  // console.log(tree.kNearestNeigbors([2,5], tree.root, new MaxHeap(), 10));
  // console.log(tree.kNearestNeigbors([2,7], tree.root, new MaxHeap(), 10));
  // const heap = new MaxHeap();
  // heap.insert(1);
  // heap.insert(5);
  // heap.insert(3);
  // heap.insert(9);
  // heap.insert(11);
  // heap.insert(7);
  // heap.insert(2);
  const boidVis = new BoidVis(tree);

});
