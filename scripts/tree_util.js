export const inorderTraversal = root => {

  if(root.leftChild !== null) {
    inorderTraversal(root.leftChild);
  }
  console.log(root);
  if(root.rightChild !== null) {
    inorderTraversal(root.rightChild);
  }
  return;
};
