import { create } from "zustand";
import { Object3D } from "three";
import { devtools } from "zustand/middleware";

export type TransformMode = "translate" | "rotate" | "scale";

interface StoreState {
  // Scene objects
  objects: Object3D[];
  selectedObjectId: string | null;

  // Transform controls
  transformMode: TransformMode;

  // Scene settings
  currentScene: string | null;

  // Actions
  addObject: (object: Object3D) => void;
  removeObject: (objectId: string) => void;
  selectObject: (objectId: string | null) => void;
  setTransformMode: (mode: TransformMode) => void;
  setCurrentScene: (sceneName: string | null) => void;

  // Getters
  getSelectedObject: () => Object3D | null;
}

export const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      objects: [],
      selectedObjectId: null,
      transformMode: "translate",
      currentScene: null,

      // Actions
      addObject: (object) =>
        set(
          (state) => ({
            objects: [...state.objects, object],
          }),
          undefined,
          'scene/addObject'
        ),

      removeObject: (objectId) =>
        set(
          (state) => ({
            objects: state.objects.filter((obj) => obj.uuid !== objectId),
            selectedObjectId: state.selectedObjectId === objectId ? null : state.selectedObjectId
          }),
          undefined,
          'scene/removeObject'
        ),

      selectObject: (objectId) => 
        set(
          { selectedObjectId: objectId },
          undefined,
          'scene/selectObject'
        ),

      setTransformMode: (mode) => 
        set(
          { transformMode: mode },
          undefined,
          'scene/setTransformMode'
        ),

      setCurrentScene: (sceneName) => 
        set(
          { currentScene: sceneName },
          undefined,
          'scene/setCurrentScene'
        ),

      // Helper to find the object by UUID
      getSelectedObject: () => {
        const state = get();
        if (!state.selectedObjectId) return null;
        return state.objects.find(obj => obj.uuid === state.selectedObjectId) || null;
      }
    }),
    {
      name: 'R3F Studio Store',
      enabled: true
    }
  )
);
