export const NODE_RADIUS = 25;
export const FULL_CIRCLE = Math.PI * 2;
export const LEFT_START = -(NODE_RADIUS/Math.sqrt(2));
export const RIGHT_START = (NODE_RADIUS/Math.sqrt(2));
export const Y_START = (NODE_RADIUS/Math.sqrt(2));
export const LEFT_OFFSET = -40;
export const RIGHT_OFFSET = 40;
export const Y_OFFSET = 50;
export const X = 600;
export const Y = 600;

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

export default TreeVis;
