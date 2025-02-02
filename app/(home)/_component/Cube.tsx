"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const Cube = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scene
    const scene = new THREE.Scene();
    //camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      5
    );
    camera.position.z = 2;
    //control
    const controls = new OrbitControls(camera, mount);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.update();
    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    scene.add(light);

    // cube
    const geometry = new THREE.BoxGeometry();
    const materials = new THREE.MeshPhongMaterial({
      color: 0x44aa88,
      specular: 0x44ff44,
    });
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    //edge
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // animation
    let resetActive = false;

    const onStart = () => {
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI / 2;
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
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "300px", height: "300px", touchAction: "none" }}
    />
  );
};
export default Cube;
