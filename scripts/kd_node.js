import { LEFT_OFFSET, RIGHT_OFFSET, Y_OFFSET } from './tree_vis';

class KDNode {
  constructor(data, parent = null, leftChild = null, rightChild = null, dim = 0) {
    this.data = data;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.dim = dim;
    this.x = 150;
    this.y = 100;
  }

  addLeftChild(node) {
    this.leftChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 2;
    node.x = node.parent.x + LEFT_OFFSET;
    node.y = node.parent.y + Y_OFFSET;
  }

  addRightChild(node) {
    this.rightChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 2;
    node.x = node.parent.x + RIGHT_OFFSET;
    node.y = node.parent.y + Y_OFFSET;
  }
}

export default KDNode;
