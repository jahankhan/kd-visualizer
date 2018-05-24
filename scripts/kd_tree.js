import KDNode from './kd_node';

class KDTree {
  constructor(root) {
    this.root = root;
  }

  buildTree(pointList) {
    pointList.forEach((point) => {
      this.assignPoint(point, this.root);
      // debugger
    });
  }

  assignPoint(point, node) {
    if(point[node.dim] < node.data[node.dim]) {
      if(node.leftChild === null){
        node.addLeftChild(new KDNode(point));
      } else {
        this.assignPoint(point, node.leftChild);
      }
    } else {
      // debugger
      if(node.rightChild === null) {
        node.addRightChild(new KDNode(point));
      } else {
        this.assignPoint(point, node.rightChild);
      }
    }
  }
}

export default KDTree;
