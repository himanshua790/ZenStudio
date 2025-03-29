import { useState } from "react";
import { Button } from "../ui/button";
import { useStore } from "../../store";

// Predefined scene templates
const sceneTemplates = [
  {
    id: "empty",
    name: "Empty Scene",
    description: "Start with a clean scene",
    objects: []
  },
  {
    id: "basic",
    name: "Basic Scene",
    description: "A simple scene with basic objects",
    objects: [
      { type: "box", props: { position: [0, 0.5, 0], color: "#f44336" } },
      { type: "sphere", props: { position: [2, 0.5, 0], color: "#4caf50" } },
      { type: "plane", props: { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0] } }
    ]
  },
  {
    id: "showcase",
    name: "Showcase",
    description: "Scene designed for showcasing models",
    objects: [
      { type: "plane", props: { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], scale: [20, 20, 1], color: "#212121" } },
      { type: "box", props: { position: [-3, 0.5, -3], color: "#E91E63" } },
      { type: "box", props: { position: [3, 0.5, -3], color: "#2196F3" } },
      { type: "sphere", props: { position: [0, 1, -5], scale: [2, 2, 2], color: "#FFC107" } }
    ]
  }
];

export const SceneManager = () => {
  const { setCurrentScene, objects, addObject } = useStore();
  const [loading, setLoading] = useState(false);

  const loadScene = (sceneId: string) => {
    setLoading(true);
    
    // Clear existing scene first
    // In a real app, you'd add a confirmation dialog
    objects.forEach(obj => {
      // Remove existing objects
      if (obj.parent) {
        obj.parent.remove(obj);
      }
    });
    
    // Find the selected scene template
    const selectedTemplate = sceneTemplates.find(template => template.id === sceneId);
    
    if (selectedTemplate) {
      // Set current scene in store
      setCurrentScene(sceneId);
      
      // In a real app, you'd create actual 3D objects based on the template definition
      // This is just a placeholder to show the feature's concept
      console.log(`Loaded scene: ${selectedTemplate.name}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-muted-foreground mb-1">Scene Templates</div>
      
      {sceneTemplates.map(scene => (
        <Button 
          key={scene.id}
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={() => loadScene(scene.id)}
          disabled={loading}
        >
          <div className="flex flex-col items-start">
            <span className="text-sm">{scene.name}</span>
            <span className="text-xs text-muted-foreground">{scene.description}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}; 