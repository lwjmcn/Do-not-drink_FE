class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
       const camera = new BABYLON.ArcRotateCamera(
            "ArcRotateCamera",
            3.06,
            1.14,
            2.96,
            new BABYLON.Vector3(0, 0, 0),
            scene
        );
        camera.fov = (60 * Math.PI) / 180;
        camera.attachControl();
        camera.minZ = 0.01;
        camera.maxZ = 1000;
        camera.wheelPrecision = 50;
        camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        scene.clearColor = new BABYLON.Color4(0,0,0,0);

        createCup(scene).then((glassCup)=>{
            const straw  = createStraw(scene);
            createJuice(scene, glassCup, straw);
        });
        

        return scene;
    }

    
}

async function createCup (scene: BABYLON.Scene) {
    const outerCup = BABYLON.MeshBuilder.CreateCylinder(
        "outerCup",
        {
        diameterTop: 4,
        diameterBottom: 3,
        height: 5,
        tessellation: 40,
        },
        scene
    );
    const innerCup = BABYLON.MeshBuilder.CreateCylinder(
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

    const topRoundEdge = BABYLON.MeshBuilder.CreateTorus("topRoundEdge", {
        diameter: 3.9, // 약간 큰 원
        thickness: 0.15,
        tessellation: 40,
    }, scene);
    topRoundEdge.position.y = 2.5; // 컵의 위쪽 모서리에 배치

    const bottomRoundEdge = BABYLON.MeshBuilder.CreateTorus("bottomRoundEdge", {
        diameter: 2.9,
        thickness: 0.15,
        tessellation: 40
    }, scene);
    bottomRoundEdge.position.y = -2.5; // 컵의 아래쪽 모서리에 배치

    await BABYLON.InitializeCSG2Async();

    const outerCSG = BABYLON.CSG2.FromMesh(outerCup);
    const innerCSG = BABYLON.CSG2.FromMesh(innerCup);
    const topEdgeCSG = BABYLON.CSG2.FromMesh(topRoundEdge);
    const bottomEdgeCSG = BABYLON.CSG2.FromMesh(bottomRoundEdge);
    const glassCup = outerCSG.subtract(innerCSG).add(topEdgeCSG).add(bottomEdgeCSG).toMesh("glassCup", scene);

    const glassMaterial = new BABYLON.PBRMaterial("glassMaterial", scene);

    // 환경 텍스처 추가 (반사 효과)
    // scene.createDefaultEnvironment();
    //   const envTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    //     "https://playground.s.com/textures/environment.env",
    //     scene
    //   );
    //   scene.environmentTexture = envTexture; 
    //   glassMaterial.reflectionTexture = envTexture;
    //   glassMaterial.refractionTexture = envTexture;

    glassMaterial.indexOfRefraction = 1.5; // 굴절 효과 (유리 느낌)
    glassMaterial.alpha = 0.1; // 거의 투명하게 설정
    glassMaterial.metallic = 0;
    glassMaterial.roughness = 0.05; // 매끄러운 반사 효과
    glassMaterial.subSurface.isRefractionEnabled = true;
    glassMaterial.subSurface.isTranslucencyEnabled = true;
    glassMaterial.subSurface.translucencyIntensity = 1;
    glassMaterial.subSurface.tintColor = new BABYLON.Color3(0.8, 0.9, 1); // 약간 푸른색 유리 느낌

    glassCup.material = glassMaterial;

    outerCup.dispose();
    innerCup.dispose();
    topRoundEdge.dispose();
    bottomRoundEdge.dispose();

    return glassCup;
};

function createStraw(scene: BABYLON.Scene) {
    
    // 컵 안에 담긴 빨대 경로 설정 (살짝 꺾인 부분 포함)
    const strawPath = [
        new BABYLON.Vector3(0, -2.5, -0.3), // 컵 내부
        new BABYLON.Vector3(0, 3.2, 2),  // 컵 위로 올라옴
        new BABYLON.Vector3(0, 4, 3),  // 살짝 앞으로 꺾임
    ];

    // 빨대 생성
    const straw = BABYLON.MeshBuilder.CreateTube("straw", { 
        path: strawPath, 
        radius: 0.1, // 빨대 두께
        tessellation: 20 // 부드러운 원형
    }, scene);

    // 빨대 재질 (반투명 플라스틱 느낌)
    const strawMaterial = new BABYLON.PBRMaterial("strawMaterial", scene);
    strawMaterial.albedoColor = new BABYLON.Color3(1, 0, 0); // 빨간색
    strawMaterial.metallic = 0;
    strawMaterial.roughness = 0.3;
    strawMaterial.alpha = 0.8; // 살짝 투명한 효과

    straw.material = strawMaterial;

    return straw;
}

function createJuice(scene: BABYLON.Scene, glassCup: BABYLON.AbstractMesh, straw: BABYLON.AbstractMesh) {
    // 중력
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin()); // 중력 적용

    // collision
    glassCup.physicsImpostor = new BABYLON.PhysicsImpostor(
        glassCup, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1 }, scene
    );
    straw.physicsImpostor = new BABYLON.PhysicsImpostor(
        glassCup, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1 }, scene
    );

    // ✅ 유체(Fluid) 설정 (물리 적용된 입자 시스템)
    const fluidParticles = BABYLON.MeshBuilder.CreateSphere("fluid", { diameter: 0.5 }, scene);
    fluidParticles.material = new BABYLON.StandardMaterial("fluidMat", scene);
    fluidParticles.overlayColor = new BABYLON.Color3(1, 0.5, 0); // 주황색 (오렌지 주스)

    // 여러 개의 유체 입자를 만들고 컵 내부에서만 움직이게 설정
    for (let i = 0; i < 50; i++) {
        let particle = fluidParticles.clone(`particle_${i}`);
        particle.position = new BABYLON.Vector3(
            (Math.random() - 0.5) * 3,  // X 위치 (컵 내부)
            Math.random() * 5,         // Y 위치 (컵 안에서 떠다니게)
            (Math.random() - 0.5) * 3   // Z 위치
        );
        particle.physicsImpostor = new BABYLON.PhysicsImpostor(
            particle, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.1, restitution: 0.3 }, scene
        );
    }

    // ✅ 컵을 기울일 때 유체도 함께 반응하도록 설정
    scene.registerBeforeRender(() => {
        // 컵을 조금씩 흔들리게 만들기 (예제)
        glassCup.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
    });

    // // 🔥 Fluid Rendering System 적용 🔥
    // const fluidRenderer = new BABYLON.FluidRenderer(scene);
    // // fluidRenderer.setFluidRenderingEnabled(true);

    // // 유체 파티클 시스템 생성
    // const particleSystem = new BABYLON.ParticleSystem("fluidParticles", 2000, scene);
    // particleSystem.particleTexture = new BABYLON.Texture("textures/water_drop.png", scene);
    // particleSystem.emitter = new BABYLON.Vector3(0, -2, 0); // 컵 내부 위치
    // particleSystem.minSize = 0.05;
    // particleSystem.maxSize = 0.1;
    // particleSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1); // 오렌지색 (주스)
    // particleSystem.color2 = new BABYLON.Color4(1, 0.6, 0.1, 1);
    // particleSystem.updateSpeed = 0.02;
    // particleSystem.minLifeTime = 2;
    // particleSystem.maxLifeTime = 5;
    // particleSystem.emitRate = 500;
    // particleSystem.blendMode = BABYLON.ParticleSystem.BILLBOARDMODE_ALL;

    // // 중력 설정
    // particleSystem.gravity = new BABYLON.Vector3(0, -0.2, 0);

    // // 유체 렌더러에 파티클 추가
    // // fluidRenderer.addFluids([particleSystem]);

    // // 파티클 시스템 시작
    // particleSystem.start();
}


















import * as BABYLON from "babylonjs";

class Playground {
  public static async CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine);

      await LoadLiLGUI();

      const cameraMin = 0.1;
      const cameraMax = 1000;

      const createCamera = () => {
          const camera = new BABYLON.ArcRotateCamera(
              "ArcRotateCamera",
              3.06,
              1.14,
              2.96,
              new BABYLON.Vector3(0, 0, 0),
              scene
          );
          camera.fov = (60 * Math.PI) / 180;
          camera.attachControl();
          camera.minZ = cameraMin;
          camera.maxZ = cameraMax;
          camera.wheelPrecision = 50;
          camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");

          return camera;
      };

      const camera = createCamera();

      scene.activeCamera = camera;

      FluidSimulationDemoBase.AddDemo(
          "Box and wall",
          () => new FluidSimulationDemoBoxSphere(scene)
      );

      FluidSimulationDemoBase.StartDemo(0);

      scene.onDisposeObservable.add(() => {
          FluidSimulationDemoBase.Dispose();
      });

      return scene;
  }
}

const assetsDir = "https://popov72.github.io/FluidRendering/src/assets/";

async function LoadLiLGUI(): Promise<void> {
  return BABYLON.Tools.LoadScriptAsync("https://cdn.jsdelivr.net/npm/lil-gui@0.17.0/dist/lil-gui.umd.min.js");
}

declare let lil: any;

namespace lil {
  export type GUI = any;
  export type Controller = any;
}


/**
* A simple GUI to easily interact with the fluid renderer
*/
class FluidRendererGUI {
  private _gui: BABYLON.Nullable<lil.GUI>;
  private _visible: boolean;
  private _scene: BABYLON.Scene;
  private _onKeyObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>>;
  private _targetRendererIndex: number;
  private _targetRenderersGUIElements: lil.Controller[];
  private _renderObjectIndex: number;
  private _renderObjectsGUIElements: lil.Controller[];

  /**
   * Shows or hides the GUI
   */
  public get visible() {
      return this._visible;
  }

  public set visible(v: boolean) {
      if (v === this._visible) {
          return;
      }
      this._visible = v;
      if (this._gui) {
          this._gui.domElement.style.display = v ? "" : "none";
      }
  }

  /**
   * Initializes the class
   * @param scene Scene from which the fluid renderer should be retrieved
   */
  constructor(scene: BABYLON.Scene) {
      this._scene = scene;
      this._visible = true;
      this._onKeyObserver = null;
      this._targetRendererIndex = 0;
      this._targetRenderersGUIElements = [];
      this._renderObjectIndex = 0;
      this._renderObjectsGUIElements = [];
      this._gui = null;

      this._initialize();
  }

  /**
   * Disposes of all the ressources used by the class
   */
  public dispose() {
      this._scene.onKeyboardObservable.remove(this._onKeyObserver);
      this._onKeyObserver = null;
  }

  private _setupKeyboard(): void {
      this._onKeyObserver = this._scene.onKeyboardObservable.add((kbInfo) => {
          switch (kbInfo.type) {
              case BABYLON.KeyboardEventTypes.KEYUP:
                  switch (kbInfo.event.key) {
                      case "F8": {
                          this.visible = !this._visible;
                          break;
                      }
                  }
                  break;
          }
      });
  }

