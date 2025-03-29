import { TransformMode } from "../../store";
import { useStore } from "../../store";

interface ShortcutOverlayProps {
  currentMode: TransformMode;
}

export const ShortcutOverlay = ({ currentMode }: ShortcutOverlayProps) => {
  const { shortcutsEnabled, canUndo, canRedo } = useStore();

  if (!shortcutsEnabled) {
    return (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white/50 rounded-lg px-4 py-2">
        <span className="text-xs">Shortcuts disabled</span>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 text-white rounded-lg px-4 py-2 flex gap-6 items-center">
      <ShortcutItem
        key="select"
        keyLabel="Q"
        description="Select"
        active={currentMode === "translate"}
      />
      <ShortcutItem
        key="rotate"
        keyLabel="W"
        description="Rotate"
        active={currentMode === "rotate"}
      />
      <ShortcutItem
        key="scale"
        keyLabel="E"
        description="Scale"
        active={currentMode === "scale"}
      />
      <div className="h-8 w-px bg-gray-500" />
      <ShortcutItem
        key="undo"
        keyLabel="Ctrl+Z"
        description="Undo"
        disabled={!canUndo()}
      />
      <ShortcutItem
        key="redo"
        keyLabel="Ctrl+Y"
        description="Redo"
        disabled={!canRedo()}
      />
      <div className="h-8 w-px bg-gray-500" />
      <ShortcutItem key="esc" keyLabel="ESC" description="Deselect" />
    </div>
  );
};

interface ShortcutItemProps {
  keyLabel: string;
  description: string;
  active?: boolean;
  disabled?: boolean;
}

const ShortcutItem = ({
  keyLabel,
  description,
  active = false,
  disabled = false,
}: ShortcutItemProps) => {
  const baseColor = disabled ? "text-gray-500" : active ? "text-blue-400" : "";

  return (
    <div className={`flex items-center gap-2 ${baseColor}`}>
      <span className="border border-gray-400 rounded px-2 py-1 text-xs font-mono">
        {keyLabel}
      </span>
      <span className="text-xs">{description}</span>
    </div>
  );
};
