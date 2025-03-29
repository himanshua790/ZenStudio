import { useState } from "react";
import { Button } from "../ui/button";
import { useStore } from "../../store";
import { Mesh, BoxGeometry, SphereGeometry, PlaneGeometry, MeshStandardMaterial } from "three";

export const AssetManager = () => {
  const { addObject } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const createCube = () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: "#f44336", metalness: 0.1, roughness: 0.5 });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0.5, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    addObject(mesh);
  };

  const createSphere = () => {
    const geometry = new SphereGeometry(0.5, 32, 32);
    const material = new MeshStandardMaterial({ color: "#4caf50", metalness: 0.1, roughness: 0.5 });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0.5, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    addObject(mesh);
  };

  const createPlane = () => {
    const geometry = new PlaneGeometry(10, 10);
    const material = new MeshStandardMaterial({ color: "#444444", metalness: 0.1, roughness: 0.8 });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    addObject(mesh);
  };

  const loadModel = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would trigger a file dialog
      // For now, we'll just show that the functionality exists
      setTimeout(() => {
        setIsLoading(false);
        alert("This would open a file dialog to load a GLTF/GLB model");
      }, 1000);
    } catch (error) {
      console.error("Error loading model:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={loadModel}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Import Model"}
      </Button>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div 
          className="border rounded p-2 cursor-pointer hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center"
          onClick={createCube}
        >
          <div className="h-12 w-12 bg-red-500/20 rounded flex items-center justify-center mb-1">
            <div className="h-6 w-6 bg-red-500 rounded-sm" />
          </div>
          <div className="text-xs text-center">Cube</div>
        </div>
        
        <div 
          className="border rounded p-2 cursor-pointer hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center"
          onClick={createSphere}
        >
          <div className="h-12 w-12 bg-green-500/20 rounded flex items-center justify-center mb-1">
            <div className="h-6 w-6 bg-green-500 rounded-full" />
          </div>
          <div className="text-xs text-center">Sphere</div>
        </div>
        
        <div 
          className="border rounded p-2 cursor-pointer hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center"
          onClick={createPlane}
        >
          <div className="h-12 w-12 bg-gray-500/20 rounded flex items-center justify-center mb-1">
            <div className="h-1 w-6 bg-gray-500" />
          </div>
          <div className="text-xs text-center">Plane</div>
        </div>
        
        <div 
          className="border rounded p-2 cursor-pointer hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center opacity-50"
        >
          <div className="h-12 w-12 bg-blue-500/20 rounded flex items-center justify-center mb-1">
            <div className="h-6 w-4 bg-blue-500 rounded-sm" />
          </div>
          <div className="text-xs text-center">Model</div>
        </div>
      </div>
    </div>
  );
}; 