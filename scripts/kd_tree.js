import KDNode from './kd_node';
import MaxHeap from './heap.js';
import TwoDVector from './vector.js';
import { sortByDimension, getNextDim } from './tree_util';

class KDTree {
  constructor(root = null, dims) {
    this.root = root;
    this.dims = dims;
    this.pointer = [300, 300];
    this.path = [
      [50, 50],
      [500, 50],
      [1200, 50],
      [500, 400],
      [50, 400],
      [500, 700],
      [1200, 700],
      [600, 700],
      [600, 500],
      [600, 300],
      [600, 100],
      [600, 0],
      [600, 200],
    ];
    window.setInterval(() => {
      this.path.push(this.path.shift());
    }, 1500);
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
      if(node.rightChild === null) {
        node.addRightChild(new KDNode(point));
      } else {
        this.assignPoint(point, node.rightChild);
      }
    }
  }

  rangeSearch(node, bounds) {
    let nodeList = [];
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
    let sum = dimValues.reduce((acc, currVal) => acc + currVal)
    return Math.sqrt(sum);
  }

  positionDistance(pointA, pointB) {
    let position = [];
    for(let i = 0; i < pointA.length; i++) {
      position.push(Math.abs(pointA[i] - pointB[i]));
    }
    return position;
  }

  centerOfMass(node) {
    const nodes = this.getPoints(this.root);
    let cOfMass = null;
    for(let i = 0; i < nodes.length; i++) {
      if(node.data !== nodes[i].data) {
        if(cOfMass === null) {
          cOfMass = new TwoDVector(nodes[i].data[0], nodes[i].data[1]);
        } else {
          cOfMass.addVector(nodes[i].data);
        }
      }
    }
    cOfMass.divideVector(nodes.length-1);
    cOfMass.subVector(node.data).divideVector(100);
    return cOfMass;
  }

  avoidCollision(node) {
    let vector = new TwoDVector(0,0);
    let nodes = this.getPoints(this.root);
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].data !== node.data) {
        let eDistance = this.euclideanDistance(nodes[i].data, node.data);
        let distance = this.positionDistance(nodes[i].data, node.data);

        if(Math.abs(eDistance) < 40) {
          vector.addVector(distance);
        }
      }
    }
    return vector.divideVector(100);
  }

  matchVelocity(node) {
    let vector = null;
    let nodes = this.getPoints(this.root);
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].data !== nodes.data) {
        if(vector === null) {
          vector = nodes[i].velocity;
        } else {
          vector.addVectors(nodes[i].velocity);
        }
      }
    }
    vector.divideVector(nodes.length-1);
    return vector.addVectors(node.velocity).divideVector(8);
  }

  bounding_box(node) {
    const xMin = 100, xMax = 1000, yMin = 100, yMax = 700;
    let vector = new TwoDVector(0,0);
    if(node.data[0] < xMin) {
      vector.x = 14;
    } else if(node.data[0] > xMax) {
      vector.x = -14;
    } else if(node.data[1] < yMin) {
      vector.y = 14;
    } else if(node.data[1] > yMax) {
      vector.y = -14;
    }
    return vector;
  }



  goalSetting(node) {
    let vector = new TwoDVector(this.pointer[0], this.pointer[1]);
    if(node.data[0] < vector.x) {
      vector.x = 14;
    } else if(node.data[0] > vector.x ) {
      vector.x = -14;
    }
    if(node.data[1] < vector.y) {
      vector.y = 14;
    } else if(node.data[1] > vector.y ) {
      vector.y = -14;
    }
    return vector;
  }

  createBoids(k) {
    const boids = [];
    for(let i = 0; i < k; i++){
      let x = Math.floor(Math.random() * 1400);
      let y = Math.floor(Math.random() * 1400);
      boids.push([x, y]);
    }
    return boids;
  }

  followTheLeader(node, leader = [300, 300]) {
    let vector = new TwoDVector(0,0);
    let distance = this.euclideanDistance(leader, node.data)
    if(node.data[0] < leader.data[0]) {
      vector.x = distance/100;
    } else if (node.data[0] > leader.data[0]) {
      vector.x = -(distance/100);
    }
    if(node.data[1] < leader.data[1]) {
      vector.y = distance/100;
    } else if (node.data[1] > leader.data[1]) {
      vector.y = -(distance/100);
    }
    return vector;
  }

  setPointer(x, y) {
    this.pointer = [x, y];
  }

  step() {
    let nodes = this.getPoints(this.root);
    let v1, v2, v3, v4, v5;
    for(let i = 0; i < nodes.length; i++) {
      v1 = this.centerOfMass(nodes[i]);
      v2 = this.avoidCollision(nodes[i]);
      v3 = this.matchVelocity(nodes[i]);
      v4 = this.bounding_box(nodes[i]);
      v5 = this.goalSetting(nodes[i]);
      nodes[i].velocity.addVectors(v1).addVectors(v2).addVectors(v3).addVectors(v4).addVectors(v5);
      if(nodes[i].velocity.x > 50) {
        nodes[i].velocity.x = 50;
      } else if(nodes[i].velocity.x < -50) {
        nodes[i].velocity.x = -50;
      }
      if(nodes[i].velocity.y > 50) {
        nodes[i].velocity.y = 50;
      } else if(nodes[i].velocity.y < -50) {
        nodes[i].velocity.y = -50;
      }
      nodes[i].data[0] += nodes[i].velocity.x;
      nodes[i].data[1] += nodes[i].velocity.y;
    }
  }
}

export default KDTree;
