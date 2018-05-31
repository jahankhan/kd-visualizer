/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/heap.js":
/*!*************************!*\
  !*** ./scripts/heap.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (MaxHeap);


/***/ }),

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kd_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kd_tree */ "./scripts/kd_tree.js");
/* harmony import */ var _kd_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kd_node */ "./scripts/kd_node.js");
/* harmony import */ var _tree_vis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tree_vis */ "./scripts/tree_vis.js");
/* harmony import */ var _two_d_vis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./two_d_vis */ "./scripts/two_d_vis.js");
/* harmony import */ var _heap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./heap.js */ "./scripts/heap.js");
/* harmony import */ var _three_d_vis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./three_d_vis */ "./scripts/three_d_vis.js");
/* harmony import */ var _tree_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tree_util */ "./scripts/tree_util.js");







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
    [5,6]
  ];
  // console.log(pointList);

  const tree = new _kd_tree__WEBPACK_IMPORTED_MODULE_0__["default"](null, 2);
  tree.buildOptimalTree(twodPointList);
  // console.log(tree);
  const treeVis = new _tree_vis__WEBPACK_IMPORTED_MODULE_2__["default"](tree);
  treeVis.drawTree(tree.root);
  const twoDVis = new _two_d_vis__WEBPACK_IMPORTED_MODULE_3__["default"](tree);
  twoDVis.drawVis(tree.root);
  // setScene();
  console.log(tree.rangeSearch(tree.root, [[2, 3], [5, 8]]));
  console.log(tree.kNearestNeigborsNaive([2,5], tree.getPoints(tree.root)));
  // const heap = new MaxHeap();
  // heap.insert(1);
  // heap.insert(5);
  // heap.insert(3);
  // heap.insert(9);
  // heap.insert(11);
  // heap.insert(7);
  // heap.insert(2);
});


/***/ }),

/***/ "./scripts/kd_node.js":
/*!****************************!*\
  !*** ./scripts/kd_node.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree_vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree_vis */ "./scripts/tree_vis.js");


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
    node.x = node.parent.x + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["LEFT_OFFSET"];
    node.y = node.parent.y + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["Y_OFFSET"];
  }

  addRightChild(node) {
    this.rightChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 2;
    node.x = node.parent.x + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["RIGHT_OFFSET"];
    node.y = node.parent.y + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["Y_OFFSET"];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (KDNode);


/***/ }),

/***/ "./scripts/kd_tree.js":
/*!****************************!*\
  !*** ./scripts/kd_tree.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kd_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kd_node */ "./scripts/kd_node.js");
