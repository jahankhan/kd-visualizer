import KDNode from './kd_node';
import MaxHeap from './heap.js';
import TwoDVector from './vector.js';
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
      if(isNaN(node.data[0])){
        debugger
      }
      let distance = this.euclideanDistance(queryPoint, node.data);
      console.log(distance);
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
        debugger
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
    if(isNaN(Math.sqrt(sum))) {
      debugger
    }
    return Math.sqrt(sum);
  }

  centerOfMass(node) {
    // const nodes = this.getPoints(this.root);
    const nodes = this.kNearestNeigbors(node.data, this.root, new MaxHeap(), 10);
    // let cOfMass = [0, 0];
    // console.log(nodes);
    let cOfMass = null;
    for(let i = 0; i < nodes.length; i++) {
      if(node.data !== nodes[i].data) {
        if(cOfMass === null) {
          debugger
          cOfMass = new TwoDVector(nodes[i].data[0], nodes[i].data[1]);
        } else {
          cOfMass.addVector(nodes[i].data);
        }
      }
    }
    debugger
    cOfMass.divideVector(nodes.length-1);
    return cOfMass.addVector(node.data).divideVector(100);
  }

  avoidCollision(node) {
    let vector = new TwoDVector(0,0);
    let nodes = this.getPoints(this.root);
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].data !== node.data) {
        let distance = this.euclideanDistance(nodes[i].data, node.data);
        if(Math.abs(distance) < 100) {
          vector.addVector(-distance);
        }
      }
    }
    return vector;
  }

  matchVelocity(node) {
    let vector = null;
    let nodes = this.kNearestNeigbors(node.data, this.root, new MaxHeap(), 10);
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].data !== nodes.data) {
        if(vector === null) {
          vector = new TwoDVector(nodes[i].data[0], nodes[i].data[1]);
        } else {
          vector.addVector(nodes[i].velocity);
        }
      }
    }
    vector.divideVector(nodes.length-1);
    return vector.addVector(node.velocity).divideVector(8);
  }

  bounding_box(node) {
    const xMin = 0, xMax = 600, yMin = 0, yMax = 600;
    let vector = new TwoDVector(0,0);
    if(node.data[0] < xMin) {
      vector.x = 10;
    } else if(node.data[0] > xMax) {
      vector.x = -10;
    } else if(node.data[1] < yMin) {
      vector.y = 10;
    } else if(node.data[1] > yMin) {
      vector.y = -10;
    }
    return vector;
  }

  step() {
    let nodes = this.getPoints(this.root);
    let v1, v2, v3, v4;
    for(let i = 0; i < nodes.length; i++) {
      v1 = this.centerOfMass(nodes[i]);
      v2 = this.avoidCollision(nodes[i]);
      v3 = this.matchVelocity(nodes[i]);
      v4 = this.bounding_box(nodes[i]);
      nodes[i].velocity.addVector(v1).addVector(v2).addVector(v3).addVector(v4);
      nodes[i].data[0] += nodes[i].velocity.x;
      nodes[i].data[1] += nodes[i].velocity.y;
    }
  }
}

export default KDTree;