  private async _initialize() {
      this.dispose();

      if (typeof lil === "undefined") {
          await LoadLiLGUI();
      }

      this._setupKeyboard();
  }

  private _readValue(obj: any, name: string): any {
      const parts: string[] = name.split("_");

      for (let i = 0; i < parts.length; ++i) {
          const part = parts[i];
          obj = obj[parts[i]];

          if (obj instanceof BABYLON.Color3) {
              obj = obj.toHexString();
          }

          if (part === "debugFeature") {
              obj = BABYLON.FluidRenderingDebug[obj];
          }

          if (part.endsWith("MapSize") && obj === null) {
              obj = "Screen size";
          }
      }

      return obj;
  }

  private _setValue(obj: any, name: string, value: any): void {
      const parts: string[] = name.split("_");

      for (let i = 0; i < parts.length - 1; ++i) {
          obj = obj[parts[i]];
          if (parts[i].endsWith("MapSize") && value === "Screen size") {
              value = null;
          }
      }

      if (parts[parts.length - 1].endsWith("MapSize") && value === "Screen size") {
          value = null;
      }

      obj[parts[parts.length - 1]] = value;
  }

  private _parameterRead(name: string): any {
      const fluidRenderer = this._scene.fluidRenderer;
      switch (name) {
          case "enable":
              return !!this._scene.fluidRenderer;
      }

      if (name.startsWith("targets_")) {
          name = name.substring(8);
          if (name === "index") {
              return this._targetRendererIndex;
          } else {
              return fluidRenderer ? this._readValue(fluidRenderer.targetRenderers[this._targetRendererIndex], name) : "";
          }
      }

      if (name.startsWith("objects_")) {
          name = name.substring(8);
          if (name === "index") {
              return this._renderObjectIndex;
          } else {
              return fluidRenderer ? this._readValue(fluidRenderer.renderObjects[this._renderObjectIndex].object, name) : "";
          }
      }
  }

  private _fillValues(listGUIElements: lil.Controller[], obj: any): void {
      for (let i = 0; i < listGUIElements.length; ++i) {
          const elem = listGUIElements[i];
          const property = elem.property.split("_")[1];
          (elem.object as any)[elem.property] = this._readValue(obj, property);
          elem.updateDisplay();
      }
  }

  /**
   * Updates the values displayed by the GUI according to the property values of the underlying objects
   */
  public syncGUI(): void {
      const fluidRenderer = this._scene.fluidRenderer;

      if (fluidRenderer) {
          this._fillValues(this._targetRenderersGUIElements, fluidRenderer.targetRenderers[this._targetRendererIndex]);
          this._fillValues(this._renderObjectsGUIElements, fluidRenderer.renderObjects[this._renderObjectIndex].object);
      }
  }

  private _parameterChanged(name: string, value: any): void {
      const fluidRenderer = this._scene.fluidRenderer;
      switch (name) {
          case "enable":
              if (value) {
                  this._scene.enableFluidRenderer();
                  this._targetRendererIndex = 0;
                  this._initialize();
              } else {
                  this._scene.disableFluidRenderer();
                  this._targetRendererIndex = 0;
                  this._initialize();
              }
              return;
          case "targets_fluidColor":
              if (fluidRenderer && fluidRenderer.targetRenderers.length > this._targetRendererIndex) {
                  fluidRenderer.targetRenderers[this._targetRendererIndex].fluidColor.copyFrom(BABYLON.Color3.FromHexString(value));
              }
              return;
          case "targets_debugFeature": {
              const typedDebugFeature: keyof typeof BABYLON.FluidRenderingDebug = value;
              const val = BABYLON.FluidRenderingDebug[typedDebugFeature];
              if (fluidRenderer && fluidRenderer.targetRenderers.length > this._targetRendererIndex) {
                  fluidRenderer.targetRenderers[this._targetRendererIndex].debugFeature = val;
              }
              return;
          }
      }

      if (name.startsWith("targets_")) {
          name = name.substring(8);
          if (name === "index") {
              this._targetRendererIndex = value || 0;
              if (fluidRenderer) {
                  this._fillValues(this._targetRenderersGUIElements, fluidRenderer.targetRenderers[this._targetRendererIndex]);
              }
          } else {
              if (fluidRenderer) {
                  this._setValue(
                      fluidRenderer.targetRenderers[this._targetRendererIndex],
                      name,
                      value === false ? false : value === true ? true : isNaN(value) ? value : parseFloat(value)
                  );
              }
          }
      }

      if (name.startsWith("objects_")) {
          name = name.substring(8);
          if (name === "index") {
              this._renderObjectIndex = value || 0;
              if (fluidRenderer) {
                  this._fillValues(this._renderObjectsGUIElements, fluidRenderer.renderObjects[this._renderObjectIndex].object);
              }
          } else {
              if (fluidRenderer) {
                  this._setValue(
                      fluidRenderer.renderObjects[this._renderObjectIndex].object,
                      name,
                      value === false ? false : value === true ? true : isNaN(value) ? value : parseFloat(value)
                  );
              }
          }
      }
  }
}

const envNames = [
  "Environment",
  "Country",
  "Parking",
  "Night",
  "Canyon",
  "Studio",
];
const envFile = [
  "environment.env",
  "country.env",
  "parking.env",
  "night.env",
  "Runyon_Canyon_A_2k_cube_specular.env",
  "Studio_Softbox_2Umbrellas_cube_specular.env",
];

class FluidSimulationDemoBase {
  protected _scene: BABYLON.Scene;
  protected _engine: BABYLON.AbstractEngine;
  protected _gui: BABYLON.Nullable<lil.GUI>;
  protected _environmentFile: string;
  protected _noFluidSimulation: boolean;

