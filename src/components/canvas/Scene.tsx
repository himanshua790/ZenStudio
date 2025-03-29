import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  TransformControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { useStore } from "../../store";
import { Box, Plane, Sphere } from "./objects/BasicShapes";
import { ShortcutOverlay } from "../ui/ShortcutOverlay";
import * as THREE from "three";
import { DebugExample } from "./DebugExample";

// This component manages object selection and controls
const SceneHandlers = () => {
  // Include selectedObjectId in the destructured values to ensure component re-renders
  // when selectedObjectId changes
  const { getSelectedObject, transformMode, selectObject, selectedObjectId } =
    useStore();

  // Now this value will be recalculated when selectedObjectId changes
  const selectedObject = getSelectedObject();

  // Handle background clicks to deselect objects
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!event.intersections.length) {
      selectObject(null);
    }
    // Prevent orbitcontrols from handling this event
    event.stopPropagation();
  };

  return (
    <group onClick={handleClick}>
      {/* Invisible background plane to catch clicks */}
      <mesh position={[0, 0, -50]} visible={false}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial />
      </mesh>

      {/* Transform controls for the selected object */}
      {selectedObject && (
        <TransformControls object={selectedObject} mode={transformMode} />
      )}
    </group>
  );
};

export const Scene = () => {
  const { transformMode, setTransformMode, selectObject } = useStore();

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return; // Skip if user is typing in an input
      }

      switch (e.key.toLowerCase()) {
        case "q":
          setTransformMode("translate");
          break;
        case "w":
          setTransformMode("rotate");
          break;
        case "e":
          setTransformMode("scale");
          break;
        case "escape":
          selectObject(null);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTransformMode, selectObject]);

  // Add a floor to the scene
  useEffect(() => {
    // Add initial objects to the scene just to demonstrate the functionality
    // In a real application, these would come from user actions
  }, []);

  return (
    <div className="w-full h-full relative">
      <ShortcutOverlay currentMode={transformMode} />
      <Canvas shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls makeDefault />
          {/* Grid helper */}
          <Grid
            infiniteGrid
            cellSize={1}
            cellThickness={0.6}
            cellColor="#6f6f6f"
            sectionSize={5}
            sectionThickness={1.2}
            sectionColor="#9d4b4b"
            fadeDistance={50}
            fadeStrength={1.5}
          />
          {/* Environment */}
          <Environment preset="city" />
          {/* Demo objects */}
          <Box position={[0, 0.5, 0]} color="#f44336" />
          <Sphere position={[2, 0.5, 0]} color="#4caf50" />
          <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          {/* Scene manager with selection handling */}
          <SceneHandlers />
        </Suspense>
      </Canvas>
    </div>
  );
};
