"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECTION_DIST = 3.2;
const BOUNDS = 10;

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Initial random positions + velocities
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  // Max possible line segments = N*(N-1)/2
  const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments]
  );

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const pos = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;

    // Move particles, bounce off bounds
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(pos[i * 3]) > BOUNDS) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > BOUNDS / 2) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > BOUNDS / 2) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild connection lines
    let segIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DIST) {
          const alpha = 1 - dist / CONNECTION_DIST;
          // vertex A
          linePositions[segIdx * 6] = pos[i * 3];
          linePositions[segIdx * 6 + 1] = pos[i * 3 + 1];
          linePositions[segIdx * 6 + 2] = pos[i * 3 + 2];
          // vertex B
          linePositions[segIdx * 6 + 3] = pos[j * 3];
          linePositions[segIdx * 6 + 4] = pos[j * 3 + 1];
          linePositions[segIdx * 6 + 5] = pos[j * 3 + 2];
          // colors (fade by distance)
          lineColors[segIdx * 6] = 0;
          lineColors[segIdx * 6 + 1] = alpha * 0.78;
          lineColors[segIdx * 6 + 2] = alpha;
          lineColors[segIdx * 6 + 3] = 0;
          lineColors[segIdx * 6 + 4] = alpha * 0.78;
          lineColors[segIdx * 6 + 5] = alpha;
          segIdx++;
        }
      }
    }

    // Zero out unused segment slots
    for (let i = segIdx * 6; i < maxSegments * 6; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    const lineGeo = linesRef.current.geometry;
    (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    lineGeo.setDrawRange(0, segIdx * 2);
  });

  return (
    <>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={NODE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00c8ff"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={maxSegments * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={maxSegments * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </>
  );
}

export default function ParticleNetwork() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Network />
    </Canvas>
  );
}
