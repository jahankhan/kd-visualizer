import {
  FULL_CIRCLE
} from './tree_vis';

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

export default TwoDVis;
