"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import BackdropShell from "./BackdropShell";

// Just the drifting star points on the dark gradient — Three.js, but far
// lighter than the full network scene (no racks, nodes, rings, or camera dolly).
function Stars({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 120;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 70;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

export default function StarfieldBackdrop() {
  return (
    <BackdropShell>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Stars />
      </Canvas>
    </BackdropShell>
  );
}
