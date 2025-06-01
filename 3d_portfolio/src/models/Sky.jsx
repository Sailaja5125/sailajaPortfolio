import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import  skyScene  from "../assets/3d/sky2.glb"
// Preload the skybox so it's ready when component mounts


export function Sky({ isRotating }) {
  // Load nodes/materials from the anime sky GLB
  const { nodes, materials } = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      // rotate around the Y-axis
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <group ref={skyRef} dispose={null}>
      {/* Scale down the default unit sphere, then massively enlarge it as a skybox */}
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere__0.geometry}
          material={materials["Scene_-_Root"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={50000}
        />
      </group>
    </group>
  );
}
