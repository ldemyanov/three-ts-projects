import { PerspectiveCamera } from "three";

export interface IAppCamera {
  readonly fov: number,
  readonly near: number,
  readonly far: number,

  camera: PerspectiveCamera,

  updateAspect: () => void;
}

export default class AppCamera implements IAppCamera {
  camera: PerspectiveCamera;

  fov = 75;
  near = 0.01;
  far = 100;

  constructor() {
    this.camera = new PerspectiveCamera(
      this.fov,
      this.getAspect(),
      this.near,
      this.far,
    );

    this.camera.position.set(0, 0, 5);
  }

  private getAspect() {
    return window.innerWidth / window.innerHeight;
  }

  public updateAspect() {
    this.camera.aspect = this.getAspect();
    this.camera.updateProjectionMatrix();
  }
}