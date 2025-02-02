"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // cube
    const geometry = new THREE.BoxGeometry();
    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0xfff000,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00fff0,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xf000ff,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xfffff0,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xfff0ff,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xf0ffff,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      }),
    ];
    const cube = new THREE.Mesh(geometry, materials);

    scene.add(cube);

    const edgesGeometry = new THREE.EdgesGeometry(geometry); // 정육면체의 모서리를 정의하는 형상 생성
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xe999999 }); // 모서리의 색상을 설정
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial); // 모서리와 재질을 결합해 선(segment) 생성
    cube.add(edges); // 정육면체에 모서리를 추가

    let mouseX = 0; // 마우스 X축 위치값 초기화
    let mouseY = 0; // 마우스 Y축 위치값 초기화

    // 창 크기 변경 시 카메라 및 렌더러의 크기 재설정
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight; // 카메라의 종횡비를 새 창 크기에 맞게 조정
      camera.updateProjectionMatrix(); // 카메라의 투영 매트릭스를 업데이트
      renderer.setSize(mount.clientWidth, mount.clientHeight); // 렌더러의 크기를 새 창 크기에 맞게 조정
    };
    window.addEventListener("resize", onResize); // 창 크기가 변경될 때 onResize 함수 실행

    // 마우스 움직임에 따라 정육면체 회전을 제어하는 함수
    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event; // 마우스의 현재 위치를 가져옴
      const { innerWidth, innerHeight } = window; // 창의 크기를 가져옴

      mouseX = (clientX / innerWidth) * 2 - 1; // 마우스의 X 위치를 -1 ~ 1 범위로 변환
      mouseY = -(clientY / innerHeight) * 2 + 1; // 마우스의 Y 위치를 -1 ~ 1 범위로 변환
      setIsMouseActive(true); // 마우스가 움직이는 상태로 변경
    };
    window.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 때 onMouseMove 함수 실행

    // 마우스가 화면을 벗어났을 때 호출되는 함수
    const onMouseLeave = () => {
      setIsMouseActive(false); // 마우스가 움직이지 않는 상태로 변경
    };
    window.addEventListener("mouseleave", onMouseLeave); // 마우스가 화면을 벗어날 때 onMouseLeave 함수 실행

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate); // 애니메이션 프레임을 요청

      if (isMouseActive) {
        cube.rotation.x += (mouseY - cube.rotation.x) * 0.1; // 마우스의 Y축 움직임에 따라 정육면체의 X축 회전값 조정
        cube.rotation.y += (mouseX - cube.rotation.y) * 0.1; // 마우스의 X축 움직임에 따라 정육면체의 Y축 회전값 조정
      } else {
        cube.rotation.x += 0.01; // 마우스가 움직이지 않으면 X축으로 천천히 회전
        cube.rotation.y += 0.01; // 마우스가 움직이지 않으면 Y축으로 천천히 회전
      }

      renderer.render(scene, camera); // 장면을 렌더링하여 화면에 표시
    };
    animate(); // 애니메이션 함수 실행

    // 컴포넌트가 언마운트될 때 이벤트 리스너 및 DOM 요소 정리
    return () => {
      window.removeEventListener("resize", onResize); // 리스너 제거
      window.removeEventListener("mousemove", onMouseMove); // 리스너 제거
      window.removeEventListener("mouseleave", onMouseLeave); // 리스너 제거
      mount.removeChild(renderer.domElement); // DOM에서 렌더러 요소 제거
    };
  }, [isMouseActive]);
  return <div ref={mountRef} style={{ width: "300px", height: "300px" }} />;
};
export default Cube;
