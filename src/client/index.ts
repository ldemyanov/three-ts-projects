import AppScene, { IAppScene } from "./app/AppScene";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const appScene: IAppScene = new AppScene();

appScene.resize();
appScene.build();
appScene.animate();

// const images: HTMLImageElement[] = [];
// const size = 50;

// const canvas2D = document.createElement('canvas');
// canvas2D.classList.add("canvas2d");
// const ctx2D = canvas2D.getContext('2d')!;
// canvas2D.height = size;
// canvas2D.width = size;
// document.body.append(canvas2D);

// type Dot = {
//   x: number;
//   y: number;
// }

// const pngImg = new Image;
// pngImg.onload = function () {
//   const dots = [];

//   const imageCoords = getCoords(pngImg);

//   const dotGeometry = new THREE.PlaneGeometry(1, 1);
//   const dotMaterial = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });

//   const dotsGroup = createPlanesGroupByPositions(imageCoords, dotGeometry, dotMaterial);

//   appScene.scene.add(dotsGroup);
// }

// pngImg.crossOrigin = "crossOrigin set";
// pngImg.src = "https://raw.githubusercontent.com/ldemyanov/static/main/image.png";

// // const imageData = ctx2D

// const getCoords = (img: HTMLImageElement) => {
//   ctx2D.clearRect(0, 0, size, size);
//   ctx2D.drawImage(img, 0, 0, size, size);

//   const imageData: Uint8ClampedArray = ctx2D.getImageData(0, 0, size, size).data;
//   const imageCoords = [];

//   for (let y = 0; y < size; y++) {
//     for (let x = 0; x < size; x++) {
//       // var red = imageData[((size * y) + x) * 4];
//       // var green = imageData[((size * y) + x) * 4 + 1];
//       // var blue = imageData[((size * y) + x) * 4 + 2];
//       const alpha = imageData[((size * y) + x) * 4 + 3];
//       if (alpha > 0) {
//         imageCoords.push({ x: 3 * (x - size / 2), y: 3 * (size / 2 - y) });
//       }
//     }
//   }

//   return imageCoords;
// }

// const createPlanesGroupByPositions = (dots: Dot[], geometry: THREE.PlaneGeometry, material: THREE.PointsMaterial) => {
//   const dotGroup = new THREE.Group();

//   dots.forEach(({ x, y }) => {
//     const dot = new THREE.Points(geometry, material);
//     dot.position.set(x, y, 0);
//     dotGroup.add(dot);
//   })

//   return dotGroup;
// }



// console.log(imageCoords);




// function loadImages(paths, whenLoaded){
//   var imgs=[];
//   paths.forEach(function(path){
//     var img = new Image;
//     img.onload = function(){
//       imgs.push(img);
//       if (imgs.length==paths.length) whenLoaded(imgs);
//     }
//     img.src = path;
//   });
// }



// const gltfLoader = new GLTFLoader();

// gltfLoader
//   .setPath('https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/')
//   .load('scene.gltf', (gltf) => {


//     appScene.dynamicAdd(gltf.scene);

//   });