  protected _fluidRenderer: BABYLON.FluidRenderer;
  protected _fluidRenderObject: BABYLON.IFluidRenderingRenderObject;
  protected _fluidSim: BABYLON.Nullable<FluidSimulator>;
  protected _particleGenerator: BABYLON.Nullable<ParticleGenerator>;
  protected _numParticles: number;
  protected _paused: boolean;
  protected _sceneObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Scene>>;
  protected _loadParticlesFromFile: boolean;
  protected _shapeCollisionRestitution: number;
  protected _collisionObjectPromises: Array<
      Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]>
  >;
  protected _collisionObjects: Array<
      [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
  >;

  protected _fluidSimGUIElements: Array<[lil.Controller, any, string]>;

  protected static _DemoList: Array<{
      name: string;
      factory: () => FluidSimulationDemoBase;
  }> = [];
  protected static _CurrentDemo: FluidSimulationDemoBase;
  protected static _CurrentDemoIndex: number;

  public static AddDemo(
      name: string,
      factory: () => FluidSimulationDemoBase
  ): void {
      FluidSimulationDemoBase._DemoList.push({ name, factory });
  }

  public static StartDemo(index: number): void {
      FluidSimulationDemoBase._CurrentDemo?.dispose();
      FluidSimulationDemoBase._CurrentDemoIndex = index;
      FluidSimulationDemoBase._CurrentDemo =
          FluidSimulationDemoBase._DemoList[index].factory();
      FluidSimulationDemoBase._CurrentDemo.run();
  }

  public static Dispose(): void {
      FluidSimulationDemoBase._CurrentDemo?.dispose();
  }

  constructor(
      scene: BABYLON.Scene,
      noFluidSimulation = false,
      particleFileName?: string
  ) {
      this._scene = scene;
      this._engine = scene.getEngine();
      this._fluidRenderer = scene.enableFluidRenderer()!;
      this._numParticles = 6000;
      this._paused = false;
      this._gui = null;
      this._sceneObserver = null;
      this._fluidSim = null;
      this._particleGenerator = null;
      this._loadParticlesFromFile = particleFileName !== undefined;
      this._shapeCollisionRestitution = 0.999;
      this._collisionObjectPromises = [];
      this._collisionObjects = [];
      this._environmentFile = "Environment";
      this._fluidSimGUIElements = [];
      this._noFluidSimulation = noFluidSimulation;

      const particleRadius = 0.02;
      const camera = scene.activeCameras?.[0] ?? scene.activeCamera!;

      camera.storeState();

      // Setup the fluid renderer object
      this._fluidRenderObject = this._fluidRenderer.addCustomParticles(
          {},
          0,
          false,
          undefined,
          camera
      );

      this._fluidRenderObject.targetRenderer.enableBlurDepth = true;
      this._fluidRenderObject.targetRenderer.blurDepthFilterSize = 20;
      this._fluidRenderObject.targetRenderer.blurDepthNumIterations = 5;
      this._fluidRenderObject.targetRenderer.blurDepthDepthScale = 10;
      this._fluidRenderObject.targetRenderer.fluidColor = new BABYLON.Color3(
          1 - 0.5,
          1 - 0.2,
          1 - 0.05
      );
      this._fluidRenderObject.targetRenderer.density = 2.2;
      this._fluidRenderObject.targetRenderer.refractionStrength = 0.02;
      this._fluidRenderObject.targetRenderer.specularPower = 150;
      this._fluidRenderObject.targetRenderer.blurThicknessFilterSize = 10;
      this._fluidRenderObject.targetRenderer.blurThicknessNumIterations = 2;
      this._fluidRenderObject.targetRenderer.dirLight = new BABYLON.Vector3(
          2,
          -1,
          1
      );
      this._fluidRenderObject.object.particleSize = particleRadius * 2 * 2;
      this._fluidRenderObject.object.particleThicknessAlpha =
          this._fluidRenderObject.object.particleSize;
      this._fluidRenderObject.object.useVelocity =
          this._fluidRenderObject.targetRenderer.useVelocity;
      this._fluidRenderObject.targetRenderer.minimumThickness =
          this._fluidRenderObject.object.particleThicknessAlpha / 2;

      // Setup the fluid simulator / particle generator
      if (!noFluidSimulation) {
          this._fluidSim = new FluidSimulator();

          this._fluidSim.smoothingRadius = particleRadius * 2;
          this._fluidSim.maxVelocity = 3;

          (window as any).fsim = this._fluidSim;

          this._particleGenerator = new ParticleGenerator(
              this._scene,
              particleFileName
          );
          this._particleGenerator.particleRadius =
              this._fluidSim.smoothingRadius / 2;
          this._particleGenerator.position.y = 0.5;
      }
  }

  protected _setEnvironment() {
      const idx = envNames.indexOf(this._environmentFile);
      this._scene.environmentTexture =
          BABYLON.CubeTexture.CreateFromPrefilteredData(
              "https://playground.babylonjs.com/textures/" + envFile[idx],
              this._scene
          );
      this._scene.createDefaultSkybox(this._scene.environmentTexture);
  }

  public async run() {
      this._setEnvironment();

      this._collisionObjects = await Promise.all(
          this._collisionObjectPromises
      );

      this._run();
  }

  protected async _run() {
      await this._generateParticles();

      if (this._particleGenerator && this._loadParticlesFromFile) {
          this._numParticles = this._particleGenerator.currNumParticles;
      }

      if (!this._noFluidSimulation) {
          this._sceneObserver = this._scene.onBeforeRenderObservable.add(
              () => {
                  this._fluidSim!.currentNumParticles = Math.min(
                      this._numParticles,
                      this._particleGenerator!.currNumParticles
                  );
                  (
                      this._fluidRenderObject
                          .object as BABYLON.FluidRenderingObjectCustomParticles
                  ).setNumParticles(this._fluidSim!.currentNumParticles);

                  if (!this._paused) {
                      this._fluidSim!.update(1 / 100);
                      this._checkCollisions(
                          this._fluidRenderObject.object.particleSize / 2
                      );
                  }

                  if (
                      this._fluidRenderObject &&
                      this._fluidRenderObject.object.vertexBuffers["position"]
                  ) {
                      this._fluidRenderObject.object.vertexBuffers[
                          "position"
                      ].updateDirectly(this._fluidSim!.positions, 0);
                      this._fluidRenderObject.object.vertexBuffers[
                          "velocity"
                      ].updateDirectly(this._fluidSim!.velocities, 0);
                  }
              }
          );
      }
  }

  public disposeCollisionObject(index: number): void {
      const shape = this._collisionObjects[index][1];

      shape?.mesh?.material?.dispose();
      shape?.mesh?.dispose();

      this._collisionObjects.splice(index, 1);
      this._collisionObjectPromises.splice(index, 1);
  }

  public dispose(): void {
      while (this._collisionObjects.length > 0) {
          this.disposeCollisionObject(0);
      }

      this._scene.onBeforeRenderObservable.remove(this._sceneObserver);
      this._gui?.destroy();
      this._fluidSim?.dispose();
      this._particleGenerator?.dispose();
      this._fluidRenderer.removeRenderObject(this._fluidRenderObject);

      const camera =
          this._scene.activeCameras?.[0] ?? this._scene.activeCamera;

      (camera as BABYLON.ArcRotateCamera)?._restoreStateValues();
  }

  public addCollisionBox(
      position: BABYLON.Vector3,
      rotation: BABYLON.Vector3,
      extents: BABYLON.Vector3,
      dragPlane: BABYLON.Nullable<BABYLON.Vector3> = new BABYLON.Vector3(
          0,
          1,
          0
      ),
      collisionRestitution?: number,
      dontCreateMesh?: boolean
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const collisionShape = {
          params: [extents.clone()],
          createMesh: SDFHelper.CreateBox,
          sdEvaluate: SDFHelper.SDBox,
          computeNormal: SDFHelper.ComputeSDFNormal,
          rotation: rotation.clone(),
          position: position.clone(),
          mesh: null as any,
          transf: new BABYLON.Matrix(),
          scale: 1,
          invTransf: new BABYLON.Matrix(),
          dragPlane,
          collisionRestitution,
      };

      const promise: Promise<
          [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
      > = dontCreateMesh
          ? Promise.resolve([null, collisionShape])
          : this._createMeshForCollision(collisionShape);

      this._collisionObjectPromises.push(promise);

      return promise;
  }

  public addCollisionPlane(
      normal: BABYLON.Vector3,
      d: number,
      collisionRestitution?: number
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const collisionShape = {
          params: [normal.clone(), d],
          sdEvaluate: SDFHelper.SDPlane,
          computeNormal: SDFHelper.ComputeSDFNormal,
          mesh: null as any,
          position: new BABYLON.Vector3(0, 0, 0),
          rotation: new BABYLON.Vector3(0, 0, 0),
          transf: BABYLON.Matrix.Identity(),
          scale: 1,
          invTransf: BABYLON.Matrix.Identity(),
          dragPlane: null,
          collisionRestitution,
      };

      const promise: Promise<
          [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
      > = Promise.resolve([null, collisionShape]);

      this._collisionObjectPromises.push(promise);

      return promise;
  }

  public addCollisionVerticalCylinder(
      position: BABYLON.Vector3,
      rotation: BABYLON.Vector3,
      radius: number,
      height: number,
      segments: number,
      dragPlane: BABYLON.Nullable<BABYLON.Vector3> = new BABYLON.Vector3(
          0,
          1,
          0
      ),
      collisionRestitution?: number,
      dontCreateMesh?: boolean
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const collisionShape = {
          params: [radius, height, segments],
          createMesh: SDFHelper.CreateVerticalCylinder,
          sdEvaluate: SDFHelper.SDVerticalCylinder,
          computeNormal: SDFHelper.ComputeSDFNormal,
          rotation: rotation.clone(),
          position: position.clone(),
          mesh: null as any,
          transf: new BABYLON.Matrix(),
          scale: 1,
          invTransf: new BABYLON.Matrix(),
          dragPlane,
          collisionRestitution,
      };

      const promise: Promise<
          [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
      > = dontCreateMesh
          ? Promise.resolve([null, collisionShape])
          : this._createMeshForCollision(collisionShape);

      this._collisionObjectPromises.push(promise);

      return promise;
  }

  public addCollisionMesh(
      position: BABYLON.Vector3,
      rotation: BABYLON.Vector3,
      meshFilename: string,
      sdfFilename: string,
      createNormals = false,
      scale = 1,
      dragPlane: BABYLON.Nullable<BABYLON.Vector3> = new BABYLON.Vector3(
          0,
          1,
          0
      ),
      collisionRestitution?: number,
      dontCreateMesh?: boolean
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const collisionShape = {
          params: [meshFilename, sdfFilename, createNormals],
          createMesh: SDFHelper.CreateMesh,
          sdEvaluate: SDFHelper.SDMesh,
          computeNormal: SDFHelper.ComputeSDFNormal,
          rotation: rotation.clone(),
          position: position.clone(),
          mesh: null as any,
          transf: new BABYLON.Matrix(),
          scale,
          invTransf: new BABYLON.Matrix(),
          dragPlane,
          collisionRestitution,
      };

      const promise: Promise<
          [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
      > = dontCreateMesh
          ? Promise.resolve([null, collisionShape])
          : this._createMeshForCollision(collisionShape);

      this._collisionObjectPromises.push(promise);

      return promise;
  }

  public addCollisionTerrain(
      size: number
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const collisionShape = {
          params: [size],
          createMesh: SDFHelper.CreateTerrain,
          sdEvaluate: SDFHelper.SDTerrain,
          computeNormal: SDFHelper.ComputeTerrainNormal,
          mesh: null as any,
          transf: new BABYLON.Matrix(),
          scale: 1,
          invTransf: new BABYLON.Matrix(),
          dragPlane: null,
      };

      const promise: Promise<
          [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
      > = this._createMeshForCollision(collisionShape);

      this._collisionObjectPromises.push(promise);

      return promise;
  }

  protected async _createMeshForCollision(
      shape: ICollisionShape
  ): Promise<[BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]> {
      const mesh = await shape.createMesh?.(
          this._scene,
          shape,
          ...shape.params
      );

      shape.position = shape.position ?? new BABYLON.Vector3(0, 0, 0);
      if (!shape.rotation && !shape.rotationQuaternion) {
          shape.rotation = new BABYLON.Vector3(0, 0, 0);
      }

      if (!mesh) {
          return [null, shape];
      }

      mesh.position = shape.position;
      if (shape.rotation) {
          mesh.rotation = shape.rotation;
      } else {
          mesh.rotationQuaternion = shape.rotationQuaternion!;
      }

      shape.mesh = mesh;

      if (shape.dragPlane) {
          const camera =
              this._scene.activeCameras?.[0] ?? this._scene.activeCamera!;

          const pointerDragBehavior = new BABYLON.PointerDragBehavior({
              dragPlaneNormal: shape.dragPlane,
          });
          pointerDragBehavior.useObjectOrientationForDragging = false;

          pointerDragBehavior.onDragStartObservable.add(() => {
              camera.detachControl();
          });

          pointerDragBehavior.onDragEndObservable.add(() => {
              camera.attachControl();
          });

          mesh.addBehavior(pointerDragBehavior);
      }

      return [mesh, shape];
  }

  protected async _generateParticles(regenerateAll = true) {
      await this._particleGenerator?.generateParticles(
          this._numParticles,
          regenerateAll
      );

      if (
          this._fluidSim &&
          this._particleGenerator &&
          this._fluidSim.positions !== this._particleGenerator.positions
      ) {
          this._fluidSim.setParticleData(
              this._particleGenerator.positions,
              this._particleGenerator.velocities
          );

          this._fluidRenderObject.object.vertexBuffers["position"]?.dispose();
          this._fluidRenderObject.object.vertexBuffers["velocity"]?.dispose();

          this._fluidRenderObject.object.vertexBuffers["position"] =
              new BABYLON.VertexBuffer(
                  this._engine,
                  this._fluidSim.positions,
                  BABYLON.VertexBuffer.PositionKind,
                  true,
                  false,
                  3,
                  true
              );
          this._fluidRenderObject.object.vertexBuffers["velocity"] =
              new BABYLON.VertexBuffer(
                  this._engine,
                  this._fluidSim.velocities,
                  "velocity",
                  true,
                  false,
                  3,
                  true
              );
      }
  }

  protected _makeGUIMainMenu(): void {
      // empty
  }

  protected _syncFluidSimGUI(): void {
      for (const [elem, obj, property] of this._fluidSimGUIElements) {
          (elem.object as any)[elem.property] = obj[property];
          elem.updateDisplay();
      }
  }

  protected _makeGUI(): void {
      this._gui = new lil.GUI({ title: "Demo" });
      this._gui.domElement.style.marginBottom = "40px";
      this._gui.domElement.style.right = "20px";
      this._gui.domElement.style.bottom = "0px";
      this._gui.domElement.style.top = "initial";
      this._gui.domElement.id = "simGUI";
      

      const params = {
          demo: FluidSimulationDemoBase._DemoList[
              FluidSimulationDemoBase._CurrentDemoIndex
          ].name,
          environment: this._environmentFile,
          paused: false,
          numParticles: this._numParticles,
          smoothingRadius: this._fluidSim?.smoothingRadius,
          densityReference: this._fluidSim?.densityReference,
          pressureConstant: this._fluidSim?.pressureConstant,
          viscosity: this._fluidSim?.viscosity,
          minTimeStep: this._fluidSim?.minTimeStep,
          maxVelocity: this._fluidSim?.maxVelocity,
          maxAcceleration: this._fluidSim?.maxAcceleration,
          shapeCollisionRestitution: this._shapeCollisionRestitution,
      };

      const demoList: string[] = [];
      for (const demo of FluidSimulationDemoBase._DemoList) {
          demoList.push(demo.name);
      }

      this._gui
          .add(params, "demo", demoList)
          .name("Name")
          .onChange((value: any) => {
              for (
                  let i = 0;
                  i < FluidSimulationDemoBase._DemoList.length;
                  ++i
              ) {
                  if (FluidSimulationDemoBase._DemoList[i].name === value) {
                      FluidSimulationDemoBase.StartDemo(i);
                      break;
                  }
              }
          });

      this._gui
          .add(params, "environment", envNames)
          .name("Environment")
          .onChange((value: any) => {
              this._environmentFile = value;
              this._setEnvironment();
          });

      this._makeGUIMainMenu();

      if (this._fluidSim && this._particleGenerator) {
          const menuFluidSim = this._gui.addFolder("Fluid Simulator");

          menuFluidSim.$title.style.fontWeight = "bold";

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "numParticles", 0, 40000, 88)
                  .name("Num particles")
                  .onChange((value: any) => {
                      this._numParticles = value;
                      this._generateParticles(false);
                  }),
              this,
              "_numParticles",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "smoothingRadius", 0, 2, 0.001)
                  .name("Smoothing radius")
                  .onChange((value: any) => {
                      this._fluidSim!.smoothingRadius = value || 0.04;
                      this._particleGenerator!.particleRadius =
                          this._fluidSim!.smoothingRadius / 2;
                  }),
              this._fluidSim,
              "smoothingRadius",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "densityReference", 0, 50000, 100)
                  .name("Density reference")
                  .onChange((value: any) => {
                      this._fluidSim!.densityReference = value;
                  }),
              this._fluidSim,
              "densityReference",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "pressureConstant", 0, 100, 1)
                  .name("Pressure constant")
                  .onChange((value: any) => {
                      this._fluidSim!.pressureConstant = value;
                  }),
              this._fluidSim,
              "pressureConstant",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "viscosity", 0, 0.1, 0.001)
                  .name("Viscosity")
                  .onChange((value: any) => {
                      this._fluidSim!.viscosity = value;
                  }),
              this._fluidSim,
              "viscosity",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "maxVelocity", 0, 20, 1)
                  .name("Max velocity")
                  .onChange((value: any) => {
                      this._fluidSim!.maxVelocity = value;
                  }),
              this._fluidSim,
              "maxVelocity",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "maxAcceleration", 0, 100000, 10)
                  .name("Max acceleration")
                  .onChange((value: any) => {
                      this._fluidSim!.maxAcceleration = value;
                  }),
              this._fluidSim,
              "maxAcceleration",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "minTimeStep", 0, 0.01, 0.00001)
                  .name("Min time step")
                  .onChange((value: any) => {
                      this._fluidSim!.minTimeStep = value;
                  }),
              this._fluidSim,
              "minTimeStep",
          ]);

          this._fluidSimGUIElements.push([
              menuFluidSim
                  .add(params, "shapeCollisionRestitution", 0, 1, 0.001)
                  .name("Collision restitution")
                  .onChange((value: any) => {
                      this._shapeCollisionRestitution = value;
                  }),
              this,
              "_shapeCollisionRestitution",
          ]);

          menuFluidSim
              .add(params, "paused")
              .name("Pause")
              .onChange((value: boolean) => {
                  this._onPaused(value);
              });

          menuFluidSim.open();
      }
  }

  protected _onPaused(value: boolean) {
      this._paused = value;
  }

  protected _checkCollisions(particleRadius: number): void {
      if (this._collisionObjects.length === 0) {
          return;
      }

      const positions = this._fluidSim!.positions;
      const velocities = this._fluidSim!.velocities;

      const tmpQuat = BABYLON.TmpVectors.Quaternion[0];
      const tmpScale = BABYLON.TmpVectors.Vector3[0];

      tmpScale.copyFromFloats(1, 1, 1);

      for (let i = 0; i < this._collisionObjects.length; ++i) {
          const shape = this._collisionObjects[i][1];

          const quat =
              shape.mesh?.rotationQuaternion ??
              shape.rotationQuaternion ??
              BABYLON.Quaternion.FromEulerAnglesToRef(
                  shape.mesh?.rotation.x ?? shape.rotation!.x,
                  shape.mesh?.rotation.y ?? shape.rotation!.y,
                  shape.mesh?.rotation.z ?? shape.rotation!.z,
                  tmpQuat
              );
          BABYLON.Matrix.ComposeToRef(
              tmpScale,
              quat,
              shape.mesh?.position ?? shape.position!,
              shape.transf
          );

          shape.transf.invertToRef(shape.invTransf);
      }

      const pos = BABYLON.TmpVectors.Vector3[4];
      const normal = BABYLON.TmpVectors.Vector3[7];

      for (let a = 0; a < this._fluidSim!.currentNumParticles; ++a) {
          const px = positions[a * 3 + 0];
          const py = positions[a * 3 + 1];
          const pz = positions[a * 3 + 2];

          for (let i = 0; i < this._collisionObjects.length; ++i) {
              const shape = this._collisionObjects[i][1];
              if (shape.disabled) {
                  continue;
              }

              pos.copyFromFloats(px, py, pz);
              BABYLON.Vector3.TransformCoordinatesToRef(
                  pos,
                  shape.invTransf,
                  pos
              );
              pos.scaleInPlace(1 / shape.scale);
              const dist =
                  shape.scale * shape.sdEvaluate(pos, ...shape.params) -
                  particleRadius;
              if (dist < 0) {
                  shape.computeNormal(pos, shape, normal);

                  const restitution =
                      shape.collisionRestitution ??
                      this._shapeCollisionRestitution;

                  const dotvn =
                      velocities[a * 3 + 0] * normal.x +
                      velocities[a * 3 + 1] * normal.y +
                      velocities[a * 3 + 2] * normal.z;

                  velocities[a * 3 + 0] =
                      (velocities[a * 3 + 0] - 2 * dotvn * normal.x) *
                      restitution;
                  velocities[a * 3 + 1] =
                      (velocities[a * 3 + 1] - 2 * dotvn * normal.y) *
                      restitution;
                  velocities[a * 3 + 2] =
                      (velocities[a * 3 + 2] - 2 * dotvn * normal.z) *
                      restitution;

                  positions[a * 3 + 0] -= normal.x * dist;
                  positions[a * 3 + 1] -= normal.y * dist;
                  positions[a * 3 + 2] -= normal.z * dist;
              }
          }
      }
  }
}

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

