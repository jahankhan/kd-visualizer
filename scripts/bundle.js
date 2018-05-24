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
/* harmony import */ var _tree_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree_util */ "./scripts/tree_util.js");




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

  const tree = new _kd_tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
  tree.buildOptimalTree(pointList);
  const treeVis = new _tree_vis__WEBPACK_IMPORTED_MODULE_2__["default"](tree);
  treeVis.drawTree(tree.root);
  // console.log(findAxisMedian(pointList, 0));
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
    node.dim = (this.dim + 1) % 3;
    node.x = node.parent.x + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["LEFT_OFFSET"];
    node.y = node.parent.y + _tree_vis__WEBPACK_IMPORTED_MODULE_0__["Y_OFFSET"];
  }

  addRightChild(node) {
    this.rightChild = node;
    node.parent = this;
    node.dim = (this.dim + 1) % 3;
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
  constructor(root = null) {
    this.root = root;
  }

  buildTree(pointList) {
    pointList.forEach((point) => {
      this.assignPoint(point, this.root);
      // debugger
    });
  }

  setRoot(point) {
    this.root = new _kd_node__WEBPACK_IMPORTED_MODULE_0__["default"](point);
  }

  buildOptimalTree(pointList, dim = 0) {
    if(pointList.length === 0) {
      return pointList;
    }
    console.log(pointList);
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
    this.buildOptimalTree(leftPointList, Object(_tree_util__WEBPACK_IMPORTED_MODULE_1__["getNextDim"])(dim));
    this.buildOptimalTree(rightPointList, Object(_tree_util__WEBPACK_IMPORTED_MODULE_1__["getNextDim"])(dim));
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
}

/* harmony default export */ __webpack_exports__["default"] = (KDTree);


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
  console.log(root);
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

const getNextDim = dim => {
  return (dim + 1) % 3;
};


/***/ }),

/***/ "./scripts/tree_vis.js":
/*!*****************************!*\
  !*** ./scripts/tree_vis.js ***!
  \*****************************/
/*! exports provided: NODE_RADIUS, FULL_CIRCLE, LEFT_START, RIGHT_START, Y_START, LEFT_OFFSET, RIGHT_OFFSET, Y_OFFSET, default */
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
const NODE_RADIUS = 25;
const FULL_CIRCLE = Math.PI * 2;
const LEFT_START = -(NODE_RADIUS/Math.sqrt(2));
const RIGHT_START = (NODE_RADIUS/Math.sqrt(2));
const Y_START = (NODE_RADIUS/Math.sqrt(2));
const LEFT_OFFSET = -40;
const RIGHT_OFFSET = 40;
const Y_OFFSET = 50;


class TreeVis {
  constructor(tree) {
    this.tree = tree;
    this.ctx = document.getElementById("treeCanvas").getContext("2d");
  }

  drawTree(node) {
    if(node) {
      this.drawNode(node);
      if(node.leftChild) {
        this.drawTree(node.leftChild);
      }
      if (node.rightChild) {
        this.drawTree(node.rightChild);
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map