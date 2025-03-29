import { Scene } from "../canvas/Scene";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full">
        <Scene />
      </div>
    </div>
  );
}; 