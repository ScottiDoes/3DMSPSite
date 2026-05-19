"use client";

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Per-LED blink state: each LED gets a random phase and rate
const ledPhases: Map<string, { phase: number; rate: number; isBlue: boolean }> = new Map();

export function ServerRacks() {
  const { scene } = useGLTF("/server-rack.glb");
  const ref = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Group>(null);

  // Seed blink phases and add pink wireframe overlays on mount
  useEffect(() => {
    if (!ref.current || !wireframeRef.current) return;

    ref.current.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const isGreen = child.name.includes("LG");
      const isBlue  = child.name.includes("LB");
      if (isGreen || isBlue) {
        ledPhases.set(child.name, {
          phase: Math.random() * Math.PI * 2,
          rate:  isBlue ? 1.8 + Math.random() * 2.0 : 0.8 + Math.random() * 1.5,
          isBlue,
        });
        // Clone the material so each LED is independent
        child.material = (child.material as THREE.Material).clone();
      }

      // Pink wireframe for chassis and server sled faces only (skip tiny LEDs/blanks)
      const isBig = child.name.includes("Chassis") ||
                    child.name.includes("SV_") ||
                    child.name.includes("SW_") ||
                    child.name.includes("DFT") || child.name.includes("DFB") ||
                    child.name.includes("DFL") || child.name.includes("DFR");
      if (isBig) {
        const edges = new THREE.EdgesGeometry(child.geometry, 15);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: "#FF0099", transparent: true, opacity: 0.55 })
        );
        // Match the mesh's world transform
        line.position.copy(child.getWorldPosition(new THREE.Vector3()));
        line.rotation.copy(child.getWorldQuaternion(new THREE.Quaternion()) as unknown as THREE.Euler);
        line.scale.copy(child.getWorldScale(new THREE.Vector3()));
        wireframeRef.current!.add(line);
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;

    ref.current.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const info = ledPhases.get(child.name);
      if (!info) return;
      const mat = child.material as THREE.MeshStandardMaterial;

      if (info.isBlue) {
        // Blue LEDs: rapid staggered blink
        const raw = Math.sin(t * info.rate + info.phase);
        mat.emissiveIntensity = raw > 0.3 ? 8.0 : 0.2;
      } else {
        // Green LEDs: slow pulse with occasional off-flicker
        const pulse = (Math.sin(t * info.rate + info.phase) + 1) / 2;
        const flicker = Math.random() > 0.998 ? 0 : 1; // rare random off
        mat.emissiveIntensity = pulse * 7.0 * flicker + 0.3;
      }
    });
  });

  return (
    <>
      <group ref={ref} position={[0, -1.05, -2]} rotation={[0, 0, 0]}>
        <primitive object={scene} />
      </group>
      {/* Wireframe overlay lives in world space — populated in useEffect */}
      <group ref={wireframeRef} />
    </>
  );
}

useGLTF.preload("/server-rack.glb");
