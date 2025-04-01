"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  EngineOptions,
  Nullable,
  Scene,
  SceneOptions,
} from "@babylonjs/core";

interface BabylonjsProps {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  observeCanvasResize?: boolean; // Automatically trigger engine resize when the canvas resizes (default: true)
  onRender?: (scene: Scene) => void;
  children?: React.ReactNode;
}
const BabylonCanvas = (
  props: BabylonjsProps & React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    renderChildrenWhenReady,
    children,
    ...rest
  } = props;

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;

    const engine = new Engine(
      canvasRef.current,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);

    let resizeObserver: Nullable<ResizeObserver> = null;
    if (props.observeCanvasResize !== false && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        engine.resize();
        if (scene.activeCamera /* needed for rendering */) {
          // render to prevent flickering on resize
          if (typeof onRender === "function") {
            onRender(scene);
          }
          scene.render();
        }
      });
      resizeObserver.observe(canvasRef.current!);
    }

    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce(() => {
        onSceneReady(scene);
      });
    }

    engine.runRenderLoop(() => {
      if (scene.activeCamera) {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      } else {
        console.log("No active camera found in the scene");
      }
    });

    const resize = () => {
      scene.getEngine().resize();
    };
    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      if (resizeObserver !== null) {
        resizeObserver.disconnect();
      }
      if (window) {
        window.removeEventListener("resize", resize);
      }
      scene.getEngine().dispose();
    };
  }, [canvasRef, antialias, engineOptions, adaptToDeviceRatio, sceneOptions]);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      style={{
        width: "300px",
        height: "300px",
        background: "transparent", // remove background
        outline: "none", // remove border
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
        ...rest?.style,
      }}
    />
  );
};
export default BabylonCanvas;
