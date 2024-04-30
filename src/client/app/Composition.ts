import { BoxGeometry, CircleGeometry, ColorRepresentation, Group, Light, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, Object3DEventMap, PlaneGeometry, Points, PointsMaterial, SphereGeometry, TextureLoader } from "three";
import PointContainer from "./PointContainer";
import GUI from "lil-gui";


// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

type MeshAnimation = (elapsedTime: number, delta: number) => void;

type SomeMesh = Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap>;

export type Thing = Mesh | Group | Light;

export interface IComposition {
  objects: Map<string, Thing>;
  animations: Map<string, MeshAnimation>;
  animate: MeshAnimation;

  get: (name: string) => Thing | undefined;
}

export default class Composition implements IComposition {
  public objects = new Map<string, Thing>()
  public animations = new Map<string, MeshAnimation>();
  private settings: GUI;

  private uiParams = {
    groundColor: 0x70ff73,
    lolipop1: 0xfe6262,
    lolipop2: 0x9950ff,
    lolipop3: 0x1ff0ff,
  }

  constructor(settings: GUI) {
    this.settings = settings;

    // this.createCubes();
    // this.createPointCloud();
    // this.createPlate();
    const lolipop1 = this.createLoliPop("lolipop1", this.uiParams.lolipop1);

    const lolipop2 = this.createLoliPop("lolipop2", this.uiParams.lolipop2);
    lolipop2.position.z = 40;

    const lolipop3 = this.createLoliPop("lolipop3", this.uiParams.lolipop3);
    lolipop3.position.x = 40;

    const ground = this.createGround();

    // this.createHouse();

    this.settings.addColor(this.uiParams, "groundColor")
      .name("color")
      .onChange(() => ground.material.color.set(this.uiParams.groundColor))

    this.settings.addColor(this.uiParams, "lolipop1")
      .name("lolipop1")
      .onChange(() => (lolipop1.children[0] as SomeMesh).material.color.set(this.uiParams.lolipop1))

    this.settings.addColor(this.uiParams, "lolipop2")
      .name("lolipop2")
      .onChange(() => (lolipop2.children[0] as SomeMesh).material.color.set(this.uiParams.lolipop2))

    this.settings.addColor(this.uiParams, "lolipop3")
      .name("lolipop3")
      .onChange(() => (lolipop3.children[0] as SomeMesh).material.color.set(this.uiParams.lolipop3))
  }

  public get(name: string) {
    return this.objects.get(name);
  }

  createCubes() {
    const name = "greyCubes";

    const greyCubes = new Group();

    for (let i = 0; i < 15; i++) {
      const material = new MeshPhongMaterial({
        color: "red",
        opacity: 0.5,
        transparent: true
      })

      const cube = new Mesh(
        new BoxGeometry(1, 1, 1),
        material
      );

      cube.position.set((i * 1.1) - 8, (i * 1.1) - 8, 0);
      greyCubes.add(cube);
    }


    this.objects.set(name, greyCubes);

    this.animations.set(name, (elapsedTime, delta) => {
      greyCubes.children.forEach((coub, i) => {
        coub.rotateY(Math.PI * (delta / i));
        coub.rotateZ(Math.PI * (delta / 3));
      })

      greyCubes.rotateZ(Math.PI * delta / 10)
      greyCubes.position.z = 3;

      // cube.rotation.x = Math.PI * delta;
      // cube.rotateX(Math.PI * (delta / 2));

    })
  }

  createPlate() {
    const plate = new PlaneGeometry(100, 100);
    const material = new MeshStandardMaterial({ color: "grey" });

    const obj = new Mesh(plate, material);
    // obj.position.x = -50;
    // obj.position.y = -50;

    this.objects.set("plate", obj);
  }


  createPointCloud() {
    const name = "pointCloud";

    const colors = ["#F2E205", "#F2E527", "#F2CB07", "#F2B90F", "#F2A413"];

    // const dotMaterial = new PointsMaterial({ size: 1, sizeAttenuation: false, color: 0xf1f1f150 });

    const pointContainer = new PointContainer("https://raw.githubusercontent.com/ldemyanov/static/main/Eye.png", 30);
    const group = new Group();

    pointContainer.createPoindCloud().then((points) => {
      points.forEach(({ x, y }, i) => {
        const obj = new Points(
          new CircleGeometry((Math.random() * 2) / 2 + 1),
          // new PlaneGeometry((Math.random() * 2) + 1, (Math.random() * 2) + 1),
          // new MeshStandardMaterial({ color: colors.at(i % 5) })
          new PointsMaterial({ size: 3, sizeAttenuation: false, color: colors.at(i % 5) })
        );
        obj.position.set(x, y, 0);
        group.add(obj);
      })
    })

    this.objects.set(name, group);

    this.animations.set(name, (elapsedTime, delta) => {
      group.children.forEach((dot, i) => {

        if (delta % 2 === 1) return
        if (delta % 3 === 1) return
        if (delta % 4 === 1) return
        // if (delta % 5 === 1) return

        dot.rotateX(Math.PI * (delta / 100));
        dot.rotateY(Math.PI * (delta / 100));
        dot.rotateZ(Math.PI * (delta / 100));
      })
    })
  }

  createLoliPop(name: string, color: ColorRepresentation) {
    const figure = new SphereGeometry(15, 50);

    const loader = new TextureLoader();

    const material2 = new MeshBasicMaterial({
      color: 0xFF8844,
      map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'),
    });

    const palka = new BoxGeometry(3, 40, 3);

    const material = new MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: 0.2,
      metalness: 0.4,
    });

    const mesh = new Mesh(figure, material);
    mesh.position.y = 50;
    mesh.castShadow = true;

    const palkaMesh = new Mesh(palka, material2);
    palkaMesh.position.y = 20;
    palkaMesh.castShadow = true;

    const loliPop = new Group();
    loliPop.add(mesh, palkaMesh);

    this.objects.set(name, loliPop);

    this.animations.set(name, (_, delta) => {
      mesh.rotateY(Math.PI * (delta / 7));
    })

    return loliPop;
  }

  createGround() {
    const groundGeometry = new PlaneGeometry(10000, 10000);
    const groundMaterial = new MeshStandardMaterial({
      color: this.uiParams.groundColor,
      // roughness: 0.006,
    });
    const groundMesh = new Mesh(groundGeometry, groundMaterial);

    groundMesh.position.set(0, 0, -10);
    groundMesh.rotation.set(Math.PI / -2, 0, 0);
    groundMesh.receiveShadow = true;

    this.objects.set("ground", groundMesh);

    return groundMesh;
  }


  animate(elapsedTime: number, delta: number) {
    this.animations.forEach(f => f(elapsedTime, delta));
  };
}