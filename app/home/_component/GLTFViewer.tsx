"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GLTFViewerProps {
  filename: string;
}
const GLTFViewer = (props: GLTFViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff6e1");

    //camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      10
    );
    camera.position.z = 3;

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    //control
    const controls = new OrbitControls(camera, mount);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.2;
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.update();

    // gltf object
    if (props.filename) {
      const loader = new GLTFLoader();
      loader.load(`/gltf/${props.filename}`, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -0.5, 0);
        scene.add(model);
      });
    }

    // light
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(0, 1, 3);
    scene.add(frontLight);

    const ambientLight = new THREE.AmbientLight("#FFF6E1", 1); // floor color
    scene.add(ambientLight);

    // // shadow
    // renderer.shadowMap.enabled = true;
    // GLTFViewer.castShadow = true;
    // floor.receiveShadow = true;
    // light.castShadow = true;
    // light.shadow.radius = 4;

    // animation
    let resetActive = false;

    const onStart = () => {
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;
      controls.minPolarAngle = Math.PI / 8;
      controls.maxPolarAngle = Math.PI / 1.5;
      resetActive = false;
    };
    const onEnd = () => {
      resetActive = true;
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);

    const smoothReset = () => {
      let alpha = controls.getAzimuthalAngle();
      let beta = controls.getPolarAngle() - Math.PI / 2;

      // close to 0
      if (Math.abs(alpha) < 0.001) alpha = 0;
      if (Math.abs(beta) < 0.001) beta = 0;

      // smooth change
      controls.minAzimuthAngle = 0.95 * alpha;
      controls.maxAzimuthAngle = controls.minAzimuthAngle;

      controls.minPolarAngle = Math.PI / 2 + 0.95 * beta;
      controls.maxPolarAngle = controls.minPolarAngle;

      // reached 0
      if (alpha == 0 && beta == 0) onStart();
    };

    // rendering
    const animationLoop = () => {
      if (resetActive) smoothReset();

      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animationLoop);

    return () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
      mount.removeChild(renderer.domElement); // DOM에서 렌더러 요소 제거
    };
  }, [props.filename]);

  return (
    <div
      ref={mountRef}
      style={{ width: "300px", height: "300px", touchAction: "none" }}
    />
  );
};
export default GLTFViewer;