class FluidSimulationDemoBoxSphere extends FluidSimulationDemoBase {
  private _checkXZBounds: boolean;
  private _boxMin: BABYLON.Vector3;
  private _boxMax: BABYLON.Vector3;
  private _boxMesh: BABYLON.Nullable<BABYLON.Mesh>;
  private _boxMaterial: BABYLON.Nullable<BABYLON.PBRMaterial>;
  private _boxMeshFront: BABYLON.Nullable<BABYLON.Mesh>;
  private _boxMaterialFront: BABYLON.Nullable<BABYLON.PBRMaterial>;
  private _origCollisionPlanes: Array<BABYLON.Plane>;
  private _collisionPlanes: Array<
      [BABYLON.Nullable<BABYLON.Mesh>, ICollisionShape]
  >;
  private _angleX: number;
  private _angleY: number;
  private _prevTransfo: BABYLON.Matrix;
  private _autoRotateBox: boolean;
  // private _wallMesh: BABYLON.Nullable<BABYLON.Mesh>;
  private _passPP: BABYLON.PostProcess;
  private _sceneRenderObserver: BABYLON.Nullable<
      BABYLON.Observer<BABYLON.Scene>
  >;
  private _sceneAfterCameraRenderObserver: BABYLON.Nullable<
      BABYLON.Observer<BABYLON.Camera>
  >;
  private _sceneKeyboardObserver: BABYLON.Nullable<
      BABYLON.Observer<BABYLON.KeyboardInfo>
  >;
  private _onEngineResizeObserver: BABYLON.Nullable<
      BABYLON.Observer<BABYLON.Engine>
  >;

  constructor(scene: BABYLON.Scene) {
      super(scene);

      this._boxMin = new BABYLON.Vector3(-0.3, -0.3, -0.7);
      this._boxMax = new BABYLON.Vector3(0.3, 1.2, 0.7);
      this._boxMesh = null;
      this._boxMaterial = null;
      this._boxMeshFront = null;
      this._boxMaterialFront = null;

      this._checkXZBounds = true;
      this._origCollisionPlanes = [
          new BABYLON.Plane(0, 0, -1, Math.abs(this._boxMax.z)),
          new BABYLON.Plane(0, 0, 1, Math.abs(this._boxMin.z)),
          new BABYLON.Plane(1, 0, 0, Math.abs(this._boxMin.x)),
          new BABYLON.Plane(-1, 0, 0, Math.abs(this._boxMax.x)),
          new BABYLON.Plane(0, -1, 0, Math.abs(this._boxMax.y)),
          new BABYLON.Plane(0, 1, 0, Math.abs(this._boxMin.y)),
          new BABYLON.Plane(0, 1, 0, Math.abs(this._boxMin.y)),
      ];
      this._collisionPlanes = [];
      for (let i = 0; i < this._origCollisionPlanes.length; ++i) {
          const plane = this._origCollisionPlanes[i];
          this.addCollisionPlane(
              plane.normal,
              plane.d,
              i === this._origCollisionPlanes.length - 1 ? 0.98 : undefined
          );
      }

      this._angleX = 0;
      this._angleY = 0;
      this._prevTransfo = BABYLON.Matrix.Identity();
      this._autoRotateBox = false;

      this._sceneRenderObserver = null;
      this._sceneAfterCameraRenderObserver = null;
      this._sceneKeyboardObserver = null;
      this._onEngineResizeObserver = null;

      this._passPP = new BABYLON.PassPostProcess(
          "pass",
          1,
          null,
          undefined,
          this._engine
      );
      this._passPP.externalTextureSamplerBinding = true;
  }

