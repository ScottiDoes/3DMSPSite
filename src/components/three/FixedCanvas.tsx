"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useScene } from "@/context/SceneContext";
import { CameraController, WorldScene } from "./Scene";
import { useActiveSection } from "@/hooks/useActiveSection";

// Tracks mouse movement and pipes normalised [-1,1] coords into SceneContext.
function MouseTracker() {
  const { setMouse } = useScene();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [setMouse]);

  return null;
}

// Wires the IntersectionObserver. Must be inside SceneProvider.
function SectionWatcher() {
  useActiveSection();
  return null;
}

export default function FixedCanvas() {
  return (
    <>
      <MouseTracker />
      <SectionWatcher />

      {/* Position: fixed, behind all HTML content */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 60%, #111118 0%, #0D0D0D 70%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 4, 9], fov: 50, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <CameraController />
          <WorldScene />
        </Canvas>
      </div>
    </>
  );
}
