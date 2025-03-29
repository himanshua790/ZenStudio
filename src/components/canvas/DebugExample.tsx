import { useEffect } from "react";
import { useStore } from "../../store";

/**
 * This is an example component showing how to use debugging in your React components.
 * You can add a debugger statement to pause execution at a specific point,
 * or use console.log to output information during development.
 */
export const DebugExample = () => {
  const { transformMode, selectedObjectId, getSelectedObject } = useStore();

  const selectedObject = getSelectedObject();

  useEffect(() => {
    // Example 1: Simple console log for debugging
    console.log("[DebugExample] Component mounted");

    // Example 2: Log multiple values in a group
    console.group("Debug Store State");
    console.log("Transform Mode:", transformMode);
    console.log("Selected Object ID:", selectedObjectId);
    console.groupEnd();

    // Example 3: Debugger statement - execution will pause here when dev tools are open
    // Uncomment the line below to use it
    // debugger;

    return () => {
      console.log("[DebugExample] Component unmounted");
    };
  }, [transformMode, selectedObjectId]);

  // Example 4: Conditional breakpoint based on props/state
  if (transformMode === "rotate") {
    // Uncomment the line below to use it
    // debugger; // This will only trigger when transform mode is 'rotate'
  }

  return (
    <div className="fixed top-12 right-4 z-10 p-2 bg-black/40 text-white rounded text-xs">
      <p>Debug Panel</p>
      <p>Mode: {transformMode}</p>
      <p>Selected: {selectedObjectId ? "Yes" : "No"}</p>
    </div>
  );
};
