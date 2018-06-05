import {
  FULL_CIRCLE
} from './tree_vis';

class BoidVis {
  constructor(tree) {
    this.tree = tree;
    this.canvas = document.getElementById("boidCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener('mousemove', e => {
      let rect = this.canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      // console.log(x, y);
      this.tree.setPointer(x, y);
    });
    this.width = 1400;
    this.height = 1400;
    this.ctx.beginPath();
    // this.ctx.strokeRect(0, 0, 1400, 1000);
    // while(true) {
    //
    // }
    window.setInterval(() => {
      // console.log('going');
      // this.tree.path.push(this.tree.path.shift());
      this.drawVis();
    }, 85);
  }

  drawVis() {
    let nodes = this.tree.getPoints(this.tree.root);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    // this.ctx.strokeRect(0, 0, 1400, 800);
    for(let i = 0; i < nodes.length; i++) {
      this.drawPoint(nodes[i]);
    }
    this.tree.step();
  }

  drawPoint(node) {

    this.ctx.beginPath();
    this.ctx.arc(node.data[0], node.data[1], 1, 0, FULL_CIRCLE, true);
    this.ctx.fill();
  }


}

export default BoidVis;