/* harmony import */ var _tree_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tree_util */ "./scripts/tree_util.js");



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
    this.root = new _kd_node__WEBPACK_IMPORTED_MODULE_0__["default"](point);
  }

  buildOptimalTree(pointList, dim = 0) {
    if(pointList.length === 0) {
      return pointList;
    }
    // console.log(pointList);
    const sortedList = Object(_tree_util__WEBPACK_IMPORTED_MODULE_1__["sortByDimension"])(pointList, dim);

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
    this.buildOptimalTree(leftPointList, Object(_tree_util__WEBPACK_IMPORTED_MODULE_1__["getNextDim"])(dim, this.dims));
    this.buildOptimalTree(rightPointList, Object(_tree_util__WEBPACK_IMPORTED_MODULE_1__["getNextDim"])(dim, this.dims));
  }

  assignPoint(point, node) {
    if (!node) {
      return this.setRoot(point);
    }
    if(point[node.dim] <= node.data[node.dim]) {
      if(node.leftChild === null){
        node.addLeftChild(new _kd_node__WEBPACK_IMPORTED_MODULE_0__["default"](point));
      } else {
        this.assignPoint(point, node.leftChild);
      }
    } else {
      // debugger
      if(node.rightChild === null) {
        node.addRightChild(new _kd_node__WEBPACK_IMPORTED_MODULE_0__["default"](point));
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

  // kNearestNeigbors(queryPoint, node, champions = [], k=1) {
  //   if (node) {
  //     let distance = this.euclideanDistance(queryPoint, node);
  //     if(champions.length < k) {
  //       champions.push([node, distance]);
  //     } else {
  //       if(distance < champions[0][1]) {
  //
  //       }
  //     }
  //   }
  //
  //
  // }

  euclideanDistance(pointA, pointB) {
    let dimValues = [];
    for(let i = 0; i < pointA.length; i++) {
      dimValues.push((pointA[i] - pointB[i])**2);
    }
    // return Math.sqrt(dimValues.reduce((acc, currVal) => acc + currVal;));
    return 5;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (KDTree);


/***/ }),

/***/ "./scripts/three_d_vis.js":
/*!********************************!*\
  !*** ./scripts/three_d_vis.js ***!
  \********************************/
/*! exports provided: setScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScene", function() { return setScene; });
const setScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  const geometry = new THREE.BoxBufferGeometry( 5, 5, 1 );
  const material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


  var edges = new THREE.EdgesGeometry( geometry );
  var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
  scene.add( line );
  camera.position.z = 5;
  function animate() {
  	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // edges.rotation.x += .01;
    // geometry.rotation.x += .01;
  	renderer.render( scene, camera );
  }
  animate();
}


/***/ }),

/***/ "./scripts/tree_util.js":
/*!******************************!*\
  !*** ./scripts/tree_util.js ***!
  \******************************/
/*! exports provided: inorderTraversal, sortByDimension, getNextDim */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inorderTraversal", function() { return inorderTraversal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByDimension", function() { return sortByDimension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextDim", function() { return getNextDim; });
const inorderTraversal = root => {

  if(root.leftChild !== null) {
    inorderTraversal(root.leftChild);
  }
  // console.log(root);
  if(root.rightChild !== null) {
    inorderTraversal(root.rightChild);
  }
  return;
};

const sortByDimension = (list, dim) => {
  return list.sort((pointA, pointB) => {
    if(pointA[dim] < pointB[dim]) {
      return -1;
    } else if (pointA[dim] === pointB[dim]) {
      return 0;
    } else {
      return 1;
    }
  });
  // if (list.length % 2 === 0) {
  //   return list[(list.length/2)-1];
  // } else {
  //   return list[Math.floor(list.length/2)];
  // }
};

const getNextDim = (dim, totalDims) => {
  return (dim + 1) % totalDims;
};


/***/ }),

/***/ "./scripts/tree_vis.js":
/*!*****************************!*\
  !*** ./scripts/tree_vis.js ***!
  \*****************************/
