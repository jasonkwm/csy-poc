import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export const Floor = () => {
  const { camera, viewport } = useThree();

  const planeSize = useMemo(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      // Calculate plane size based on camera dimensions
      const width = viewport.width;
      const height = viewport.height;
      return { width, height };
    }
    return { width: 0, height: 0 };
  }, [camera, viewport]);

  return (
    <mesh
      position={[0, -0.1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#b91c1c" />
    </mesh>
  );
};
