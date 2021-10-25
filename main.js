import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'

let scene, camera, controls, renderer;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true;
  document.body.appendChild( renderer.domElement );

  const loader = new GLTFLoader();
  loader.load('assets/gltf/scene.gltf', function(gltf) {
    console.log(gltf)
    const root = gltf.scene
    root.scale.set(0.5,0.5,0.5)
    scene.add(root);
  }, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
  }, function(error) {
    console.log('An error here')
  })

  //camera
  camera = new THREE.PerspectiveCamera(70, sizes.width/ sizes.height, 0.1, 100);
  camera.position.set(1.3,0,2);

  //controls
  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = false;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  

  //light
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  hemiLight.position.set( 0, 20, 0 );
  scene.add( hemiLight );

  const dirLight = new THREE.DirectionalLight( 0xffffff );
  dirLight.position.set( 3, 10, 10 );
  dirLight.castShadow = true;
  scene.add( dirLight );
}

function animate() {
  requestAnimationFrame(animate)
  
  render()
}

function render() {
  renderer.render(scene, camera)
}
