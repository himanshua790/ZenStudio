import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  SunMedium,
  RotateCw,
  BoxSelect,
  Undo,
  Redo,
  Settings,
} from "lucide-react";
import { useStore } from "../../store";
import { AssetManager } from "../features/AssetManager";
import { SceneManager } from "../features/SceneManager";
import { Preferences } from "../features/Preferences";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    transformMode,
    setTransformMode,
    undo,
    redo,
    canUndo,
    canRedo,
    shortcutsEnabled,
  } = useStore();

  return (
    <div
      className={`h-full border-r border-border bg-muted/10 transition-all ${
        collapsed ? "w-12" : "w-[250px]"
      }`}
    >
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
              className={`w-8 h-8 ${
                transformMode === "translate" ? "bg-primary/20" : ""
              }`}
              onClick={() => setTransformMode("translate")}
            >
              <BoxSelect className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 ${
                transformMode === "rotate" ? "bg-primary/20" : ""
              }`}
              onClick={() => setTransformMode("rotate")}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 ${
                transformMode === "scale" ? "bg-primary/20" : ""
              }`}
              onClick={() => setTransformMode("scale")}
            >
              <Layers className="h-4 w-4" />
            </Button>

            {/* Divider */}
            <div className="h-0.5 w-6 bg-border my-1"></div>

            {/* Undo/Redo buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={undo}
              disabled={!canUndo() || !shortcutsEnabled}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={redo}
              disabled={!canRedo() || !shortcutsEnabled}
            >
              <Redo className="h-4 w-4" />
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
            <Accordion
              type="multiple"
              defaultValue={["scene", "lights", "assets", "preferences"]}
            >
              <AccordionItem value="scene">
                <AccordionTrigger className="py-2 text-sm">
                  Scene
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <SceneManager />

                    <div className="flex flex-col gap-2">
                      <div className="text-xs text-muted-foreground">
                        Transform Mode
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={
                            transformMode === "translate"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setTransformMode("translate")}
                          className="flex-1"
                        >
                          Move
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            transformMode === "rotate" ? "default" : "outline"
                          }
                          onClick={() => setTransformMode("rotate")}
                          className="flex-1"
                        >
                          Rotate
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            transformMode === "scale" ? "default" : "outline"
                          }
                          onClick={() => setTransformMode("scale")}
                          className="flex-1"
                        >
                          Scale
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-xs text-muted-foreground">
                        History
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={undo}
                          disabled={!canUndo()}
                          className="flex-1 flex items-center gap-1"
                        >
                          <Undo className="h-3.5 w-3.5" />
                          Undo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={redo}
                          disabled={!canRedo()}
                          className="flex-1 flex items-center gap-1"
                        >
                          <Redo className="h-3.5 w-3.5" />
                          Redo
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="lights">
                <AccordionTrigger className="py-2 text-sm">
                  Lights
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <SunMedium className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Directional Light</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Light
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="xr">
                <AccordionTrigger className="py-2 text-sm">
                  XR Interactions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    Configure XR interactions for your scene
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="assets">
                <AccordionTrigger className="py-2 text-sm">
                  Assets Library
                </AccordionTrigger>
                <AccordionContent>
                  <AssetManager />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="preferences">
                <AccordionTrigger className="py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Preferences</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Preferences />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};
