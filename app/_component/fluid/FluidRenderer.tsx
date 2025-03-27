import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
  Color4,
  PBRMaterial,
  CubeTexture,
  Color3,
  InitializeCSG2Async,
  CSG2,
  CSG,
  ArcRotateCamera,
} from "@babylonjs/core";
import BabylonCanvas from "./BabylonCanvas";
import "@babylonjs/loaders";

const onSceneReady = async (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas();

  const camera = new ArcRotateCamera(
    "ArcRotateCamera",
    3.06,
    1.14,
    8.96,
    new Vector3(0, 1, 0),
    scene
  );
  camera.fov = (60 * Math.PI) / 180;
  camera.attachControl();
  camera.minZ = 0.01;
  camera.maxZ = 100;
  camera.wheelPrecision = 50;
  camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  scene.clearColor = new Color4(0, 0, 0, 0);

  createCup(scene).then((glassCup) => {
    const straw = createStraw(scene);
    // createJuice(scene, glassCup, straw);
  });
};

const createCup = async (scene: Scene) => {
  const outerCup = MeshBuilder.CreateCylinder(
    "outerCup",
    {
      diameterTop: 4,
      diameterBottom: 3,
      height: 5,
      tessellation: 40,
    },
    scene
  );
  // the mesh at least have positions and indices
  outerCup.position = new Vector3(0, 0, 0);
  const innerCup = MeshBuilder.CreateCylinder(
    "innerCup",
    {
      diameterTop: 3.8,
      diameterBottom: 2.8,
      height: 4.9,
      tessellation: 40,
    },
    scene
  );
  innerCup.position.y += 0.1;

  const topRoundEdge = MeshBuilder.CreateTorus(
    "topRoundEdge",
    {
      diameter: 3.9, // 약간 큰 원
      thickness: 0.15,
      tessellation: 40,
    },
    scene
  );
  topRoundEdge.position.y = 2.5; // 컵의 위쪽 모서리에 배치

  const bottomRoundEdge = MeshBuilder.CreateTorus(
    "bottomRoundEdge",
    {
      diameter: 2.9,
      thickness: 0.15,
      tessellation: 40,
    },
    scene
  );
  bottomRoundEdge.position.y = -2.5; // 컵의 아래쪽 모서리에 배치

  const outerCSG = CSG.FromMesh(outerCup);
  const innerCSG = CSG.FromMesh(innerCup);
  const topEdgeCSG = CSG.FromMesh(topRoundEdge);
  const bottomEdgeCSG = CSG.FromMesh(bottomRoundEdge);
  const glassCup = outerCSG
    .subtract(innerCSG)
    .union(topEdgeCSG)
    .union(bottomEdgeCSG)
    .toMesh("glassCup", null, scene);

  const glassMaterial = new PBRMaterial("glassMaterial", scene);

  // 환경 텍스처 추가 (반사 효과)
  // scene.createDefaultEnvironment();
  const envTexture = CubeTexture.CreateFromPrefilteredData(
    "https://playground.s.com/textures/environment.env",
    scene
  );
  scene.environmentTexture = envTexture;
  glassMaterial.reflectionTexture = envTexture;
  glassMaterial.refractionTexture = envTexture;

  glassMaterial.indexOfRefraction = 1.5; // 굴절 효과 (유리 느낌)
  glassMaterial.alpha = 0.1; // 거의 투명하게 설정
  glassMaterial.metallic = 0;
  glassMaterial.roughness = 0.05; // 매끄러운 반사 효과
  glassMaterial.subSurface.isRefractionEnabled = true;
  glassMaterial.subSurface.isTranslucencyEnabled = true;
  glassMaterial.subSurface.translucencyIntensity = 1;
  glassMaterial.subSurface.tintColor = new Color3(0.8, 0.9, 1); // 약간 푸른색 유리 느낌

  glassCup.material = glassMaterial;

  outerCup.dispose();
  innerCup.dispose();
  topRoundEdge.dispose();
  bottomRoundEdge.dispose();

  return glassCup;
};

const createStraw = (scene: Scene) => {
  // 컵 안에 담긴 빨대 경로 설정 (살짝 꺾인 부분 포함)
  const strawPath = [
    new Vector3(0, -2.3, -0.3), // 컵 내부
    new Vector3(0, 3.2, 2), // 컵 위로 올라옴
    new Vector3(0, 4, 3), // 살짝 앞으로 꺾임
  ];

  // 빨대 생성
  const straw = MeshBuilder.CreateTube(
    "straw",
    {
      path: strawPath,
      radius: 0.1, // 빨대 두께
      tessellation: 20, // 부드러운 원형
    },
    scene
  );

  // 빨대 재질 (반투명 플라스틱 느낌)
  const strawMaterial = new PBRMaterial("strawMaterial", scene);
  strawMaterial.albedoColor = new Color3(1, 0, 0); // 빨간색
  strawMaterial.metallic = 0;
  strawMaterial.roughness = 0.3;
  strawMaterial.alpha = 0.8; // 살짝 투명한 효과

  straw.material = strawMaterial;

  return straw;
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {};

const FluidRenderer = () => (
  <BabylonCanvas antialias onSceneReady={onSceneReady} onRender={onRender} />
);
export default FluidRenderer;
