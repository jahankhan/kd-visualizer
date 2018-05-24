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
/* harmony import */ var _tree_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tree_util */ "./scripts/tree_util.js");



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
  const tree = new _kd_tree__WEBPACK_IMPORTED_MODULE_0__["default"](new _kd_node__WEBPACK_IMPORTED_MODULE_1__["default"]([3,7,1]));
  tree.buildTree(pointList);
  // debugger
  Object(_tree_util__WEBPACK_IMPORTED_MODULE_2__["inorderTraversal"])(tree.root);

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
/*! exports provided: inorderTraversal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inorderTraversal", function() { return inorderTraversal; });
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map