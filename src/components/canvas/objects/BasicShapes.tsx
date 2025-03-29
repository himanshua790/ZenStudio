import { useRef, useState, useEffect } from "react";
import { Mesh } from "three";
import { useStore } from "../../../store";
import { Outlines } from "@react-three/drei";

interface BasicShapeProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export const Box = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  color = "#ffffff",
}: BasicShapeProps) => {
  const meshRef = useRef<Mesh>(null!);
  const { selectObject, selectedObjectId, addObject } = useStore();
  const [hovered, setHovered] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  // After initial render, store the UUID and register object with store
  useEffect(() => {
    if (meshRef.current) {
      setUuid(meshRef.current.uuid);
      // Register this object with the store
      addObject(meshRef.current);
    }
  }, [addObject]);

  const isSelected = selectedObjectId === uuid;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        if (uuid) {
          selectObject(uuid);
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.5} />
      {/* Show outline when hovered or selected */}
      {(hovered || isSelected) && (
        <Outlines
          thickness={isSelected ? 6 : 3}
          color={isSelected ? "#ff9770" : "#2196f3"}
          transparent
          opacity={0.8}
        />
      )}
    </mesh>
  );
};

export const Sphere = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  color = "#ffffff",
}: BasicShapeProps) => {
  const meshRef = useRef<Mesh>(null!);
  const { selectObject, selectedObjectId, addObject } = useStore();
  const [hovered, setHovered] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  // After initial render, store the UUID and register object with store
  useEffect(() => {
    if (meshRef.current) {
      setUuid(meshRef.current.uuid);
      // Register this object with the store
      addObject(meshRef.current);
    }
  }, [addObject]);

  const isSelected = selectedObjectId === uuid;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        if (uuid) {
          selectObject(uuid);
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.5} />
      {/* Show outline when hovered or selected */}
      {(hovered || isSelected) && (
        <Outlines
          thickness={isSelected ? 6 : 3}
          color={isSelected ? "#ff9770" : "#2196f3"}
          transparent
          opacity={0.8}
        />
      )}
    </mesh>
  );
};

export const Plane = ({
  position = [0, 0, 0],
  scale = [10, 10, 1],
  rotation = [-Math.PI / 2, 0, 0],
  color = "#444444",
}: BasicShapeProps) => {
  const meshRef = useRef<Mesh>(null!);
  const { selectObject, selectedObjectId, addObject } = useStore();
  const [hovered, setHovered] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  // After initial render, store the UUID and register object with store
  useEffect(() => {
    if (meshRef.current) {
      setUuid(meshRef.current.uuid);
      // Register this object with the store
      addObject(meshRef.current);
    }
  }, [addObject]);

  const isSelected = selectedObjectId === uuid;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        if (uuid) {
          selectObject(uuid);
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      receiveShadow
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
      {/* Show outline when hovered or selected */}
      {(hovered || isSelected) && (
        <Outlines
          thickness={isSelected ? 6 : 3}
          color={isSelected ? "#ff9770" : "#2196f3"}
          transparent
          opacity={0.8}
        />
      )}
    </mesh>
  );
};
