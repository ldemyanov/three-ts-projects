import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

type MeshAnimation = (elapsedTime: number, delta?: number) => void;

export interface IComposition {
  objects: Map<string, Mesh>;
  animations: Map<string, MeshAnimation>;
  animate: MeshAnimation;
}

export default class Composition implements IComposition {
  public objects: Map<string, Mesh>;
  public animations: Map<string, MeshAnimation>;

  constructor() {
    this.objects = new Map();
    this.animations = new Map();

    this.createGreyCube();
  }

  createGreyCube() {
    const name = "greyCube";

    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: "grey" }),
    );

    this.objects.set(name, cube);

    this.animations.set(name, (elapsedTime) => {
      cube.position.x = Math.sin(elapsedTime);
      cube.position.y = Math.cos(elapsedTime);
    })
  }

  animate(elapsedTime: number, delta?: number | undefined) {
    this.animations.forEach(f => f(elapsedTime, delta));
  };
}