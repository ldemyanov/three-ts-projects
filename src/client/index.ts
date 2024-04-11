import AppScene, { IAppScene } from "./app/AppScene";

const appScene: IAppScene = new AppScene();

appScene.resize();
appScene.build();
appScene.animate();



