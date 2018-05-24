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
    // console.log(600-node.data[0]*60);
    // console.log(600 - node.data[1]*60);
    this.ctx.arc(600-node.data[0]*60, 600 - node.data[1]*60, 4, 0, FULL_CIRCLE, true);
    this.ctx.fill();
  }

  drawPartition(node) {
    this.ctx.beginPath();
    if (node.dim === 0) {
      this.ctx.moveTo(600 - node.data[0]*60, 0);
      if(node.parent) {
        this.ctx.lineTo(600 - node.data[0]*60, node.parent.data[1]);
      } else {
        this.ctx.lineTo(600 - node.data[0]*60, 600);
      }

    } else {
      if(node.parent.rightChild === node) {
        this.ctx.moveTo(0, 600 - node.data[1]*60);
        this.ctx.lineTo(600 - node.parent.data[0]*60, 600 - node.data[1]*60);
      } else {
        this.ctx.moveTo(600, 600 - node.data[1]*60);
        this.ctx.lineTo(600 - node.parent.data[0]*60, 600 - node.data[1]*60);
      }

    }
    this.ctx.stroke();
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
