import KDTree from './kd_tree';
import KDNode from './kd_node';
import TreeVis from './tree_vis';
import { inorderTraversal, findAxisMedian } from './tree_util';
document.addEventListener('DOMContentLoaded', () => {
  const pointList = [
    [8,1,1],
    [6,6,2],
    [2,6,4],
    [2,7,1],
    [9,8,8],
    [5,7,1],
    [5,6,3]
  ];
  // console.log(pointList);

  const tree = new KDTree();
  tree.buildOptimalTree(pointList);
  const treeVis = new TreeVis(tree);
  treeVis.drawTree(tree.root);
  // console.log(findAxisMedian(pointList, 0));
});
