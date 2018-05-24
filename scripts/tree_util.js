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

export const sortByDimension = (list, dim) => {
  return list.sort((pointA, pointB) => {
    if(pointA[dim] < pointB[dim]) {
      return -1;
    } else if (pointA[dim] === pointB[dim]) {
      return 0;
    } else {
      return 1;
    }
  });
  // if (list.length % 2 === 0) {
  //   return list[(list.length/2)-1];
  // } else {
  //   return list[Math.floor(list.length/2)];
  // }
};

export const getNextDim = dim => {
  return (dim + 1) % 3;
};
