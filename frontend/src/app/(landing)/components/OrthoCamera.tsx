"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useWindowSize } from "usehooks-ts";

export const OrthoCamera = () => {
  const { camera, gl, set } = useThree();
  const window = useWindowSize();

  // 1) Create the OrthographicCamera once and store it in a ref
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  if (!cameraRef.current) {
    const aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
    cameraRef.current = new THREE.OrthographicCamera(
      -10 * aspect, // left
       10 * aspect, // right
       10,          // top
      -10,          // bottom
      0.1,
      1000
    );
    cameraRef.current.position.set(20, 20, 20);
    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.zoom = 1;
    cameraRef.current.updateProjectionMatrix();

    // Tell R3F: "Use this camera from now on"
    set({ camera: cameraRef.current });
  }

  // 2) Update camera on each resize (or width change),
  //    but *do not* replace the camera instance
  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    // Recompute aspect
    const aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
    camera.left = -10 * aspect;
    camera.right = 10 * aspect;
    camera.top = 10;
    camera.bottom = -10;

    // Optionally adjust zoom if needed:
    // e.g., smaller window => larger zoom => "zoom out"
    const minWidth = 344;
    const maxWidth = 2560;
    const clampedWidth = Math.min(
      Math.max(window.width, minWidth),
      maxWidth
    );
    const t = (clampedWidth - minWidth) / (maxWidth - minWidth);

    const zoomAtMinWidth = 2;  // "zoom out" more for small screen
    const zoomAtMaxWidth = 1;  // "zoom in" for large screen
    camera.zoom = zoomAtMaxWidth + t * (zoomAtMinWidth - zoomAtMaxWidth);

    // Finally update
    camera.updateProjectionMatrix();
  }, [gl, window.width]);

  return null;
}

  return null;
};
