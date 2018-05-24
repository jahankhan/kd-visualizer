class KDNode {
  constructor(data, parent = null, leftChild = null, rightChild = null, dim = 0) {
    this.data = data;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.dim = dim;
  }

  addLeftChild(node) {
    this.leftChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 3;
  }

  addRightChild(node) {
    this.rightChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 3;
  }
}

export default KDNode;
