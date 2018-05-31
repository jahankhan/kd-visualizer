class MaxHeap {
  constructor() {
    this.heap = [];
  }

  leftChild(i) {
    return (2*i) + 1;
  }

  rightChild(i) {
    return (2*i) + 2;
  }

  parent(i) {
    return Math.floor((i-1)/2);
  }

  peek() {
    return this.heap[0];
  }

  insert(el) {
    this.heap.push(el);
    this._heapifyUp();
  }

  extract() {
    // let result = this.heap[0];
    let temp = this.heap[0];
    this.heap[0] = this.heap[this.heap.length-1];
    this.heap[this.heap.length-1] = temp;
    let result = this.heap.pop();
    this._heapifyDown();
    return result;
  }

  _heapifyUp() {
    let child = this.heap.length-1;
    let parent = this.parent(child);
    while(parent >= 0) {
      if(this.heap[parent] < this.heap[child]) {
        let temp = this.heap[child];
        this.heap[child] = this.heap[parent];
        this.heap[parent] = temp;
        child = parent;
        parent = this.parent(parent);
      } else {
        break;
      }
    }
  }

  _heapifyDown() {
    let parent = 0;
    let leftChild = this.leftChild(parent);
    let rightChild = this.rightChild(parent);
    while(rightChild <= this.heap.length-1) {
      let child = this.heap[leftChild] >= this.heap[rightChild] ? leftChild : rightChild;
      if(this.heap[parent] < this.heap[child]) {
        let temp = this.heap[child];
        this.heap[child] = this.heap[parent];
        this.heap[parent] = temp;
        parent = child;
        leftChild = this.leftChild(parent);
        rightChild = this.rightChild(parent);
      } else {
        break;
      }
    }
  }
}

export default MaxHeap;
