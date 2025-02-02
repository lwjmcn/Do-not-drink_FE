"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [prevRotationX, setPrevRotationX] = useState(0);
  const [prevRotationY, setPrevRotationY] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      5
    );
    camera.position.z = 2;
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
    // continuous rotation
    cube.rotation.x = prevRotationX;
    cube.rotation.y = prevRotationY;
    scene.add(cube);

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cube.add(edges);

    // touch/drags interaction
    let startX = 0;
    let startY = 0;
    let rotationX = prevRotationX;
    let rotationY = prevRotationY;

    const onTouchStart = (e: TouchEvent) => {
      const { clientX, clientY } = e.touches[0];
      startX = clientX;
      startY = clientY;
      setIsMouseActive(true);
    };
    mount.addEventListener("touchstart", onTouchStart);

    const onTouchMove = (e: TouchEvent) => {
      const { clientX, clientY } = e.touches[0];
      const deltaX = ((clientX - startX) / window.innerWidth) * 5;
      const deltaY = ((clientY - startY) / window.innerHeight) * 5;
      rotationX = prevRotationX + deltaY;
      rotationY = prevRotationY + deltaX;
      setIsMouseActive(true);
    };
    mount.addEventListener("touchmove", onTouchMove);

    const onTouchEnd = () => {
      setIsMouseActive(false);
      setPrevRotationX(rotationX);
      setPrevRotationY(rotationY);
    };
    mount.addEventListener("touchend", onTouchEnd);

    // animation
    const animate = () => {
      if (isMouseActive) {
        cube.rotation.x = Math.max(-0.5, Math.min(0.5, rotationX)); // updown rotation should be less than half
        cube.rotation.y = rotationY;
        requestAnimationFrame(animate);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeEventListener("touchstart", onTouchStart); // 리스너 제거
      mount.removeEventListener("touchmove", onTouchMove); // 리스너 제거
      mount.removeEventListener("touchend", onTouchEnd); // 리스너 제거
      mount.removeChild(renderer.domElement); // DOM에서 렌더러 요소 제거
    };
  }, [isMouseActive]);
  return (
    <div
      ref={mountRef}
      style={{ width: "300px", height: "300px", touchAction: "none" }}
    />
  );
};
export default Cube;
