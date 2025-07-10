import "./style.css";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { TorusKnot } from "three/examples/jsm/curves/CurveExtras.js";

import {FlyControls} from "three/examples/jsm/controls/FlyControls"

import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls"

import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"

import {TrackballControls} from "three/examples/jsm/controls/TrackballControls"
import { notEqual } from "three/tsl";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight,
  0.1,
  100
);

camera.position.y = 5;
camera.position.z = 5;
camera.position.x = 5;

// const directionalLight = new THREE.DirectionalLight(0xffffff,5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3,4,5);
// directionalLight.lookAt(0,0,0);
// scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20,20);
const floorMaterial = new THREE.MeshStandardMaterial({color : 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
floor.name = "FLOOR";
scene.add(floor);

// // const geometry = new THREE.BoxGeometry(1,1,1);
// // const material = new THREE.MeshStandardMaterial({color:0xff0000});
// // const mesh = new THREE.Mesh(geometry, material);
// // mesh.castShadow = true;
// // mesh.position.y = 0.5;
// // scene.add(mesh);

// // const capsuleGeometry = new THREE.CapsuleGeometry(1,2,20,30);
// // const capsuleMaterial = new THREE.MeshStandardMaterial({color : 0xffff00});
// // const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// // capsuleMesh.position.set(3,1.75,0);
// // capsuleMesh.castShadow = true;
// // capsuleMesh.receiveShadow = true;
// // scene.add(capsuleMesh);

// // const torusGeometry = new THREE.TorusGeometry(0.5,0.1,16,100);
// // const torusMaterial = new THREE.MeshStandardMaterial({color : 0x0000ff});
// // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
// // torusMesh.position.set(0,0.5,1);
// // torusMesh.castShadow = true;
// // torusMesh.receiveShadow = true;
// // scene.add(torusMesh);

// // const starShape = new THREE.Shape();
// // starShape.moveTo(0,1);
// // starShape.lineTo(0.2,0.2);
// // starShape.lineTo(1,0.2);
// // starShape.lineTo(0.4,-0.1);
// // starShape.lineTo(0.6, -1);
// // starShape.lineTo(0,-0.5);
// // starShape.lineTo(-0.6,-1);
// // starShape.lineTo(-0.4, -0.1);
// // starShape.lineTo(-1,0.2);
// // starShape.lineTo(-0.2,0.2);

// // const shapeGeometry = new THREE.ShapeGeometry(starShape);
// // const shapeMaterial = new THREE.MeshStandardMaterial({color : 0xff00ff});
// // const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
// // shapeMesh.position.set(0,1,2);
// // scene.add(shapeMesh);

// // const extrudeSettings = {
// //   steps: 1,
// //   depth: 0.1,
// //   bevelEnabled: true,
// //   bevelThickness: 0.1,
// //   bevelSize: 0.3,
// //   bevelSegments: 100
// // };

// // const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
// // const extrudeMaterial = new THREE.MeshStandardMaterial({color : 0x0ddaaf});
// // const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
// // extrudeMesh.position.set(2,1.3,2);
// // extrudeMesh.castShadow = true;
// // extrudeMesh.receiveShadow = true;
// // scene.add(extrudeMesh);

// // const sphereGeomerty = new THREE.SphereGeometry(1,32,32);
// // const sphereMaterial = new THREE.MeshStandardMaterial({color : 0x98daaf});
// // const sphere = new THREE.Mesh(sphereGeomerty, sphereMaterial);
// // sphere.position.set(0,1,-3);
// // //scene.add(sphere);

// // const numPoints = 1000;
// // const positions = new Float32Array(numPoints * 3);

// // for(let i=0; i<numPoints; i+=1){
// //   const x = (Math.random() - 0.5) * 1;
// //   const y = (Math.random() - 0.5) * 1;
// //   const z = (Math.random() - 0.5) * 1;

// //   positions[i*3] = x;
// //   positions[i*3 + 1] = y;
// //   positions[i*3 + 2] = z;
// // };
// // const bufferGeometry = new THREE.BufferGeometry();
// // bufferGeometry.setAttribute(
// //   "position",
// //   new THREE.BufferAttribute(positions, 3)
// // );
// // const pointsMaterial = new THREE.PointsMaterial({
// //   color : 0xffff00,
// //   size : 0.05
// // });

// // const point = new THREE.Points(sphereGeomerty, pointsMaterial);
// // point.position.set(0,0,-5);
// // scene.add(point);

// // const cylinderGeometry = new THREE.CylinderGeometry(1,1,2);
// // const cylinderMaterial = new THREE.MeshStandardMaterial({color : 0x00ff00});
// // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// // cylinderMesh.position.set(-3,1,0);
// // cylinderMesh.castShadow = true;
// // cylinderMesh.receiveShadow = true;  
// // scene.add(cylinderMesh);

// const frontSideGeometry = new THREE.BoxGeometry(1,1,1);
// const frontSideMaterial = new THREE.MeshStandardMaterial({color:0x00ffff, side : THREE.FrontSide});
// const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
// frontSideMesh.position.z = 4;
// frontSideMesh.position.y = 0.5;
// frontSideMesh.castShadow = true;
// frontSideMesh.receiveShadow = true;
// scene.add(frontSideMesh);

// const backSideGeometry = new THREE.BoxGeometry(1,1,1);
// const backSideMaterial = new THREE.MeshStandardMaterial({color : 0x00ff00, side : THREE.BackSide});
// const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
// backSideMesh.position.set(2,0.5,4);
// backSideMesh.position.y = 0.51;
// // backSideMesh.castShadow = true;
// backSideMesh.receiveShadow = true;
// scene.add(backSideMesh);

// const doubleSideGeometry = new THREE.BoxGeometry(1,1,1);
// const doubleSideMaterial = new THREE.MeshStandardMaterial({color : 0x00ff00, side : THREE.DoubleSide});
// const doubleSideMesh = new THREE.Mesh(doubleSideGeometry,doubleSideMaterial);
// doubleSideMesh.position.set(4,0.5,4);
// doubleSideMesh.position.y = 0.51;
// // doubleSideMesh.castShadow = true;
// doubleSideMesh.receiveShadow = true;
// scene.add(doubleSideMesh);
 
// const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,20);
// const torusKnotStandMaterial = new THREE.MeshStandardMaterial({color : 0xff0000});
// torusKnotStandMaterial.roughness = 0.5;
// torusKnotStandMaterial.metalness = 1;
// const torusKnotStandardMesh = new THREE.Mesh(torusKnotGeometry,torusKnotStandMaterial);
// torusKnotStandardMesh.castShadow = true;
// torusKnotStandardMesh.receiveShadow = true;
// torusKnotStandardMesh.position.set(-4, 1, 0);
// scene.add(torusKnotStandardMesh);

// const torusKnotLamberMaterial = new THREE.MeshLambertMaterial({color : 0xff0000});
// torusKnotLamberMaterial.emissive = new THREE.Color(0x00ff00);
// torusKnotLamberMaterial.emissiveIntensity = 0.2;
// const torusKnotLamberMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLamberMaterial);
// torusKnotLamberMesh.castShadow = true;
// torusKnotLamberMesh.receiveShadow = true;
// torusKnotLamberMesh.position.set(-2, 1, 0);
// scene.add(torusKnotLamberMesh);

// const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({color : 0xff0000});
// torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
// torusKnotPhongMaterial.emissiveIntensity = 0.2;
// torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff);
// torusKnotPhongMaterial.shininess = 100;
// const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial);
// torusKnotPhongMesh.castShadow = true;
// torusKnotPhongMesh.receiveShadow = true;
// torusKnotPhongMesh.position.set(0, 1, 0);
// scene.add(torusKnotPhongMesh);

// const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({color : 0xff0000});
// const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
// torusKnotBasicMesh.castShadow = true;
// torusKnotBasicMesh.receiveShadow = true;
// torusKnotBasicMesh.position.set(2, 1, 0);
// scene.add(torusKnotBasicMesh);

// const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({color:0xffffff});
// torusKnotDepthMaterial.opacity = 0.5;
// const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
// torusKnotDepthMesh.castShadow = true;
// torusKnotDepthMesh.receiveShadow = true;
// torusKnotDepthMesh.position.set(4, 1, 0);
// scene.add(torusKnotDepthMesh);

// const textureLoader = new THREE.TextureLoader();
// // textureLoader.load("/threejs.webp", (texture) => {
// //   const textureBoxGeometry = new THREE.BoxGeometry(1,1,1);
// //   const textureMaterial = new THREE.MeshStandardMaterial({map : texture});
// //   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
// //   textureMesh.castShadow = true;
// //   textureMesh.receiveShadow = true;
// //   textureMesh.position.set(0,0.5,2);
// //   scene.add(textureMesh);
// // });
// const texture = await textureLoader.loadAsync("/threejs.webp");
// const textureBoxGeometry = new THREE.BoxGeometry(1,1,1);
// const textureMaterial = new THREE.MeshStandardMaterial({map : texture});
// const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
// textureMesh.castShadow = true;
// textureMesh.receiveShadow = true;
// textureMesh.position.set(0,0.5,2);
// scene.add(textureMesh);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene.add(boxMesh);

// const ambientLight = new THREE.AmbientLight(0xffffff, 5);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.receiveShadow = true;
directionalLight.position.set(3,4,5);
directionalLight.lookAt(0,0,0);

directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1 );
// scene.add(directionalLightHelper);


// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0,1,0);
// hemisphereLight.lookAt(0,0,0);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
// scene.add(hemisphereLightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
// pointLight.castShadow = true;
// pointLight.position.set(1,1,1);
// scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// const rectAreaLigt = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
// rectAreaLigt.position.set(0,1,2);
// scene.add(rectAreaLigt);

// const targetObj = new THREE.Object3D();
// scene.add(targetObj);

// const spotLight = new THREE.SpotLight(0xffffff,10,100,Math.PI/4,1,1);
// spotLight.castShadow = true;
// spotLight.position.set(0,3,0);
// spotLight.target = targetObj;
// spotLight.target.position.set(1,0,2);
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const gltfLoader =  new GLTFLoader();
// gltfLoader.load("/dancer.glb", (gltf) => {
//   const character = gltf.scene;
//   character.position.y = 0.8;
//   character.scale.set(0.01, 0.01, 0.01);
//   scene.add(character);
// });

const gltf = await gltfLoader.loadAsync("/dancer.glb");
console.log(gltf);
const character = gltf.scene;
const animationClips = gltf.animations;
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
character.castShadow = true;
character.receiveShadow = true;
character.traverse(obj => {
  if(obj.isMesh){
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
scene.add(character);

const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong);
// action.setDuration(10);
// action.setEffectiveTimeScale(2);
// action.setEffectiveWeight(2);
action.play();

// setTimeout(() => {
//   mixer.clipAction(animationClips[3]).paused = true;
// }, 3000);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;
// orbitControls.enableZoom = true;
// orbitControls.enablePan = true;
// orbitControls.enableRotate = true;
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 2;

// orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.minPolarAngle = Math.PI / 4;
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = Math.PI / 2;
const newPosition = new THREE.Vector3(0,1,0);
const rayCaster = new THREE.Raycaster();
renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;  //중앙이 0,0 왼쪽 위 -1,1 오른쪽 아래 1,-1
  const y = -((e.clientY / window.innerHeight) * 2 -1);

  rayCaster.setFromCamera(new THREE.Vector2(x,y), camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log("intersects", intersects);

  const intersectFloor = intersects.find((i) => i.object.name === "FLOOR");
  console.log("intersectFloor", intersectFloor);
  newPosition.copy(intersectFloor.point);
  newPosition.y = 1;
});

// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 1;
// flyControls.rollSpeed = Math.PI / 10;
// flyControls.autoForward = false;

// camera.position.set(0,1,5);
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
// firstPersonControls.lookSpeed = 0.1;
// firstPersonControls.movementSpeed = 1;
// firstPersonControls.lookVertical = true;


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

// const pointerLockControls = new PointerLockControls(camera, renderer.domElement);
// window.addEventListener("click", () => {pointerLockControls.lock();});

// const trackballControls = new TrackballControls(camera,renderer.domElement);
// trackballControls.rotateSpeed = 2;
// trackballControls.zoomSpeed = 1.5;
// trackballControls.panSpeed = 0.5;
// trackballControls.noRotate = false;
// trackballControls.noZoom = false;
// trackballControls.noPan = false;
// trackballControls.staticMoving = false;
// trackballControls.dynamicDampingFactor = 0.05;

// const target = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5),
//   new THREE.MeshStandardMaterial({color:0x0000ff})
// );
// target.position.set(4,0.5,0);
// scene.add(target);
// trackballControls.target = target.position;

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();
const render = () => {
  character.lookAt(newPosition);
  targetVector
    .subVectors(newPosition, character.position)
    .normalize()
    .multiplyScalar(0.01);
  
    if(
      Math.abs(character.position.x - newPosition.x) >= 1 ||
      Math.abs(character.position.z - newPosition.z) >= 1
    ){
      character.position.x += targetVector.x;
      character.position.z += targetVector.z;
      action.stop();
    }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // textureMesh.rotation.y += 0.01;
  orbitControls.update();
  // flyControls.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  // trackballControls.update();
  if(mixer){
    mixer.update(clock.getDelta());
  }
};

render();
