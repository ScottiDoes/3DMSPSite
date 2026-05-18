"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScene, WAYPOINTS } from "@/context/SceneContext";

// ─── Camera Controller ────────────────────────────────────────────────────────
const LERP_FACTOR = 1.4;

export function CameraController() {
  const { camera } = useThree();
  const { activeSection, mouse } = useScene();
  const currentLookAt = useRef(new THREE.Vector3(-1.6, 7, -15));
  const targetLookAt  = useRef(new THREE.Vector3(-1.6, 7, -15));
  const targetPos     = useRef(new THREE.Vector3(0, 4, 9));

  useFrame((_, delta) => {
    const wp = WAYPOINTS[activeSection];
    const dt = Math.min(delta, 0.05);

    targetPos.current.set(...wp.position);
    targetLookAt.current.set(...wp.lookAt);

    // Subtle mouse parallax
    if (wp.rotateMode === "rotTheta") {
      targetPos.current.x += mouse.x * 0.4;
    } else if (wp.rotateMode === "rotZ") {
      targetPos.current.y += mouse.y * 0.2;
    }

    camera.position.lerp(targetPos.current, LERP_FACTOR * dt);
    currentLookAt.current.lerp(targetLookAt.current, LERP_FACTOR * dt);
    camera.lookAt(currentLookAt.current);

    const fovDiff = wp.fov - (camera as THREE.PerspectiveCamera).fov;
    if (Math.abs(fovDiff) > 0.01) {
      (camera as THREE.PerspectiveCamera).fov += fovDiff * LERP_FACTOR * 1.4 * dt;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}

// ─── Server Node (octahedron) ─────────────────────────────────────────────────
function Node({
  position,
  size = 0.3,
  color = "#FF0099",
  emissiveIntensity = 1.0,
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
  emissiveIntensity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const speed  = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * speed + offset) * 0.18;
    ref.current.rotation.y = clock.elapsedTime * speed * 0.25;
    ref.current.rotation.x = clock.elapsedTime * speed * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

// ─── Glowing ring ─────────────────────────────────────────────────────────────
function Ring({
  position,
  radius = 2,
  color = "#FF0099",
  speed = 0.15,
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * speed;
    ref.current.rotation.z = clock.elapsedTime * speed * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.025, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

// ─── Static connection lines ──────────────────────────────────────────────────
function Lines({
  nodes,
  maxDist = 5,
  color = "#FF0099",
  opacity = 0.15,
}: {
  nodes: [number, number, number][];
  maxDist?: number;
  color?: string;
  opacity?: number;
}) {
  const geo = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = new THREE.Vector3(...nodes[i]);
        const b = new THREE.Vector3(...nodes[j]);
        if (a.distanceTo(b) < maxDist) {
          positions.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes, maxDist]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

// ─── Star field ───────────────────────────────────────────────────────────────
function Stars({ count = 700 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 100;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} sizeAttenuation transparent opacity={0.4} />
    </points>
  );
}

// ─── World positions (camera looks toward these) ──────────────────────────────
// Hero lookAt:    [-1.6, 7, -15]
// Services lookAt:[0,   9.5, 18]
// WhyUs lookAt:   [15,  3,    0]
// Work lookAt:    [14,  7.5, -11]
// Contact lookAt: [-1,  8,   -9]  (overlaps hero zone)

const HERO_NODES:    [number,number,number][] = [
  [-1.6,7,-15],[-3,5,-14],[1,9,-16],[-2,10,-13],[0,6,-17],[-4,8,-15],[2,7,-13],[-1,4,-12],
];
const SERVICE_NODES: [number,number,number][] = [
  [0,9.5,18],[-3,8,17],[3,11,19],[0,7,16],[-2,10,20],[2,9,15],[4,8,18],[-4,7,19],[1,12,17],[-1,6,21],
];
const WHYUS_NODES:   [number,number,number][] = [
  [15,3,0],[13,5,1],[17,2,-1],[15,6,2],[12,3,-2],[18,4,0],[14,1,1],[16,5,-2],
];
const WORK_NODES:    [number,number,number][] = [
  [14,7.5,-11],[12,6,-10],[16,9,-12],[13,8,-9],[15,5,-13],[11,7,-11],[17,8,-10],[14,10,-12],
];

export function WorldScene() {
  const allNodes = useMemo(
    () => [...HERO_NODES, ...SERVICE_NODES, ...WHYUS_NODES, ...WORK_NODES],
    []
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[-1.6,7,-15]}  intensity={3}   color="#FF0099" distance={22} />
      <pointLight position={[0,9.5,18]}    intensity={2}   color="#00FF85" distance={22} />
      <pointLight position={[15,3,0]}      intensity={2}   color="#1E90FF" distance={26} />
      <pointLight position={[14,7.5,-11]}  intensity={2}   color="#FF0099" distance={22} />

      <Stars count={700} />

      {/* ── Hero zone — hot pink hub ── */}
      {HERO_NODES.map((pos, i) => (
        <Node key={`h${i}`} position={pos}
          size={i === 0 ? 0.6 : 0.2 + Math.random() * 0.15}
          color={i === 0 ? "#FF0099" : i % 2 === 0 ? "#FF0099" : "#00FF85"}
          emissiveIntensity={i === 0 ? 1.5 : 0.8}
        />
      ))}
      <Ring position={[-1.6,7,-15]} radius={2.6} color="#FF0099" speed={0.12} />
      <Ring position={[-1.6,7,-15]} radius={1.5} color="#1E90FF" speed={0.2} />
      <Lines nodes={HERO_NODES} maxDist={4} color="#FF0099" opacity={0.2} />

      {/* ── Services zone — green ring ── */}
      {SERVICE_NODES.map((pos, i) => (
        <Node key={`s${i}`} position={pos}
          size={i === 0 ? 0.5 : 0.18 + Math.random() * 0.1}
          color={i % 3 === 0 ? "#00FF85" : i % 3 === 1 ? "#FF0099" : "#1E90FF"}
          emissiveIntensity={0.9}
        />
      ))}
      <Ring position={[0,9.5,18]} radius={3.2} color="#00FF85" speed={0.1} />
      <Ring position={[0,9.5,18]} radius={1.8} color="#FF0099" speed={0.18} />
      <Lines nodes={SERVICE_NODES} maxDist={5} color="#00FF85" opacity={0.18} />

      {/* ── Why Us zone — blue strip ── */}
      {WHYUS_NODES.map((pos, i) => (
        <Node key={`w${i}`} position={pos}
          size={0.25 + i * 0.05}
          color={i % 2 === 0 ? "#1E90FF" : "#FF0099"}
          emissiveIntensity={0.9}
        />
      ))}
      <Ring position={[15,3,0]} radius={2.2} color="#1E90FF" speed={0.14} />
      <Lines nodes={WHYUS_NODES} maxDist={4} color="#1E90FF" opacity={0.2} />

      {/* ── Work zone — pink/green cluster ── */}
      {WORK_NODES.map((pos, i) => (
        <Node key={`k${i}`} position={pos}
          size={i === 0 ? 0.55 : 0.2}
          color={i === 0 ? "#00FF85" : i % 2 === 0 ? "#FF0099" : "#1E90FF"}
          emissiveIntensity={i === 0 ? 1.3 : 0.7}
        />
      ))}
      <Ring position={[14,7.5,-11]} radius={2.1} color="#00FF85" speed={0.16} />
      <Lines nodes={WORK_NODES} maxDist={4} color="#FF0099" opacity={0.18} />

      {/* Long-range backbone lines */}
      <Lines nodes={allNodes} maxDist={9} color="#FF0099" opacity={0.04} />
    </>
  );
}