  protected async _run() {
      // Get collision meshes
      for (let i = 0; i < this._origCollisionPlanes.length; ++i) {
          this._collisionPlanes.push(this._collisionObjects[i]);
      }

      // Reset camera
      const camera =
          this._scene.activeCameras?.[0] ?? this._scene.activeCamera;

      if (camera) {
          (camera as BABYLON.ArcRotateCamera).alpha = 3.06;
          (camera as BABYLON.ArcRotateCamera).beta = 1.14;
          (camera as BABYLON.ArcRotateCamera).radius = 2.96;

          camera.outputRenderTarget = new BABYLON.RenderTargetTexture(
              "rttFinal",
              {
                  width: this._engine.getRenderWidth(),
                  height: this._engine.getRenderHeight(),
              },
              this._scene
          );
      }

      // Simulation parameters
      this._fluidRenderObject.object.particleSize = 0.08;

      this._fluidSim!.smoothingRadius = 0.04;
      this._fluidSim!.densityReference = 20000;
      this._fluidSim!.pressureConstant = 4;
      this._fluidSim!.viscosity = 0.01;
      this._fluidSim!.maxVelocity = 3;
      this._fluidSim!.maxAcceleration = 2000;

      // Create materials
      this._boxMaterial = new BABYLON.PBRMaterial("BoxMeshMat", this._scene);
      this._boxMaterial.metallic = 0.3;
      this._boxMaterial.roughness = 0;
      this._boxMaterial.alpha = 0.2;
      this._boxMaterial.backFaceCulling = true;
      this._boxMaterial.cullBackFaces = false;

      this._boxMaterialFront = this._boxMaterial.clone("BoxMeshFrontMat");
      this._boxMaterialFront.cullBackFaces = true;

      // Create meshes
      this._boxMesh = BABYLON.MeshBuilder.CreateBox(
          "boxMesh",
          {
              width: this._boxMax.x - this._boxMin.x,
              height: this._boxMax.y - this._boxMin.y,
              depth: this._boxMax.z - this._boxMin.z,
          },
          this._scene
      );
      this._boxMesh.material = this._boxMaterial;
      this._boxMesh.position.x = (this._boxMin.x + this._boxMax.x) / 2;
      this._boxMesh.position.y = (this._boxMin.y + this._boxMax.y) / 2;
      this._boxMesh.position.z = (this._boxMin.z + this._boxMax.z) / 2;
      this._boxMesh.isPickable = false;

      this._boxMeshFront = this._boxMesh.clone("boxMeshFront");
      this._boxMeshFront.material = this._boxMaterialFront;
      this._boxMeshFront.layerMask = 0x10000000; // make sure the mesh is not displayed by the camera - we will display it ourselves by a direct call to render()

      // Keyboard handling
      let arrowLeftDown = false;
      let arrowRightDown = false;
      let arrowUpDown = false;
      let arrowDownDown = false;

      this._scene.onKeyboardObservable.add((kbInfo) => {
          switch (kbInfo.type) {
              case BABYLON.KeyboardEventTypes.KEYDOWN:
                  if (kbInfo.event.code === "ArrowLeft") {
                      arrowLeftDown = true;
                  } else if (kbInfo.event.code === "ArrowRight") {
                      arrowRightDown = true;
                  } else if (kbInfo.event.code === "ArrowUp") {
                      arrowUpDown = true;
                  } else if (kbInfo.event.code === "ArrowDown") {
                      arrowDownDown = true;
                  }
                  break;
              case BABYLON.KeyboardEventTypes.KEYUP:
                  if (kbInfo.event.code === "ArrowLeft") {
                      arrowLeftDown = false;
                  } else if (kbInfo.event.code === "ArrowRight") {
                      arrowRightDown = false;
                  } else if (kbInfo.event.code === "ArrowUp") {
                      arrowUpDown = false;
                  } else if (kbInfo.event.code === "ArrowDown") {
                      arrowDownDown = false;
                  }
                  break;
          }
      });

      // Render the front side of the box
      this._passPP.onApplyObservable.add((effect) => {
          effect.setTexture("textureSampler", camera!.outputRenderTarget);
      });

      let depthIsShared = false;
      this._sceneAfterCameraRenderObserver =
          this._scene.onAfterCameraRenderObservable.add(() => {
              const firstPP = camera?._getFirstPostProcess();
              if (
                  firstPP &&
                  firstPP.inputTexture.depthStencilTexture &&
                  !depthIsShared
              ) {
                  firstPP.inputTexture._shareDepth(
                      camera!.outputRenderTarget!.renderTarget!
                  );
                  depthIsShared = true;
              }
              if (depthIsShared) {
                  this._boxMeshFront?.render(
                      this._boxMeshFront.subMeshes[0],
                      true
                  );
                  this._scene.postProcessManager.directRender(
                      [this._passPP!],
                      null
                  );
              }
          });

      this._onEngineResizeObserver = this._engine.onResizeObservable.add(
          () => {
              camera?.outputRenderTarget?.resize({
                  width: this._engine.getRenderWidth(true),
                  height: this._engine.getRenderHeight(true),
              });
              depthIsShared = false;
          }
      );

      // Move meshes
      this._sceneRenderObserver = this._scene.onBeforeRenderObservable.add(
          () => {
              if (arrowLeftDown) {
                  this._angleX += (2 * 30) / 60;
                  this._rotateMeshes(this._angleX, this._angleY);
              }
              if (arrowRightDown) {
                  this._angleX -= (2 * 30) / 60;
                  this._rotateMeshes(this._angleX, this._angleY);
              }
              if (arrowUpDown) {
                  this._angleY -= (2 * 30) / 60;
                  this._rotateMeshes(this._angleX, this._angleY);
              }
              if (arrowDownDown) {
                  this._angleY += (2 * 30) / 60;
                  this._rotateMeshes(this._angleX, this._angleY);
              }

              if (this._autoRotateBox) {
                  const fps = this._engine.getFps();
                  this._angleX += 20 / fps;
                  this._angleY += 30 / fps;
                  this._rotateMeshes(this._angleX, this._angleY);
              }
          }
      );

      super._run();
  }

  public dispose(): void {
      super.dispose();

      const camera =
          this._scene.activeCameras?.[0] ?? this._scene.activeCamera;

      if (camera) {
          camera.outputRenderTarget?.dispose();
          camera.outputRenderTarget = null;
      }

      this._scene.onBeforeRenderObservable.remove(this._sceneRenderObserver);
      this._scene.onAfterCameraRenderObservable.remove(
          this._sceneAfterCameraRenderObserver
      );
      this._scene.onKeyboardObservable.remove(this._sceneKeyboardObserver);

      this._passPP.dispose();
      this._boxMesh?.dispose();
      this._boxMeshFront?.dispose();
      this._boxMaterial?.dispose();
      this._engine.onResizeObservable.remove(this._onEngineResizeObserver);
  }

  protected _makeGUIMainMenu(): void {
      const params = {
          checkXZBounds: true,
          autoRotateBox: false,
          restart: () => {
              this._angleX = this._angleY = 0;
              this._autoRotateBox = false;
              autoRotateBoxCtrl?.setValue(false);
              this._rotateMeshes(0, 0);
              this._generateParticles();
          },
          boxOpacity: this._boxMaterial!.alpha,
      };

      const mainMenu = this._gui!;

      let autoRotateBoxCtrl: BABYLON.Nullable<lil.Controller> = null;

      mainMenu.add(params, "restart").name("Restart");

      mainMenu
          .add(params, "checkXZBounds")
          .name("Check box bounds")
          .onChange((value: boolean) => {
              this._checkXZBounds = value;
              this._boxMesh?.setEnabled(value);
              this._boxMeshFront?.setEnabled(value);
              for (let i = 0; i < this._collisionPlanes.length; ++i) {
                  this._collisionPlanes[i][1].disabled =
                      (!value && i < this._collisionPlanes.length - 1) ||
                      (value && i === this._collisionPlanes.length - 1);
              }
              if (!value) {
                  this._autoRotateBox = false;
                  autoRotateBoxCtrl?.setValue(false);
              }
          });

      autoRotateBoxCtrl = mainMenu
          .add(params, "autoRotateBox")
          .name("Auto rotate box")
          .onChange((value: boolean) => {
              this._autoRotateBox = value;
          });

      mainMenu
          .add(params, "boxOpacity", 0, 1, 0.01)
          .name("Box opacity")
          .onChange((value: any) => {
              this._boxMaterial!.alpha = value;
              this._boxMaterialFront!.alpha = value;
          });
  }

  protected _onPaused(value: boolean) {
      super._onPaused(value);

      if (value) {
          this._autoRotateBox = false;
      }
  }

  protected _rotateMeshes(angleX: number, angleY: number): void {
      const transfo = BABYLON.Matrix.RotationYawPitchRoll(
          0,
          (angleX * Math.PI) / 180,
          (angleY * Math.PI) / 180
      );

      const boxVertices = [
          new BABYLON.Vector3(this._boxMin.x, this._boxMin.y, this._boxMin.z),
          new BABYLON.Vector3(this._boxMin.x, this._boxMax.y, this._boxMin.z),
          new BABYLON.Vector3(this._boxMin.x, this._boxMax.y, this._boxMax.z),
          new BABYLON.Vector3(this._boxMin.x, this._boxMin.y, this._boxMax.z),
          new BABYLON.Vector3(this._boxMax.x, this._boxMin.y, this._boxMin.z),
          new BABYLON.Vector3(this._boxMax.x, this._boxMax.y, this._boxMin.z),
          new BABYLON.Vector3(this._boxMax.x, this._boxMax.y, this._boxMax.z),
          new BABYLON.Vector3(this._boxMax.x, this._boxMin.y, this._boxMax.z),
      ];

      let ymin = 1e10;
      for (let i = 0; i < boxVertices.length; ++i) {
          const v = BABYLON.Vector3.TransformCoordinates(
              boxVertices[i],
              transfo
          );
          ymin = Math.min(ymin, v.y);
      }

      this._collisionPlanes[
          this._origCollisionPlanes.length - 1
      ][1].params[1] = Math.abs(ymin) + 0.02;

      for (let i = 0; i < this._origCollisionPlanes.length - 1; ++i) {
          const plane = this._origCollisionPlanes[i].transform(transfo);
          this._collisionPlanes[i][1].params = [plane.normal, plane.d];
      }

      const quat = BABYLON.Quaternion.FromRotationMatrix(transfo);

      this._prevTransfo.invert();

      if (this._boxMesh && this._boxMeshFront) {
          this._boxMesh.rotationQuaternion =
              this._boxMeshFront.rotationQuaternion = quat;
          this._boxMesh.position.x = (this._boxMin.x + this._boxMax.x) / 2;
          this._boxMesh.position.y = (this._boxMin.y + this._boxMax.y) / 2;
          this._boxMesh.position.z = (this._boxMin.z + this._boxMax.z) / 2;
          this._boxMesh.position = BABYLON.Vector3.TransformCoordinates(
              this._boxMesh.position,
              transfo
          );
          this._boxMeshFront.position = this._boxMesh.position;
      }

      this._prevTransfo.copyFrom(transfo);
  }
}

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// Based on https://github.com/rlguy/SPHFluidSim/blob/master/src/sphfluidsimulation.cpp
interface IFluidParticle {
  mass: number;
  density: number;
  pressure: number;
  accelX: number;
  accelY: number;
  accelZ: number;
}

class FluidSimulator {
  protected _particles: IFluidParticle[];
  protected _numMaxParticles: number;
  protected _positions: Float32Array;
  protected _velocities: Float32Array;
  protected _hash: Hash;

  protected _smoothingRadius2: number;
  protected _poly6Constant: number;
  protected _spikyConstant: number;
  protected _viscConstant: number;

  protected _smoothingRadius = 0.2;

  public get smoothingRadius() {
      return this._smoothingRadius;
  }

