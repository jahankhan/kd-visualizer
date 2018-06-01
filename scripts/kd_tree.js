import KDNode from './kd_node';
import MaxHeap from './heap.js';
import { sortByDimension, getNextDim } from './tree_util';

class KDTree {
  constructor(root = null, dims) {
    this.root = root;
    this.dims = dims;
  }

  buildTree(pointList) {
    pointList.forEach((point) => {
      this.assignPoint(point, this.root);
    });
  }

  setRoot(point) {
    this.root = new KDNode(point);
  }

  buildOptimalTree(pointList, dim = 0) {
    if(pointList.length === 0) {
      return pointList;
    }
    // console.log(pointList);
    const sortedList = sortByDimension(pointList, dim);

    let pivot;
    let mid;
    if (pointList.length % 2 === 0) {
      mid = (pointList.length/2)-1;
      pivot = pointList[mid];
    } else {
      mid = Math.floor(pointList.length/2);
      pivot = pointList[mid];
    }
    // console.log(pivot);
    this.assignPoint(pivot, this.root);
    const leftPointList = sortedList.slice(0, mid);
    const rightPointList = sortedList.slice(mid+1);
    this.buildOptimalTree(leftPointList, getNextDim(dim, this.dims));
    this.buildOptimalTree(rightPointList, getNextDim(dim, this.dims));
  }

  assignPoint(point, node) {
    if (!node) {
      return this.setRoot(point);
    }
    if(point[node.dim] <= node.data[node.dim]) {
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

  rangeSearch(node, bounds) {
    let nodeList = [];
    // debugger
    if(node) {
      if(node.data[0] >= bounds[0][0] && node.data[0] <= bounds[0][1] &&
          node.data[1] >= bounds[1][0] && node.data[1] <= bounds[1][1]) {
        nodeList.push(node);
        nodeList = nodeList.concat(this.rangeSearch(node.leftChild, bounds));
        nodeList = nodeList.concat(this.rangeSearch(node.rightChild, bounds));
        return nodeList;
      } else {
        if(node.data[node.dim] > bounds[node.dim][1]) {
          nodeList = nodeList.concat(this.rangeSearch(node.leftChild, bounds));
          return nodeList;
        } else if(node.data[node.dim] < bounds[node.dim][0]) {
          nodeList = nodeList.concat(this.rangeSearch(node.rightChild, bounds));
          return nodeList;
        }
      }
    }
    return nodeList;
  }

  getPoints(node) {
    let points = [];
    if (node) {
      points.push(node);
      points = points.concat(this.getPoints(node.leftChild));
      points = points.concat(this.getPoints(node.rightChild));
    }
    return points;
  }

  kNearestNeigborsNaive(queryPoint, points, k=1) {
    const champions = [[null, 1000000]];

    for(let i = 0; i < points.length; i++) {
      let distance = Math.sqrt((queryPoint[0] - points[i].data[0])**2 + (queryPoint[1] - points[i].data[1])**2);
      console.log(distance, points[i]);
      if(distance < champions[0][1]) {
        champions.shift();
        champions.unshift([points[i], distance]);
      }
    }
    return champions;
  }

  kNearestNeigbors(queryPoint, node, champions, k=3, hash = {}) {

    if (node) {
      let distance = this.euclideanDistance(queryPoint, node.data);
      // console.log(distance);
      if(champions.size() < k) {
        champions.insert(distance);
        hash[distance] = node;
        if(queryPoint[node.dim] <= node[node.dim]){
          this.kNearestNeigbors(queryPoint, node.leftChild, champions, k, hash);
          this.kNearestNeigbors(queryPoint, node.rightChild, champions, k, hash);
        } else {
          this.kNearestNeigbors(queryPoint, node.rightChild, champions, k, hash);
          this.kNearestNeigbors(queryPoint, node.leftChild, champions, k, hash);
        }
      } else {
        if(distance < champions.peek()) {
          hash[distance] = node;
          champions.extract();
          champions.insert(distance);
          this.kNearestNeigbors(queryPoint, node.leftChild, champions, k, hash);
          this.kNearestNeigbors(queryPoint, node.rightChild, champions, k, hash);
        } else {
          return champions;
        }
      }
      if(this.root === node) {
        let results = [];
        for(let i = 0; i < champions.size(); i++) {
          results.push(hash[champions.heap[i]]);
        }
        return results;
      }
      return champions;
    }
  }

  euclideanDistance(pointA, pointB) {
    let dimValues = [];
    for(let i = 0; i < pointA.length; i++) {
      dimValues.push((pointA[i] - pointB[i])**2);
    }
    // console.log(dimValues);
    let sum = dimValues.reduce((acc, currVal) => acc + currVal)
    return Math.sqrt(sum);
  }
}

export default KDTree;
