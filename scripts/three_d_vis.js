export const setScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  const geometry = new THREE.BoxBufferGeometry( 5, 5, 1 );
  const material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.5 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


  var edges = new THREE.EdgesGeometry( geometry );
  var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
  scene.add( line );
  camera.position.z = 5;
  function animate() {
  	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // edges.rotation.x += .01;
    // geometry.rotation.x += .01;
  	renderer.render( scene, camera );
  }
  animate();
}
