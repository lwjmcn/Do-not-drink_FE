import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
  SceneLoader,
  Color4,
} from "@babylonjs/core";
import BabylonCanvas from "./BabylonCanvas";
import "@babylonjs/loaders";
let box: Mesh;

const onSceneReady = async (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  scene.clearColor = new Color4(0, 0, 0, 0);

  // // Our built-in 'box' shape.
  // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // // Move the box upward 1/2 its height
  // box.position.y = 1;

  // // Our built-in 'ground' shape.
  // MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

  //gltf model viewer
  const meshes = await SceneLoader.ImportMeshAsync(
    null,
    "./gltf/",
    "milkbox_origin.glb",
    scene
  ).then((result) => {
    return result.meshes;
  });
  for (const mesh of meshes) {
    console.log(mesh);
    mesh.scaling = new Vector3(3, 3, 3);

    mesh.position.x = 0;
    mesh.position.y = 0;
  }
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  //   const rpm = 10;
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
};

const FluidRenderer = () => (
  <BabylonCanvas antialias onSceneReady={onSceneReady} onRender={onRender} />
);
export default FluidRenderer;