/*! exports provided: NODE_RADIUS, FULL_CIRCLE, LEFT_START, RIGHT_START, Y_START, LEFT_OFFSET, RIGHT_OFFSET, Y_OFFSET, X, Y, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_RADIUS", function() { return NODE_RADIUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FULL_CIRCLE", function() { return FULL_CIRCLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT_START", function() { return LEFT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT_START", function() { return RIGHT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y_START", function() { return Y_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT_OFFSET", function() { return LEFT_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT_OFFSET", function() { return RIGHT_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y_OFFSET", function() { return Y_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return Y; });
const NODE_RADIUS = 25;
const FULL_CIRCLE = Math.PI * 2;
const LEFT_START = -(NODE_RADIUS/Math.sqrt(2));
const RIGHT_START = (NODE_RADIUS/Math.sqrt(2));
const Y_START = (NODE_RADIUS/Math.sqrt(2));
const LEFT_OFFSET = -40;
const RIGHT_OFFSET = 40;
const Y_OFFSET = 50;
const X = 600;
const Y = 600;

class TreeVis {
  constructor(tree) {
    this.tree = tree;
    this.ctx = document.getElementById("treeCanvas").getContext("2d");
  }

  drawTree(node) {
    if(node) {
      this.drawNode(node);
      if(node.leftChild) {
        window.setTimeout(() => {
          this.drawTree(node.leftChild);
        }, 2000);
      }
      if (node.rightChild) {
        window.setTimeout(() => {
          this.drawTree(node.rightChild);
        }, 3000);
      }
    }
    return ;
  }

  drawNode(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, NODE_RADIUS, 0, FULL_CIRCLE, true);
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#f7b983";
    this.ctx.fill();
    this.ctx.fillStyle = "#050200";
    this.ctx.fillText(node.data.join(','), node.x, node.y);
    this.ctx.stroke();
    this.drawChildrenPath(node, this.ctx);
  }

  drawChildrenPath(node) {
    if(node.leftChild !== null) {
      this.ctx.beginPath();
      this.ctx.moveTo(node.x + LEFT_START, node.y + Y_START);
      this.ctx.lineTo(node.x+ LEFT_OFFSET, node.y + Y_OFFSET);
      this.ctx.stroke();
    }
    if(node.rightChild !== null) {
      this.ctx.beginPath();
      this.ctx.moveTo(node.x+ RIGHT_START, node.y + Y_START);
      this.ctx.lineTo(node.x+ RIGHT_OFFSET, node.y + Y_OFFSET);
      this.ctx.stroke();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TreeVis);


/***/ }),

/***/ "./scripts/two_d_vis.js":
/*!******************************!*\
  !*** ./scripts/two_d_vis.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree_vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree_vis */ "./scripts/tree_vis.js");


class TwoDVis {
  constructor(tree) {
    this.tree = tree;
    this.ctx = document.getElementById("2DCanvas").getContext("2d");
    this.width = 620;
    this.height = 620;
    this.ctx.beginPath();
    this.ctx.strokeRect(0, 0, 600, 600);
    this.drawAxis();
  }

  drawAxis() {
    for(let i = 1; i < 11; i++) {
      this.ctx.beginPath();
      // this.ctx.moveTo(i*60, 610);
      // this.ctx.stroke();
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(i, i*60, 610);
      this.ctx.fillText(i, 610, 600- i*60);
    }
  }

  drawPoint(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.data[0]*60, 600 - node.data[1]*60, 4, 0, _tree_vis__WEBPACK_IMPORTED_MODULE_0__["FULL_CIRCLE"], true);
    this.ctx.fill();
  }

  drawPartition(node) {
    const path = this.getPathToRoot(node);
    const { xBounds, yBounds } = this.findBoundaries(path);
    this.ctx.strokeRect(xBounds[0], yBounds[0], xBounds[1]-xBounds[0], yBounds[1]-yBounds[0]);
  }

  getPathToRoot(node) {
    const path = [node];
    if(node) {
      while(node.parent !== null) {
        path.push(node.parent)
        node = node.parent;
      }
    }
    return path.reverse();
  }

  findBoundaries(path) {
    const xBounds = [0, 600];
    const yBounds = [0, 600];
    for(let i = 0; i < path.length; i++) {
      if(path[i].leftChild === path[i+1]) { //left child
        if(path[i].dim === 0) {
          xBounds[1] = path[i].data[0] * 60;
        } else {
          yBounds[0] = 600 - path[i].data[1] * 60;
        }
      } else { //right child
        if(path[i].dim === 0) {
          xBounds[0] = path[i].data[0] * 60;
        } else {
          yBounds[1] = 600 - path[i].data[1] * 60;
        }
      }
    }
    return { xBounds,yBounds };
  }

  drawVis(node) {
    if(node) {
      this.drawPoint(node);
      this.drawPartition(node);
      if(node.leftChild) {
        window.setTimeout(() => {
          this.drawVis(node.leftChild);
        }, 2000);
      }
      if (node.rightChild) {
        window.setTimeout(() => {
          this.drawVis(node.rightChild);
        }, 3000);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TwoDVis);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map