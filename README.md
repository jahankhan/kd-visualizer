# Kd-tree
 We know many ways to search a one dimensional range to find inclusive points and nearest neighbors. This problem gets a bit harder when trying to visualize in two or more dimensions as a regular binary search tree or array will not suffice. Creating a K-d tree is great way of efficiently searching for k-dimensional ranges without the need for extra data structures.

### Creating the tree

* For each level of the tree the data will be split according by dimension
  * e.g. You have a 3-dimensional dataset, depth 0 will be sorted on x, depth 1 will be split on y, and depth 2 will be split on z. You will then repeat this for larger dimensions.
* The median value of that dimension is picked as a pivot node and inserted into the tree
  * All smaller values will be sent left to the left child and all larger values will be sent to the right child
* This process continues until all nodes have been inserted into the tree

```javascript
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
```

### Range Search

* You can do a range search in O(log n) time by utilizing an inorder traversal through the kd-tree and pruning non-optimal subtrees

```javascript
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
```

### K-Nearest Neighbors

* knn can also be implemented in O(log n) time by pruning sub-trees that have parents further then the largest node in the nearest neighbor list

```javascript
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
```

### 240-boids Simulation

This simulation uses the k-nearest neighbor search to mimic flock behavior. The bird-oids (boids) follow three main rules

1. boids move towards the center of mass of the k-nearest boids
2. boids match velocity of the k-nearest boids
3. boids avoid collisions with all other boids

Since I need the boids to stay on the screen so you can view the visualization I have three more rules.

4. boids try to stay within the bounding box of the canvas
5. boids will have a slight leaning towards your cursor
to add an interactive aspect
6. each boids velocity is capped to prevent them from going off the screen

```javascript
step() {
  let nodes = this.getPoints(this.root);
  let v1, v2, v3, v4, v5;
  for(let i = 0; i < nodes.length; i++) {
    v1 = this.centerOfMass(nodes[i]);
    v2 = this.avoidCollision(nodes[i]);
    v3 = this.matchVelocity(nodes[i]);
    v4 = this.bounding_box(nodes[i]);
    v5 = this.goalSetting(nodes[i]);
    nodes[i].velocity.addVectors(v1).addVectors(v2).
      addVectors(v3).addVectors(v4).addVectors(v5);
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
```
