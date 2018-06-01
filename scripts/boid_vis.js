import {
  FULL_CIRCLE
} from './tree_vis';

class BoidVis {
  constructor(tree) {
    this.tree = tree;
    this.ctx = document.getElementById("boidCanvas").getContext("2d");
    this.width = 600;
    this.height = 600;
    this.ctx.beginPath();
    this.ctx.strokeRect(0, 0, 600, 600);
    window.setInterval(() => {
      console.log('going');
      this.drawVis();
    }, 1000);
  }

  drawVis() {
    let nodes = this.tree.getPoints(this.tree.root);
    for(let i = 0; i < nodes.length; i++) {
      this.drawPoint(nodes[i]);
    }
    this.tree.step();
  }

  drawPoint(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.data[0], 600 - node.data[1], 2, 0, FULL_CIRCLE, true);
    this.ctx.fill();
  }


}

export default BoidVis;