  public set smoothingRadius(radius: number) {
      this._smoothingRadius = radius;
      this._computeConstants();
  }

  public densityReference = 2000;

  public pressureConstant = 20;

  public viscosity = 0.005;

  public gravity = new BABYLON.Vector3(0, -9.8, 0);

  public minTimeStep = 1 / 100;

  public maxVelocity = 75;

  public maxAcceleration = 2000;

  public currentNumParticles: number;

  private _mass: number;

  public get mass() {
      return this._mass;
  }

  public set mass(m: number) {
      for (let i = 0; i < this._particles.length; ++i) {
          this._particles[i].mass = m;
      }
  }

  private _computeConstants(): void {
      this._smoothingRadius2 = this._smoothingRadius * this._smoothingRadius;
      this._poly6Constant =
          315 / (64 * Math.PI * Math.pow(this._smoothingRadius, 9));
      this._spikyConstant =
          -45 / (Math.PI * Math.pow(this._smoothingRadius, 6));
      this._viscConstant =
          45 / (Math.PI * Math.pow(this._smoothingRadius, 6));
      this._hash = new Hash(this._smoothingRadius, this._numMaxParticles);
  }

  public get positions() {
      return this._positions;
  }

  public get velocities() {
      return this._velocities;
  }

  public get numMaxParticles() {
      return this._numMaxParticles;
  }

  public setParticleData(
      positions?: Float32Array,
      velocities?: Float32Array
  ): void {
      this._positions = positions ?? new Float32Array();
      this._velocities = velocities ?? new Float32Array();
      this._numMaxParticles = this._positions.length / 3;
      this._hash = new Hash(this._smoothingRadius, this._numMaxParticles);

      for (let i = this._particles.length; i < this._numMaxParticles; ++i) {
          this._particles.push({
              mass: this.mass,
              density: 0,
              pressure: 0,
              accelX: 0,
              accelY: 0,
              accelZ: 0,
          });
      }
  }

  constructor(positions?: Float32Array, velocities?: Float32Array, mass = 1) {
      this._positions = undefined as any;
      this._velocities = undefined as any;
      this._particles = [];
      this._numMaxParticles = 0;
      this._mass = mass;

      if (positions && velocities) {
          this.setParticleData(positions, velocities);
      }

      this._hash = new Hash(this._smoothingRadius, this._numMaxParticles);

      this.currentNumParticles = this._numMaxParticles;

      this._smoothingRadius2 = 0;
      this._poly6Constant = 0;
      this._spikyConstant = 0;
      this._viscConstant = 0;

      this._computeConstants();
  }

  public update(deltaTime: number): void {
      let timeLeft = deltaTime;

      while (timeLeft > 0) {
          this._hash.create(this._positions, this.currentNumParticles);
          this._computeDensityAndPressure();
          this._computeAcceleration();

          let timeStep = this._calculateTimeStep();

          timeLeft -= timeStep;
          if (timeLeft < 0) {
              timeStep += timeLeft;
              timeLeft = 0;
          }

          this._updatePositions(timeStep);
      }
  }

  public dispose(): void {
      // nothing to do
  }

  protected _computeDensityAndPressure(): void {
      for (let a = 0; a < this.currentNumParticles; ++a) {
          const pA = this._particles[a];
          const paX = this._positions[a * 3 + 0];
          const paY = this._positions[a * 3 + 1];
          const paZ = this._positions[a * 3 + 2];

          pA.density = 0;

          this._hash.query(this._positions, a, this._smoothingRadius);

          for (let ib = 0; ib < this._hash.querySize; ++ib) {
              const b = this._hash.queryIds[ib];
              const diffX = paX - this._positions[b * 3 + 0];
              const diffY = paY - this._positions[b * 3 + 1];
              const diffZ = paZ - this._positions[b * 3 + 2];
              const r2 = diffX * diffX + diffY * diffY + diffZ * diffZ;

              if (r2 < this._smoothingRadius2) {
                  const w =
                      this._poly6Constant *
                      Math.pow(this._smoothingRadius2 - r2, 3);
                  pA.density += w;
              }
          }

          pA.density = Math.max(this.densityReference, pA.density);
          pA.pressure =
              this.pressureConstant * (pA.density - this.densityReference);
      }
  }

  protected _computeAcceleration(): void {
      // Pressurce-based acceleration + viscosity-based acceleration computation
      for (let a = 0; a < this.currentNumParticles; ++a) {
          const pA = this._particles[a];
          const paX = this._positions[a * 3 + 0];
          const paY = this._positions[a * 3 + 1];
          const paZ = this._positions[a * 3 + 2];

          const vaX = this._velocities[a * 3 + 0];
          const vaY = this._velocities[a * 3 + 1];
          const vaZ = this._velocities[a * 3 + 2];

          let pressureAccelX = 0;
          let pressureAccelY = 0;
          let pressureAccelZ = 0;

          let viscosityAccelX = 0;
          let viscosityAccelY = 0;
          let viscosityAccelZ = 0;

          this._hash.query(this._positions, a, this._smoothingRadius);

          for (let ib = 0; ib < this._hash.querySize; ++ib) {
              const b = this._hash.queryIds[ib];
              let diffX = paX - this._positions[b * 3 + 0];
              let diffY = paY - this._positions[b * 3 + 1];
              let diffZ = paZ - this._positions[b * 3 + 2];
              const r2 = diffX * diffX + diffY * diffY + diffZ * diffZ;
              const r = Math.sqrt(r2);

              if (r > 0 && r2 < this._smoothingRadius2) {
                  const pB = this._particles[b];

                  diffX /= r;
                  diffY /= r;
                  diffZ /= r;

                  const w =
                      this._spikyConstant *
                      (this._smoothingRadius - r) *
                      (this._smoothingRadius - r);
                  const massRatio = pB.mass / pA.mass;
                  const fp =
                      w *
                      ((pA.pressure + pB.pressure) /
                          (2 * pA.density * pB.density)) *
                      massRatio;

                  pressureAccelX -= fp * diffX;
                  pressureAccelY -= fp * diffY;
                  pressureAccelZ -= fp * diffZ;

                  const w2 = this._viscConstant * (this._smoothingRadius - r);
                  const fv =
                      w2 * (1 / pB.density) * massRatio * this.viscosity;

                  viscosityAccelX += fv * (this._velocities[b * 3 + 0] - vaX);
                  viscosityAccelY += fv * (this._velocities[b * 3 + 1] - vaY);
                  viscosityAccelZ += fv * (this._velocities[b * 3 + 2] - vaZ);
              }
          }

          pA.accelX = pressureAccelX + viscosityAccelX;
          pA.accelY = pressureAccelY + viscosityAccelY;
          pA.accelZ = pressureAccelZ + viscosityAccelZ;

          pA.accelX += this.gravity.x;
          pA.accelY += this.gravity.y;
          pA.accelZ += this.gravity.z;

          const mag = Math.sqrt(
              pA.accelX * pA.accelX +
                  pA.accelY * pA.accelY +
                  pA.accelZ * pA.accelZ
          );

          if (mag > this.maxAcceleration) {
              pA.accelX = (pA.accelX / mag) * this.maxAcceleration;
              pA.accelY = (pA.accelY / mag) * this.maxAcceleration;
              pA.accelZ = (pA.accelZ / mag) * this.maxAcceleration;
          }
      }
  }

  protected _calculateTimeStep() {
      let maxVelocity = 0;
      let maxAcceleration = 0;
      let maxSpeedOfSound = 0;

      for (let a = 0; a < this.currentNumParticles; ++a) {
          const pA = this._particles[a];

          const velSq =
              this._velocities[a * 3 + 0] * this._velocities[a * 3 + 0] +
              this._velocities[a * 3 + 1] * this._velocities[a * 3 + 1] +
              this._velocities[a * 3 + 2] * this._velocities[a * 3 + 2];
          const accSq =
              pA.accelX * pA.accelX +
              pA.accelY * pA.accelY +
              pA.accelZ * pA.accelZ;
          const spsSq = pA.density < 0.00001 ? 0 : pA.pressure / pA.density;

          if (velSq > maxVelocity) {
              maxVelocity = velSq;
          }
          if (accSq > maxAcceleration) {
              maxAcceleration = accSq;
          }
          if (spsSq > maxSpeedOfSound) {
              maxSpeedOfSound = spsSq;
          }
      }

      maxVelocity = Math.sqrt(maxVelocity);
      maxAcceleration = Math.sqrt(maxAcceleration);
      maxSpeedOfSound = Math.sqrt(maxSpeedOfSound);

      const velStep = (0.4 * this.smoothingRadius) / Math.max(1, maxVelocity);
      const accStep = 0.4 * Math.sqrt(this.smoothingRadius / maxAcceleration);
      const spsStep = this.smoothingRadius / maxSpeedOfSound;

      return Math.max(this.minTimeStep, Math.min(velStep, accStep, spsStep));
  }

  protected _updatePositions(deltaTime: number): void {
      for (let a = 0; a < this.currentNumParticles; ++a) {
          const pA = this._particles[a];

          this._velocities[a * 3 + 0] += pA.accelX * deltaTime;
          this._velocities[a * 3 + 1] += pA.accelY * deltaTime;
          this._velocities[a * 3 + 2] += pA.accelZ * deltaTime;

          const mag = Math.sqrt(
              this._velocities[a * 3 + 0] * this._velocities[a * 3 + 0] +
                  this._velocities[a * 3 + 1] * this._velocities[a * 3 + 1] +
                  this._velocities[a * 3 + 2] * this._velocities[a * 3 + 2]
          );

          if (mag > this.maxVelocity) {
              this._velocities[a * 3 + 0] =
                  (this._velocities[a * 3 + 0] / mag) * this.maxVelocity;
              this._velocities[a * 3 + 1] =
                  (this._velocities[a * 3 + 1] / mag) * this.maxVelocity;
              this._velocities[a * 3 + 2] =
                  (this._velocities[a * 3 + 2] / mag) * this.maxVelocity;
          }

          this._positions[a * 3 + 0] +=
              deltaTime * this._velocities[a * 3 + 0];
          this._positions[a * 3 + 1] +=
              deltaTime * this._velocities[a * 3 + 1];
          this._positions[a * 3 + 2] +=
              deltaTime * this._velocities[a * 3 + 2];
      }
  }
}

class ParticleGenerator {
  private _scene: BABYLON.Scene;
  private _observer: BABYLON.Nullable<BABYLON.Observer<BABYLON.Scene>>;
  private _currNumParticles: number;
  private _numCrossSection: number;
  private _numParticles = 0;
  private _positions: Float32Array;
  private _velocities: Float32Array;
  private _loadFromFile: string | undefined;

  public particleRadius: number;

  public position: BABYLON.Vector3;

  public get currNumParticles() {
      return this._currNumParticles;
  }

  public get positions() {
      return this._positions;
  }

