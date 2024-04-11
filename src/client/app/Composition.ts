import { BoxGeometry, CircleGeometry, Group, Mesh, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, Points, PointsMaterial, SphereGeometry } from "three";
import PointContainer from "./PointContainer";


// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

type MeshAnimation = (elapsedTime: number, delta: number) => void;

export interface IComposition {
  objects: Map<string, Mesh | Group>;
  animations: Map<string, MeshAnimation>;
  animate: MeshAnimation;
}

export default class Composition implements IComposition {
  public objects = new Map<string, Mesh | Group>()
  public animations = new Map<string, MeshAnimation>();

  constructor() {
    // this.createCubes();
    // this.createPointCloud();
    // this.createPlate();
    this.createSomeShit();
    // this.createHouse();
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

  createSomeShit() {
    const figure = new SphereGeometry(15, 100);

    const palka = new BoxGeometry(3, 3, 70);

    const palkaMatetial = new MeshLambertMaterial({
      color: 0xF57B2C
    })

    const material = new MeshStandardMaterial({
      color: 0xAA00BB,
      flatShading: true,
      // shininess: 80,
      roughness: 0.2,
      metalness: 0.4,
    });

    const mesh = new Mesh(figure, material);

    const palkaMesh = new Mesh(palka, palkaMatetial);

    mesh.position.z = 30;

    this.objects.set("someShit", mesh);
    this.objects.set("palka", palkaMesh);
  }


  animate(elapsedTime: number, delta: number) {
    this.animations.forEach(f => f(elapsedTime, delta));
  };
}