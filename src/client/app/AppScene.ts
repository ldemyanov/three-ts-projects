import { AmbientLight, Camera, Clock, DirectionalLight, Object3D, Scene } from "three";
import AppCamera, { IAppCamera } from "./AppCamera";
import AppRenderer, { IAppRenderer } from "./AppRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Composition, { IComposition } from "./Composition";


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

  private light = new DirectionalLight(0xffffff, 0.5);
  private ambientLight = new AmbientLight(0xffffff, 0.3);

  public scene = new Scene();
  private clock = new Clock();

  constructor() {
    this.appCamera = new AppCamera();
    this.appRenderer = new AppRenderer();
    this.composition = new Composition();

    this.orbitControl = new OrbitControls(this.appCamera.camera, this.appRenderer.canvas);

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.appRenderer.updateRenderSize(this.scene, this.appCamera.camera);
    this.appCamera.updateAspect();
  }

  build() {
    this.light.position.set(5, 5, 5);
    this.ambientLight.position.set(0, 0, 0);

    this.composition.objects.forEach((obj) => {
      this.scene.add(obj);
    });

    this.scene.add(this.light);
    this.scene.add(this.ambientLight);
  }

  dynamicAdd(obj: Object3D) {
    this.scene.add(obj)
  }

  animate() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;

    this.composition.animations.forEach((f) => f(elapsedTime, delta))

    this.appRenderer.render(this.scene, this.appCamera.camera);

    const that = this;
    requestAnimationFrame(() => that.animate());
  }
}