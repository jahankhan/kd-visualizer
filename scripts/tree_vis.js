export const NODE_RADIUS = 25;
export const FULL_CIRCLE = Math.PI * 2;
export const LEFT_START = -(NODE_RADIUS/Math.sqrt(2));
export const RIGHT_START = (NODE_RADIUS/Math.sqrt(2));
export const Y_START = (NODE_RADIUS/Math.sqrt(2));
export const LEFT_OFFSET = -40;
export const RIGHT_OFFSET = 40;
export const Y_OFFSET = 50;


class TreeVis {
  constructor(tree) {
    this.tree = tree;
  }

  drawTree(node) {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");
    // let node = this.tree.root;
    if(node) {
      this.drawNode(node, ctx);
      if(node.leftChild) {
        this.drawTree(node.leftChild);
      }
      if (node.rightChild) {
        this.drawTree(node.rightChild);
      }
    }
    return ;
  }



  drawNode(node, ctx) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS, 0, FULL_CIRCLE, true);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#f7b983";
    ctx.fill();
    ctx.fillStyle = "#050200";
    ctx.fillText(node.data.join(','), node.x, node.y);
    ctx.stroke();
    this.drawChildrenPath(node, ctx);
  }

  drawChildrenPath(node, ctx) {
    if(node.leftChild !== null) {
      ctx.beginPath();
      ctx.moveTo(node.x + LEFT_START, node.y + Y_START);
      ctx.lineTo(node.x+ LEFT_OFFSET, node.y + Y_OFFSET);
      ctx.stroke();
    }
    if(node.rightChild !== null) {
      ctx.beginPath();
      ctx.moveTo(node.x+ RIGHT_START, node.y + Y_START);
      ctx.lineTo(node.x+ RIGHT_OFFSET, node.y + Y_OFFSET);
      ctx.stroke();
    }
  }
}

export default TreeVis;
