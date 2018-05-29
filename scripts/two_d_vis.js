import {
  FULL_CIRCLE
} from './tree_vis';

class TwoDVis {
  constructor(tree) {
    this.tree = tree;
    this.ctx = document.getElementById("2DCanvas").getContext("2d");
    this.ctx.beginPath();
    this.ctx.strokeRect(0, 0, 600, 600);
  }

  drawPoint(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.data[0]*60, 600 - node.data[1]*60, 4, 0, FULL_CIRCLE, true);
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
    // if(node) {
    //   while(node.parent !== null && counter < this.tree.dims * 2) {
    //     if(node.parent.dim === 0) {
    //       xBounds.unshift(node.parent.data[node.parent.dim] * 60);
    //     } else {
    //       yBounds.unshift(600 - node.parent.data[node.parent.dim] * 60);
    //     }
    //     counter += 1;
    //     node = node.parent;
    //   }
    // }
    return { xBounds,yBounds };
  }

  drawVis(node) {
    if(node) {
      this.drawPoint(node);

      this.drawPartition(node);
      if(node.leftChild) {
        this.drawVis(node.leftChild);
      }
      if (node.rightChild) {
        this.drawVis(node.rightChild);
      }
    }
  }
}

export default TwoDVis;