  public get velocities() {
      return this._velocities;
  }

  constructor(scene: BABYLON.Scene, loadFromFile?: string) {
      this._scene = scene;
      this._currNumParticles = 0;
      this._numCrossSection = 0;
      this._positions = new Float32Array();
      this._velocities = new Float32Array();
      this.particleRadius = 0;
      this._loadFromFile = loadFromFile;
      this.position = new BABYLON.Vector3(0, 0, 0);

      if (!this._loadFromFile) {
          this._observer = scene.onBeforeRenderObservable.add(() => {
              if (this._currNumParticles === 0) {
                  if (this._positions.length / 3 >= this._numCrossSection) {
                      this._currNumParticles = this._numCrossSection;
                  }
              } else if (this._currNumParticles < this._numParticles) {
                  const px1 = this._positions[this._currNumParticles * 3 + 0];
                  const py1 = this._positions[this._currNumParticles * 3 + 1];
                  const pz1 = this._positions[this._currNumParticles * 3 + 2];

                  const px2 =
                      this._positions[
                          (this._currNumParticles - this._numCrossSection) *
                              3 +
                              0
                      ];
                  const py2 =
                      this._positions[
                          (this._currNumParticles - this._numCrossSection) *
                              3 +
                              1
                      ];
                  const pz2 =
                      this._positions[
                          (this._currNumParticles - this._numCrossSection) *
                              3 +
                              2
                      ];

                  const dist = Math.sqrt(
                      (px1 - px2) * (px1 - px2) +
                          (py1 - py2) * (py1 - py2) +
                          (pz1 - pz2) * (pz1 - pz2)
                  );

                  if (dist > this.particleRadius * 2) {
                      this._currNumParticles += this._numCrossSection;
                  }
              }
          });
      } else {
          this._observer = null;
      }
  }

  public async generateParticles(
      numTotParticles: number,
      regenerateAll = true
  ) {
      if (this._loadFromFile) {
          await this._generateParticlesFromFile(this._loadFromFile);
      } else {
          this._generateParticles(numTotParticles, regenerateAll);
      }
  }

  private async _generateParticlesFromFile(fileName: string) {
      const data = await (
          await fetch(`https://popov72.github.io/FluidRendering/src/assets/particles/${fileName}.txt`)
      ).text();

      const lines = data.replace("\r", "").split("\n");

      const particlePos = [];
      const particleVel = [];

      let numParticles = 0;

      for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          const vals = line.split(",");
          if (line.charAt(0) === '"' || vals.length < 4) {
              continue;
          }
          particlePos.push(
              parseFloat(vals[1]) + this.position.x,
              parseFloat(vals[2]) + +this.position.y,
              parseFloat(vals[3]) + this.position.z
          );
          particleVel.push(0, 0, 0);
          numParticles++;
      }

      const particleStartIndex = 0;

      this._numParticles = this._numCrossSection = numParticles;

      if (this._numParticles > this._positions.length / 3) {
          const newPositions = new Float32Array(this._numParticles * 3);
          const newVelocities = new Float32Array(this._numParticles * 3);

          newPositions.set(this._positions, 0);
          newVelocities.set(this._velocities, 0);

          this._positions = newPositions;
          this._velocities = newVelocities;
      }

      this._positions.set(particlePos, particleStartIndex * 3);
      this._velocities.set(particleVel, particleStartIndex * 3);

      this._currNumParticles = this._numParticles;
  }

  private _generateParticles(
      numTotParticles: number,
      regenerateAll = true
  ): void {
      if (this._numParticles >= numTotParticles && !regenerateAll) {
          this._numParticles = numTotParticles;
          this._currNumParticles = Math.min(
              this._currNumParticles,
              this._numParticles
          );
          return;
      }

      const dimX = 12,
          dimY = 12;

      const particlePos = [];
      const particleVel = [];

      const distance = this.particleRadius * 2;
      const jitter = distance * 0.1;
      const getJitter = () => Math.random() * jitter - jitter / 2;

      const particleStartIndex = regenerateAll ? 0 : this._currNumParticles;

      this._numParticles = particleStartIndex;

      while (this._numParticles <= numTotParticles - this._numCrossSection) {
          let yCoord = (dimY / 2) * distance;

          this._numCrossSection = 0;
          for (let y = 1; y < dimY - 1; ++y) {
              const angle = (y * Math.PI) / (dimY - 1);

              let x2 = ((Math.sin(angle) * dimX) / 2) * distance;
              if (x2 < 0) {
                  x2 = 0;
              }

              let xCoord = -x2;
              while (xCoord <= x2) {
                  const xc =
                      xCoord === -x2 || xCoord + distance > x2
                          ? xCoord
                          : xCoord + getJitter();
                  const yc =
                      xCoord === -x2 || xCoord + distance > x2
                          ? yCoord
                          : yCoord + getJitter();
                  const zCoord =
                      xCoord === -x2 || xCoord + distance > x2
                          ? 0.49
                          : 0.49 + getJitter();
                  particlePos.push(
                      xc + this.position.x,
                      yc + this.position.y,
                      zCoord + this.position.z
                  );
                  particleVel.push(
                      (Math.random() - 0.5) * 0.03,
                      (Math.random() - 0.5) * 0.03,
                      (Math.random() - 1.0) * 0.03 - 1.5
                  );
                  xCoord += distance;
                  this._numParticles++;
                  this._numCrossSection++;
              }

              yCoord += distance;
          }
      }

      if (this._numParticles > this._positions.length / 3) {
          const newPositions = new Float32Array(this._numParticles * 3);
          const newVelocities = new Float32Array(this._numParticles * 3);

          newPositions.set(this._positions, 0);
          newVelocities.set(this._velocities, 0);

          this._positions = newPositions;
          this._velocities = newVelocities;
      }

      this._positions.set(particlePos, particleStartIndex * 3);
      this._velocities.set(particleVel, particleStartIndex * 3);

      this._currNumParticles = particleStartIndex;
  }

  public dispose(): void {
      this._scene.onBeforeRenderObservable.remove(this._observer);
      this._observer = null;
  }
}

/**
* From https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/11-hashing.html
*/

class Hash {
  private _spacing: number;
  private _tableSize: number;
  private _cellStart: Int32Array;
  private _cellEntries: Int32Array;
  private _queryIds: Int32Array;
  private _querySize: number;

  public get querySize() {
      return this._querySize;
  }

  public get queryIds() {
      return this._queryIds;
  }

  constructor(spacing: number, maxNumObjects: number) {
      this._spacing = spacing;
      this._tableSize = 2 * maxNumObjects;
      this._cellStart = new Int32Array(this._tableSize + 1);
      this._cellEntries = new Int32Array(maxNumObjects);
      this._queryIds = new Int32Array(maxNumObjects);
      this._querySize = 0;
  }

  public hashCoords(xi: number, yi: number, zi: number) {
      const h = (xi * 92837111) ^ (yi * 689287499) ^ (zi * 283923481); // fantasy function
      //const h = (xi * 73856093) ^ (yi * 19349663) ^ (zi * 83492791); // fantasy function
      return Math.abs(h) % this._tableSize;
  }

  public intCoord(coord: number) {
      return Math.floor(coord / this._spacing);
  }

  public hashPos(pos: number[] | Float32Array, nr: number) {
      return this.hashCoords(
          this.intCoord(pos[3 * nr]),
          this.intCoord(pos[3 * nr + 1]),
          this.intCoord(pos[3 * nr + 2])
      );
  }

  public create(pos: number[] | Float32Array, numElements?: number) {
      numElements = numElements ?? pos.length / 3;

      const numObjects = Math.min(numElements, this._cellEntries.length);

      // determine cell sizes
      this._cellStart.fill(0);
      this._cellEntries.fill(0);

      for (let i = 0; i < numObjects; i++) {
          const h = this.hashPos(pos, i);
          this._cellStart[h]++;
      }

      // determine cells starts
      let start = 0;
      for (let i = 0; i < this._tableSize; i++) {
          start += this._cellStart[i];
          this._cellStart[i] = start;
      }
      this._cellStart[this._tableSize] = start; // guard

      // fill in objects ids
      for (let i = 0; i < numObjects; i++) {
          const h = this.hashPos(pos, i);
          this._cellStart[h]--;
          this._cellEntries[this._cellStart[h]] = i;
      }
  }

  public query(pos: number[] | Float32Array, nr: number, maxDist: number) {
      const x0 = this.intCoord(pos[3 * nr] - maxDist);
      const y0 = this.intCoord(pos[3 * nr + 1] - maxDist);
      const z0 = this.intCoord(pos[3 * nr + 2] - maxDist);

      const x1 = this.intCoord(pos[3 * nr] + maxDist);
      const y1 = this.intCoord(pos[3 * nr + 1] + maxDist);
      const z1 = this.intCoord(pos[3 * nr + 2] + maxDist);

      this._querySize = 0;

      for (let xi = x0; xi <= x1; xi++) {
          for (let yi = y0; yi <= y1; yi++) {
              for (let zi = z0; zi <= z1; zi++) {
                  const h = this.hashCoords(xi, yi, zi);
                  const start = this._cellStart[h];
                  const end = this._cellStart[h + 1];

                  for (let i = start; i < end; i++) {
                      this._queryIds[this._querySize] = this._cellEntries[i];
                      this._querySize++;
                  }
              }
          }
      }
  }
}

// Textures from https://freepbr.com/materials/sulphuric-rock/
const rockBaseColor = "https://popov72.github.io/FluidRendering/src/assets/materials/sulphuric-rock_albedo.png";
const rockRoughness = "https://popov72.github.io/FluidRendering/src/assets/materials/sulphuric-rock_roughness.png";
const rockNormal = "https://popov72.github.io/FluidRendering/src/assets/materials/sulphuric-rock_normal-ogl.png";

const marbleBaseColor = "https://popov72.github.io/FluidRendering/src/assets/materials/Marble08_1K_BaseColor.png";

const eps = 0.0001;

const eps1 = new BABYLON.Vector3(eps, -eps, -eps);
const eps2 = new BABYLON.Vector3(-eps, -eps, eps);
const eps3 = new BABYLON.Vector3(-eps, eps, -eps);
const eps4 = new BABYLON.Vector3(eps, eps, eps);

const dir1 = new BABYLON.Vector3(1, -1, -1);
const dir2 = new BABYLON.Vector3(-1, -1, 1);
const dir3 = new BABYLON.Vector3(-1, 1, -1);
const dir4 = new BABYLON.Vector3(1, 1, 1);

interface SDFArray {
  origin: BABYLON.Vector3;
  dimX: number;
  dimY: number;
  dimZ: number;
  step: number;
  data: number[];
}

