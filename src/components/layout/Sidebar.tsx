import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Layers, SunMedium, RotateCw, BoxSelect } from "lucide-react";
import { useStore } from "../../store";
import { AssetManager } from "../features/AssetManager";
import { SceneManager } from "../features/SceneManager";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { transformMode, setTransformMode } = useStore();

  return (
    <div className={`h-full border-r border-border bg-muted/10 transition-all ${collapsed ? 'w-12' : 'w-[250px]'}`}>
      {collapsed ? (
        <div className="p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(false)}
            className="w-8 h-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-4 items-center mt-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-8 h-8 ${transformMode === 'translate' ? 'bg-primary/20' : ''}`}
              onClick={() => setTransformMode('translate')}
            >
              <BoxSelect className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-8 h-8 ${transformMode === 'rotate' ? 'bg-primary/20' : ''}`}
              onClick={() => setTransformMode('rotate')}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`w-8 h-8 ${transformMode === 'scale' ? 'bg-primary/20' : ''}`} 
              onClick={() => setTransformMode('scale')}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-sm font-medium">Studio Tools</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(true)}
              className="w-8 h-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto p-2">
            <Accordion type="multiple" defaultValue={["scene", "lights", "assets"]}>
              <AccordionItem value="scene">
                <AccordionTrigger className="py-2 text-sm">Scene</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <SceneManager />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="lights">
                <AccordionTrigger className="py-2 text-sm">Lights</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <SunMedium className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Directional Light</span>
                    </div>
                    <Button variant="outline" size="sm">Add Light</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* <AccordionItem value="xr">
                <AccordionTrigger className="py-2 text-sm">XR Interactions</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    Configure XR interactions for your scene
                  </div>
                </AccordionContent>
              </AccordionItem>
               */}
              <AccordionItem value="assets">
                <AccordionTrigger className="py-2 text-sm">Assets Library</AccordionTrigger>
                <AccordionContent>
                  <AssetManager />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}; 