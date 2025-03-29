import { create } from "zustand";
import { Object3D, Vector3, Euler } from "three";
import { devtools } from "zustand/middleware";
import UndoManager from "undo-manager";

export type TransformMode = "translate" | "rotate" | "scale";

// Define a command interface for undo/redo operations
export interface Command {
  execute: () => void;
  undo: () => void;
  groupId?: string;
}

// Track object transforms for undo/redo
export interface ObjectTransform {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}

interface StoreState {
  // Scene objects
  objects: Object3D[];
  selectedObjectId: string | null;

  // Transform controls
  transformMode: TransformMode;

  // Scene settings
  currentScene: string | null;

  // Undo/Redo
  undoManager: UndoManager;
  shortcutsEnabled: boolean;

  // Actions
  addObject: (object: Object3D) => void;
  removeObject: (objectId: string) => void;
  selectObject: (objectId: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  setCurrentScene: (sceneName: string | null) => void;
  toggleShortcuts: (enabled?: boolean) => void;

  // Transform tracking for undo/redo
  saveInitialTransform: (object: Object3D) => void;
  applyTransform: (
    objectId: string,
    newTransform: Partial<ObjectTransform>
  ) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Getters
  getSelectedObject: () => Object3D | null;
}

// Create an undo manager instance
const undoManager = new UndoManager();

// Map to store initial transform state before changes
const initialTransforms = new Map<string, ObjectTransform>();

export const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      objects: [],
      selectedObjectId: null,
      transformMode: "translate",
      currentScene: null,
      undoManager,
      shortcutsEnabled: true,

      // Actions
      addObject: (object) =>
        set(
          (state) => {
            // Create a new command for adding an object
            const command = {
              execute: () => {
                // Object is already added at this point
              },
              undo: () => {
                set(
                  (state) => ({
                    objects: state.objects.filter(
                      (obj) => obj.uuid !== object.uuid
                    ),
                    selectedObjectId:
                      state.selectedObjectId === object.uuid
                        ? null
                        : state.selectedObjectId,
                  }),
                  undefined,
                  "scene/removeObject"
                );
              },
              redo: () => {
                set(
                  (state) => ({
                    objects: [...state.objects, object],
                  }),
                  undefined,
                  "scene/addObject"
                );
              },
              groupId: "object-management",
            };

            // Add command to undo manager
            undoManager.add(command);

            return {
              objects: [...state.objects, object],
            };
          },
          undefined,
          "scene/addObject"
        ),

      removeObject: (objectId) => {
        const state = get();
        const object = state.objects.find((obj) => obj.uuid === objectId);

        if (!object) return;

        set(
          (state) => {
            // Create a new command for removing an object
            const command = {
              execute: () => {
                // Object is about to be removed
              },
              undo: () => {
                if (!object) return;
                set(
                  (state) => ({
                    objects: [...state.objects, object],
                  }),
                  undefined,
                  "scene/addObject"
                );
              },
              redo: () => {
                set(
                  (state) => ({
                    objects: state.objects.filter(
                      (obj) => obj.uuid !== objectId
                    ),
                    selectedObjectId:
                      state.selectedObjectId === objectId
                        ? null
                        : state.selectedObjectId,
                  }),
                  undefined,
                  "scene/removeObject"
                );
              },
              groupId: "object-management",
            };

            // Add command to undo manager
            undoManager.add(command);

            return {
              objects: state.objects.filter((obj) => obj.uuid !== objectId),
              selectedObjectId:
                state.selectedObjectId === objectId
                  ? null
                  : state.selectedObjectId,
            };
          },
          undefined,
          "scene/removeObject"
        );
      },

      selectObject: (objectId) =>
        set({ selectedObjectId: objectId }, undefined, "scene/selectObject"),

      setTransformMode: (mode) =>
        set({ transformMode: mode }, undefined, "scene/setTransformMode"),

      setCurrentScene: (sceneName) =>
        set({ currentScene: sceneName }, undefined, "scene/setCurrentScene"),

      toggleShortcuts: (enabled) =>
        set(
          (state) => ({
            shortcutsEnabled:
              enabled !== undefined ? enabled : !state.shortcutsEnabled,
          }),
          undefined,
          "preferences/toggleShortcuts"
        ),

      // Save the initial transform state before changing
      saveInitialTransform: (object) => {
        initialTransforms.set(object.uuid, {
          position: object.position.clone(),
          rotation: object.rotation.clone(),
          scale: object.scale.clone(),
        });
      },

      // Apply a transform to an object and track it for undo/redo
      applyTransform: (objectId, newTransform) => {
        const state = get();
        const object = state.objects.find((obj) => obj.uuid === objectId);

        if (!object) return;

        // Get initial transform or current transform if no initial state
        const initialTransform = initialTransforms.get(objectId) || {
          position: object.position.clone(),
          rotation: object.rotation.clone(),
          scale: object.scale.clone(),
        };

        // Create a new final transform by merging current with changes
        const finalTransform = {
          position: newTransform.position || object.position.clone(),
          rotation: newTransform.rotation || object.rotation.clone(),
          scale: newTransform.scale || object.scale.clone(),
        };

        // Create a command for the transform
        const command = {
          execute: () => {
            // Apply the transform
            if (newTransform.position)
              object.position.copy(newTransform.position);
            if (newTransform.rotation)
              object.rotation.copy(newTransform.rotation);
            if (newTransform.scale) object.scale.copy(newTransform.scale);
          },
          undo: () => {
            // Revert to initial transform
            object.position.copy(initialTransform.position);
            object.rotation.copy(initialTransform.rotation);
            object.scale.copy(initialTransform.scale);
          },
          redo: () => {
            // Apply the transform again
            if (newTransform.position)
              object.position.copy(newTransform.position);
            if (newTransform.rotation)
              object.rotation.copy(newTransform.rotation);
            if (newTransform.scale) object.scale.copy(newTransform.scale);
          },
          groupId: "transform",
        };

        // Execute the command (already done but including for completeness)
        command.execute();

        // Add command to undo manager
        undoManager.add(command);

        // Clear the initial transform after applying changes
        initialTransforms.delete(objectId);
      },

      // Undo/Redo methods
      undo: () => {
        undoManager.undo();
      },

      redo: () => {
        undoManager.redo();
      },

      canUndo: () => {
        return undoManager.hasUndo();
      },

      canRedo: () => {
        return undoManager.hasRedo();
      },

      // Helper to find the object by UUID
      getSelectedObject: () => {
        const state = get();
        if (!state.selectedObjectId) return null;
        return (
          state.objects.find((obj) => obj.uuid === state.selectedObjectId) ||
          null
        );
      },
    }),
    {
      name: "R3F Studio Store",
      enabled: true,
    }
  )
);
