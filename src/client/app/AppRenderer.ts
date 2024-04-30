import { Camera, Scene, VSMShadowMap, WebGLRenderer } from "three"

export interface IAppRenderer {
  canvas: HTMLCanvasElement;
  render: (scene: Scene, camera: Camera) => void;
  updateRenderSize: (scene: Scene, camera: Camera) => void;
}

export default class AppRenderer implements IAppRenderer {
  canvas: HTMLCanvasElement;
  private renderer = new WebGLRenderer({ antialias: true });

  constructor() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = VSMShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);

    this.canvas = this.renderer.domElement;

    document.body.appendChild(this.renderer.domElement);
  }


  render(scene: Scene, camera: Camera) {
    this.renderer.render(scene, camera);
  }

  updateRenderSize(scene: Scene, camera: Camera) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.render(scene, camera);
  }
}
