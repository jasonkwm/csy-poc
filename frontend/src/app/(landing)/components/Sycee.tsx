"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScreen } from "usehooks-ts";
import * as THREE from "three";

const Model = ({
  position,
  hover,
  onPointerOver,
  onPointerOut,
}: {
  position: [number, number, number];
  hover: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) => {
  const { nodes, materials } = useGLTF("/3d/sycee.glb") as any;
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y, // Current y-position of the model
        hover ? position[1] + 2 : position[1], // Target y-position (higher if `hover` is true)
        0.1 // Smoothing factor (controls speed of transition)
      );
    }
  });

  return (
    <group
      ref={ref}
      dispose={null}
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={42}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Yuan_Bao.geometry}
        material={materials["Yuan Bao"]}
      />
    </group>
  );
};

export const Sycee = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rows = 7;
  const cols = 7;
  const spacingX = 8; // Space between columns
  const spacingY = 10; // Space between rows

  const gridPositions = Array.from({ length: rows * cols }, (_, i) => [
    (i % cols) * spacingX - (cols / 2) * spacingX + spacingX / 2, // X-coordinate
    0, // Y-coordinate
    Math.floor(i / cols) * spacingY - (rows / 2) * spacingY + spacingY / 2, // Z-coordinate
  ]);

  return (
    <group ref={groupRef}>
      {gridPositions.map((pos, i) => (
        <Model
          key={i}
          position={pos as [number, number, number]}
          hover={hoveredIndex === i}
          onPointerOver={() => setHoveredIndex(i)}
          onPointerOut={() => setHoveredIndex(null)}
        />
      ))}
    </group>
  );
};

useGLTF.preload("/3d/sycee.glb");
