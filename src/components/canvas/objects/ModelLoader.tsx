import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useStore } from "../../../store";

interface ModelLoaderProps {
  path: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export const ModelLoader = ({ 
  path, 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0] 
}: ModelLoaderProps) => {
  const groupRef = useRef<Group>(null!);
  const { scene } = useGLTF(path);
  const { selectObject } = useStore();
  
  // Clone the scene to avoid references to the cached scene
  const model = scene.clone();
  
  // Add shadow properties to all meshes
  model.traverse((node) => {
    if (node.isObject3D) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  
  return (
    <group 
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        selectObject(groupRef.current);
      }}
    >
      <primitive object={model} />
    </group>
  );
};

// Use this in the actual app with actual model paths
// The path below is just a placeholder - no need to preload a non-existent file
// useGLTF.preload('/models/sample.glb'); 