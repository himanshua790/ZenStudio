import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  TransformControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useCallback } from "react";
import { useStore } from "../../store";
import { Box, Plane, Sphere } from "./objects/BasicShapes";
import { ShortcutOverlay } from "../ui/ShortcutOverlay";
import * as THREE from "three";
import { DebugExample } from "./DebugExample";

// This component manages object selection and controls
const SceneHandlers = () => {
  // Include selectedObjectId in the destructured values to ensure component re-renders
  // when selectedObjectId changes
  const {
    getSelectedObject,
    transformMode,
    selectObject,
    selectedObjectId,
    saveInitialTransform,
    applyTransform,
    shortcutsEnabled,
    undo,
    redo,
  } = useStore();

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

  // Track transform starts to save initial state for undo
  const handleTransformStart = useCallback(() => {
    if (selectedObject) {
      saveInitialTransform(selectedObject);
    }
  }, [selectedObject, saveInitialTransform]);

  // Track transform ends to create undo command
  const handleTransformEnd = useCallback(() => {
    if (selectedObject) {
      applyTransform(selectedObject.uuid, {
        position: selectedObject.position.clone(),
        rotation: selectedObject.rotation.clone(),
        scale: selectedObject.scale.clone(),
      });
    }
  }, [selectedObject, applyTransform]);

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    if (!shortcutsEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Undo: Ctrl+Z or Command+Z
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "z" &&
        !e.shiftKey
      ) {
        e.preventDefault();
        undo();
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z or Command+Shift+Z
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key.toLowerCase() === "y" ||
          (e.key.toLowerCase() === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, shortcutsEnabled]);

  return (
    <group onClick={handleClick}>
      {/* Invisible background plane to catch clicks */}
      <mesh position={[0, 0, -50]} visible={false}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial />
      </mesh>

      {/* Transform controls for the selected object */}
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          onMouseDown={handleTransformStart}
          onMouseUp={handleTransformEnd}
          onObjectChange={() => {
            // This keeps the store updated with transform changes
            if (selectedObject) {
              selectedObject.updateMatrix();
            }
          }}
        />
      )}
    </group>
  );
};

export const Scene = () => {
  const { transformMode, setTransformMode, selectObject, shortcutsEnabled } =
    useStore();

  // Add keyboard shortcuts
  useEffect(() => {
    if (!shortcutsEnabled) return;

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
  }, [setTransformMode, selectObject, shortcutsEnabled]);

  // Add a floor to the scene
  useEffect(() => {
    // Add initial objects to the scene just to demonstrate the functionality
    // In a real application, these would come from user actions
  }, []);

  return (
    <div className="w-full h-full relative">
      <ShortcutOverlay currentMode={transformMode} />
      <DebugExample />
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