interface ICollisionShape {
  params: Array<any>;
  sdEvaluate: (p: BABYLON.Vector3, ...args: any[]) => number;
  computeNormal: (
      pos: BABYLON.Vector3,
      shape: ICollisionShape,
      normal: BABYLON.Vector3
  ) => void;
  createMesh?: (
      scene: BABYLON.Scene,
      shape: ICollisionShape,
      ...args: any[]
  ) => Promise<BABYLON.Mesh>;
  transf: BABYLON.Matrix;
  invTransf: BABYLON.Matrix;
  scale: number;
  position?: BABYLON.Vector3;
  rotation?: BABYLON.Vector3;
  rotationQuaternion?: BABYLON.Quaternion;
  mesh?: BABYLON.Mesh;
  dragPlane: BABYLON.Nullable<BABYLON.Vector3>;
  disabled?: boolean;
  collisionRestitution?: number;
}

class SDFHelper {
  public static CreateBox(
      scene: BABYLON.Scene,
      shape: ICollisionShape,
      extents: BABYLON.Vector3
  ) {
      const box = BABYLON.MeshBuilder.CreateBox(
          "box",
          {
              width: extents.x * 2,
              height: extents.y * 2,
              depth: extents.z * 2,
          },
          scene
      );

      const material = new BABYLON.PBRMaterial("boxMat", scene);

      material.metallic = 0;
      material.roughness = 0.9;
      material.albedoTexture = new BABYLON.Texture(
          "textures/wood.jpg",
          scene
      );
      material.cullBackFaces = true;

      box.material = material;

      return Promise.resolve(box);
  }

  public static CreateVerticalCylinder(
      scene: BABYLON.Scene,
      shape: ICollisionShape,
      r: number,
      h: number,
      segments: number
  ) {
      const cylinder = BABYLON.MeshBuilder.CreateCylinder(
          "cylinder",
          { diameter: r * 2, height: h, tessellation: segments },
          scene
      );

      const material = new BABYLON.PBRMaterial("cylinderMat", scene);

      material.metallic = 1;
      material.roughness = 0.05;
      material.albedoTexture = new BABYLON.Texture(marbleBaseColor, scene);
      material.cullBackFaces = true;

      cylinder.material = material;

      return Promise.resolve(cylinder);
  }

  public static CreateTerrain(
      scene: BABYLON.Scene,
      shape: ICollisionShape,
      size: number
  ) {
      const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
          "terrain",
          "textures/heightMap.png",
          {
              width: size,
              height: size,
              subdivisions: 128,
              maxHeight: size / 5,
              onReady: () => ground!.updateCoordinateHeights(),
          },
          scene
      );

      const mat = new BABYLON.PBRMaterial("mat", scene);

      mat.metallicTexture = new BABYLON.Texture(rockRoughness, scene);
      mat.albedoTexture = new BABYLON.Texture(rockBaseColor, scene);
      mat.bumpTexture = new BABYLON.Texture(rockNormal, scene);
      mat.useRoughnessFromMetallicTextureGreen = true;
      mat.metallic = 0;
      mat.roughness = 1;

      ground.material = mat;

      shape.params.push(ground);

      return Promise.resolve(ground);
  }

  protected static _ParseSDFData(textData: string): SDFArray {
      const lines = textData.replace("\r", "").split("\n");

      const dimLine = lines[0].split(" ");

      const dimX = parseFloat(dimLine[0]);
      const dimY = parseFloat(dimLine[1]);
      const dimZ = parseFloat(dimLine[2]);

      const originLine = lines[1].split(" ");

      const origin = new BABYLON.Vector3(
          parseFloat(originLine[0]),
          parseFloat(originLine[1]),
          parseFloat(originLine[2])
      );

      const step = parseFloat(lines[2]);

      const data: number[] = [];

      for (let i = 3; i < lines.length; ++i) {
          const val = lines[i];
          if (val.length === 0) {
              continue;
          }
          data.push(parseFloat(val));
      }

      return {
          dimX,
          dimY,
          dimZ,
          origin,
          step,
          data,
      };
  }

  public static CreateMesh(
      scene: BABYLON.Scene,
      shape: ICollisionShape,
      meshFilename: string,
      sdfFilename: string,
      createNormals: boolean
  ): Promise<BABYLON.Mesh> {
      return new Promise((resolve) => {
          const promises = [
              BABYLON.SceneLoader.ImportMeshAsync(
                  "",
                  assetsDir + "scenes/",
                  meshFilename,
                  scene
              ),
              new Promise((resolve) => {
                  fetch(assetsDir + "sdf/" + sdfFilename).then((response) => {
                      response.text().then((text) => {
                          shape.params.push(SDFHelper._ParseSDFData(text));
                          resolve(void 0);
                      });
                  });
              }),
          ];

          Promise.all(promises).then((results) => {
              const meshes = results[0] as BABYLON.ISceneLoaderAsyncResult;
              const mesh = meshes.meshes[0] as BABYLON.Mesh;
              if (!mesh.material) {
                  const material = new BABYLON.PBRMaterial("meshMat", scene);

                  material.metallic = 1;
                  material.roughness = 0.05;
                  material.albedoTexture = new BABYLON.Texture(
                      rockBaseColor,
                      scene
                  );
                  material.cullBackFaces = true;

                  mesh.material = material;
              }
              if (createNormals) {
                  mesh.createNormals(false);
              }
              mesh.scaling.setAll(shape.scale);
              resolve(mesh);
          });
      });
  }

  // SD functions from https://iquilezles.org/articles/distfunctions/
  public static SDBox(p: BABYLON.Vector3, b: BABYLON.Vector3) {
      const q = BABYLON.TmpVectors.Vector3[0];
      q.copyFromFloats(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z));
      q.subtractInPlace(b);

      const tmp = Math.min(Math.max(q.x, q.y, q.z), 0);

      q.maximizeInPlaceFromFloats(0, 0, 0);

      return q.length() + tmp;
  }

  public static SDPlane(p: BABYLON.Vector3, n: BABYLON.Vector3, h: number) {
      return BABYLON.Vector3.Dot(p, n) + h;
  }

  public static SDVerticalCylinder(p: BABYLON.Vector3, r: number, h: number) {
      const dx = Math.abs(Math.sqrt(p.x * p.x + p.z * p.z)) - r;
      const dy = Math.abs(p.y) - h;
      const dx2 = Math.max(dx, 0);
      const dy2 = Math.max(dy, 0);

      return (
          Math.min(Math.max(dx, dy), 0.0) + Math.sqrt(dx2 * dx2 + dy2 * dy2)
      );
  }

  public static SDTerrain(
      p: BABYLON.Vector3,
      size: number,
      terrain: BABYLON.GroundMesh
  ) {
      return p.y - terrain.getHeightAtCoordinates(p.x, p.z);
  }

  public static SDMesh(
      p: BABYLON.Vector3,
      meshFilename: string,
      sdfFilename: string,
      createNormals: boolean,
      sdf: SDFArray
  ) {
      const x = (p.x - sdf.origin.x) / sdf.step;
      const y = (p.y - sdf.origin.y) / sdf.step;
      const z = (p.z - sdf.origin.z) / sdf.step;

      let gx = Math.floor(x);
      let gy = Math.floor(y);
      let gz = Math.floor(z);

      gx = Math.max(Math.min(gx, sdf.dimX - 2), 0);
      gy = Math.max(Math.min(gy, sdf.dimY - 2), 0);
      gz = Math.max(Math.min(gz, sdf.dimZ - 2), 0);

      // trilinear filtering
      const fx = x - gx;
      const fy = y - gy;
      const fz = z - gz;

      const a00 = sdf.data[gz * sdf.dimY * sdf.dimX + gy * sdf.dimX + gx];
      const a10 = sdf.data[gz * sdf.dimY * sdf.dimX + gy * sdf.dimX + gx + 1];
      const a11 =
          sdf.data[gz * sdf.dimY * sdf.dimX + (gy + 1) * sdf.dimX + gx + 1];
      const a01 =
          sdf.data[gz * sdf.dimY * sdf.dimX + (gy + 1) * sdf.dimX + gx];

      const a0 = a00 * (1 - fx) + a10 * fx;
      const a1 = a01 * (1 - fx) + a11 * fx;
      const a = a0 * (1 - fy) + a1 * fy;

      const b00 =
          sdf.data[(gz + 1) * sdf.dimY * sdf.dimX + gy * sdf.dimX + gx];
      const b10 =
          sdf.data[(gz + 1) * sdf.dimY * sdf.dimX + gy * sdf.dimX + gx + 1];
      const b11 =
          sdf.data[
              (gz + 1) * sdf.dimY * sdf.dimX + (gy + 1) * sdf.dimX + gx + 1
          ];
      const b01 =
          sdf.data[(gz + 1) * sdf.dimY * sdf.dimX + (gy + 1) * sdf.dimX + gx];

      const b0 = b00 * (1 - fx) + b10 * fx;
      const b1 = b01 * (1 - fx) + b11 * fx;
      const b = b0 * (1 - fy) + b1 * fy;

      const d = a * (1 - fz) + b * fz;
      //const d = sdf.data[gz * sdf.dimY * sdf.dimX + gy * sdf.dimX + gx];

      return d;
  }

  // normal computed with the Tetrahedron technique, see https://iquilezles.org/articles/normalsSDF/
  public static ComputeSDFNormal(
      pos: BABYLON.Vector3,
      shape: ICollisionShape,
      normal: BABYLON.Vector3
  ) {
      const posTemp = BABYLON.TmpVectors.Vector3[5];
      const dir = BABYLON.TmpVectors.Vector3[6];

      normal.copyFromFloats(0, 0, 0);

      posTemp.copyFrom(pos);
      dir.copyFrom(dir1);
      normal.addInPlace(
          dir.scaleInPlace(
              shape.sdEvaluate(posTemp.addInPlace(eps1), ...shape.params)
          )
      );

      posTemp.copyFrom(pos);
      dir.copyFrom(dir2);
      normal.addInPlace(
          dir.scaleInPlace(
              shape.sdEvaluate(posTemp.addInPlace(eps2), ...shape.params)
          )
      );

      posTemp.copyFrom(pos);
      dir.copyFrom(dir3);
      normal.addInPlace(
          dir.scaleInPlace(
              shape.sdEvaluate(posTemp.addInPlace(eps3), ...shape.params)
          )
      );

      posTemp.copyFrom(pos);
      dir.copyFrom(dir4);
      normal.addInPlace(
          dir.scaleInPlace(
              shape.sdEvaluate(posTemp.addInPlace(eps4), ...shape.params)
          )
      );

      BABYLON.Vector3.TransformNormalToRef(normal, shape.transf, normal);

      normal.normalize();
  }

  public static ComputeTerrainNormal(
      pos: BABYLON.Vector3,
      shape: ICollisionShape,
      normal: BABYLON.Vector3
  ) {
      const terrain = shape.params[1] as BABYLON.GroundMesh;

      terrain.getNormalAtCoordinatesToRef(pos.x, pos.z, normal);
  }
}
