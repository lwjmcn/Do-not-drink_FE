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
  PhysicsImpostor,
  AmmoJSPlugin,
  AbstractMesh,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import BabylonCanvas from "./BabylonCanvas";
import "@babylonjs/loaders";
import Ammo from "ammojs-typed";

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
  var light = new HemisphericLight("light1", new Vector3(0, 5, -5), scene);
  var light2 = new HemisphericLight("light2", new Vector3(15, -10, 5), scene);

  light.specular = new Color3(1, 0.96, 0.88);
  light2.specular = new Color3(0.65, 0.65, 1);
  light2.diffuse = new Color3(0.65, 0.65, 1);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.6;
  light2.intensity = 0.6;

  scene.clearColor = new Color4(1.0, 0.96, 0.88, 1); // #FFF6e1

  createCup(scene).then((glassCup) => {
    createBall(scene, glassCup);
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

const createBall = async (scene: Scene, glassCup: AbstractMesh) => {
  // 중력
  const ammo = await Ammo();
  scene.enablePhysics(new Vector3(0, -9.81, 0), new AmmoJSPlugin(true, ammo)); // 중력 적용

  // collision
  glassCup.physicsImpostor = new PhysicsImpostor(
    glassCup,
    PhysicsImpostor.MeshImpostor,
    { mass: 0, restitution: 0.1 },
    scene
  );

  let particles: Mesh[] = [];

  // // ✅ 유체(Fluid) 설정 (물리 적용된 입자 시스템)
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const position = new Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 5,
        (Math.random() - 0.5) * 2
      );
      particles.push(createFluidParticle(scene, position));
    }, 100);
  }
};
const createFluidParticle = (scene: Scene, position: Vector3) => {
  let particle = MeshBuilder.CreateSphere(
    "fluidParticle",
    { diameter: 0.72 },
    scene
  );

  const particleMaterial = new StandardMaterial("particleMaterial", scene);
  particleMaterial.diffuseColor = new Color3(1, 0.71, 0.24);
  particleMaterial.ambientColor = new Color3(1, 0.71, 0.24);
  particleMaterial.specularColor = new Color3(1, 0.71, 0.24);
  particleMaterial.emissiveColor = new Color3(0.59, 0.42, 0.14);

  particle.material = particleMaterial;
  particle.position = position;

  // 물리 엔진 적용 (SphereImpostor)
  particle.physicsImpostor = new PhysicsImpostor(
    particle,
    PhysicsImpostor.SphereImpostor,
    { mass: 0.01, friction: 0.1, restitution: 0.1 },
    scene
  );
  return particle;
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {};

const FluidRenderer = () => (
  <BabylonCanvas antialias onSceneReady={onSceneReady} onRender={onRender} />
);
export default FluidRenderer;
