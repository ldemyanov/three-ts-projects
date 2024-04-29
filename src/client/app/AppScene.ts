import { AmbientLight, Camera, Clock, DirectionalLight, Fog, Object3D, Scene } from "three";
import AppCamera, { IAppCamera } from "./AppCamera";
import AppRenderer, { IAppRenderer } from "./AppRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Composition, { IComposition } from "./Composition";
import GUI from "lil-gui";


export interface IAppScene {

  scene: Scene;

  appCamera: IAppCamera;
  resize: () => void;
  build: () => void;
  animate: () => void;
  dynamicAdd: (obj: Object3D) => void;
}

export default class AppScene implements IAppScene {
  appCamera: IAppCamera;

  private appRenderer: IAppRenderer;
  private composition: IComposition;
  private orbitControl: OrbitControls;

  public scene = new Scene();
  private clock = new Clock();
  private gui = new GUI();

  constructor() {
    this.appCamera = new AppCamera();
    this.appRenderer = new AppRenderer();
    this.composition = new Composition();

    this.orbitControl = this.addOrbitController(this.appCamera.camera, this.appRenderer.canvas);

    window.addEventListener("resize", () => this.resize());
  }

  addOrbitController(camera: Camera, canvas: HTMLCanvasElement) {
    const orbitControl = new OrbitControls(camera, canvas);

    orbitControl.enableDamping = true;
    orbitControl.dampingFactor = 0.05;
    orbitControl.minPolarAngle = Math.PI / 4;
    orbitControl.maxPolarAngle = (3 * Math.PI) / 4;

    return orbitControl;
  }

  dynamicAdd(obj: Object3D) {
    this.scene.add(obj)
  }

  createLight() {
    const dirLight = new DirectionalLight(0xffffff);
    dirLight.intensity = 1;
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 0.0001;
    dirLight.shadow.camera.far = 1000;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.radius = 5;
    dirLight.position.set(400, 500, 600);

    const ambientLight = new AmbientLight(0xffffff);


    // ambientLight.position.set(0, 0, 0);

    this.scene.add(dirLight);
    this.scene.add(ambientLight);
  }


  // Initial methods

  resize() {
    this.appRenderer.updateRenderSize(this.scene, this.appCamera.camera);
    this.appCamera.updateAspect();
  }

  build() {
    this.createLight();

    this.composition.objects.forEach((obj) => {
      this.scene.add(obj);
    });
  }

  animate() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;

    this.composition.animations.forEach((f) => f(elapsedTime, delta));

    this.appRenderer.render(this.scene, this.appCamera.camera);

    // console.log(this.orbitControl.position0);

    const that = this;
    requestAnimationFrame(() => that.animate());
  }
}