"use client";

import { Canvas } from "@react-three/fiber";
import { Sycee } from "./components/Sycee";
import { Environment } from "@react-three/drei";
import { Floor } from "./components/Floor";
import { OrthoCamera } from "./components/OrthoCamera";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[10, 100, 1]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <Environment preset="apartment" />

        <OrthoCamera />
        <Floor />
        <Sycee />
      </Canvas>
    </div>
  );
}
