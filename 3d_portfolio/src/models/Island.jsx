/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import castleScene from "../assets/3d/upside_down_castle.glb";



export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(castleScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Pointer / mouse down
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    lastX.current = event.touches
      ? event.touches[0].clientX
      : event.clientX;
  };

  // Pointer / mouse up
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Pointer / mouse move
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches
        ? event.touches[0].clientX
        : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      rotationSpeed.current = delta * 0.01 * Math.PI;
      lastX.current = clientX;
    }
  };

  // Keyboard down
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(true);
      const dir = event.key === "ArrowLeft" ? 1 : -1;
      islandRef.current.rotation.y += dir * 0.005 * Math.PI;
      rotationSpeed.current = dir * 0.007;
    }
  };

  // Keyboard up
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch equivalents
  const handleTouchStart = handlePointerDown;
  const handleTouchMove = handlePointerMove;
  const handleTouchEnd = handlePointerUp;

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, isRotating]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const r = islandRef.current.rotation.y;
      const normalized =
        ((r % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalized >= 5.45 && normalized <= 5.85:
          setCurrentStage(4);
          break;
        case normalized >= 0.85 && normalized <= 1.3:
          setCurrentStage(3);
          break;
        case normalized >= 2.4 && normalized <= 2.6:
          setCurrentStage(2);
          break;
        case normalized >= 4.25 && normalized <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props} dispose={null}>
      {/* upside-down castle model */}
      <group scale={0.016}>
        <group
          position={[170.243, 1280.313, -219.588]}
          rotation={[-Math.PI / 2, 0, -1.581]}
          scale={[0.579, 0.447, 8.103]}
        >
          <group position={[-9427.616, 1462.284, -148.424]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_black_0.geometry}
              material={materials.black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_green_0.geometry}
              material={materials.green}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_flag_0.geometry}
              material={materials.flag}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_drain_0.geometry}
              material={materials.drain}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_wall_0.geometry}
              material={materials.wall}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.misc_roof_0.geometry}
              material={materials.roof}
            />
          </group>
        </group>
        <group
          position={[-695.388, 335.896, 41.848]}
          rotation={[-1.696, -0.507, -0.299]}
          scale={[1.388, 1.232, 1.457]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_bark_0.geometry}
            material={materials.bark}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_leaves_0.geometry}
            material={materials.leaves}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tree_rope_0.geometry}
            material={materials.rope}
          />
        </group>
        <group
          position={[-1169.901, 763.467, -145.722]}
          rotation={[-1.849, -0.222, -0.995]}
          scale={[0.983, 0.623, 0.837]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.rope_circle_rope_circle_0.geometry}
            material={materials.rope_circle}
            position={[196.07, -43.031, -373.268]}
          />
        </group>
        <group
          position={[76.575, 18.792, -190.294]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.897, 0.868, 1.029]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.floor_grass_0.geometry}
            material={materials.grass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.floor_blades_0.geometry}
            material={materials.blades}
          />
        </group>
        <group
          position={[301.187, 421.258, 54.212]}
          rotation={[Math.PI, 0.006, -Math.PI / 2]}
          scale={[0.158, 2.376, 25.615]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.floor_emission_green_0.geometry}
            material={materials.green}
            position={[-10414.524, 1618.233, -60.725]}
          />
        </group>
        <group
          position={[124.732, 92.959, 589.102]}
          rotation={[Math.PI, 0.006, -Math.PI / 2]}
          scale={[0.158, 0.811, 8.869]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.floor_emission001_green_0.geometry}
            material={materials.green}
            position={[-10414.524, 1618.233, -60.725]}
          />
        </group>
        <group
          position={[-572.557, 2719.958, -96.117]}
          rotation={[-Math.PI / 2, 0, -1.581]}
          scale={[0.579, 0.447, 8.103]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.flag_flag_0.geometry}
            material={materials.flag}
            position={[-9654.074, 3100.89, -326.1]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floating_stones_floating_stones_0.geometry}
          material={materials.floating_stones}
          position={[-1304.472, -844.025, 292.006]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stone_4_Stone_4_0.geometry}
          material={materials.Stone_4}
          position={[-628.355, 243.476, 418.825]}
          rotation={[-Math.PI / 2, 0, -0.009]}
          scale={[1, 4.16, 1.538]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.stone_1_Stone_1_0.geometry}
          material={materials.Stone_1}
          position={[-348.679, 79.5, -96.691]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[2.72, 1.466, 1.413]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stone_3_Stone_3_0.geometry}
          material={materials.Stone_3}
          position={[173.386, 216.636, 668.41]}
          rotation={[-Math.PI / 4, 0, -Math.PI / 2]}
          scale={[2.955, 0.536, 0.7]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stone_2_Stone_2_0.geometry}
          material={materials.Stone_2}
          position={[-368.014, 79.5, -117.552]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[2.72, 1.466, 1.413]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wood_wood_0.geometry}
          material={materials.wood}
          position={[1008.586, -2.15, -745.88]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
          scale={[2.603, 3.686, 13.038]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.grass_blades_0.geometry}
          material={materials.blades}
          position={[-759.042, 18.792, 4301.639]}
          rotation={[-Math.PI / 2, 0, 1.394]}
          scale={[0.867, 0.732, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.floorbars_black_0.geometry}
          material={materials.black}
          position={[296.851, 420.201, 94.809]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[7.709, 8.88, 1]}
        />
      </group>
    </a.group>
  );
}
