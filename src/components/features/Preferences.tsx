import { useStore } from "../../store";

export const Preferences = () => {
  const { shortcutsEnabled, toggleShortcuts } = useStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-muted-foreground">Interface</div>

      <div className="flex items-center justify-between bg-muted/20 p-2 rounded">
        <label
          htmlFor="enable-shortcuts"
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <span>Enable keyboard shortcuts</span>
        </label>
        <input
          id="enable-shortcuts"
          type="checkbox"
          className="h-4 w-4"
          checked={shortcutsEnabled}
          onChange={(e) => toggleShortcuts(e.target.checked)}
        />
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Keyboard Shortcuts
      </div>

      <div className="grid grid-cols-3 gap-1 text-xs">
        <div className="p-1">
          <div className="font-semibold">Transform</div>
          <div className="flex justify-between">
            <span>Select/Move</span>
            <span className="font-mono bg-muted/20 px-1 rounded">Q</span>
          </div>
          <div className="flex justify-between">
            <span>Rotate</span>
            <span className="font-mono bg-muted/20 px-1 rounded">W</span>
          </div>
          <div className="flex justify-between">
            <span>Scale</span>
            <span className="font-mono bg-muted/20 px-1 rounded">E</span>
          </div>
          <div className="flex justify-between">
            <span>Deselect</span>
            <span className="font-mono bg-muted/20 px-1 rounded">ESC</span>
          </div>
        </div>

        <div className="p-1">
          <div className="font-semibold">History</div>
          <div className="flex justify-between">
            <span>Undo</span>
            <span className="font-mono bg-muted/20 px-1 rounded">Ctrl+Z</span>
          </div>
          <div className="flex justify-between">
            <span>Redo</span>
            <span className="font-mono bg-muted/20 px-1 rounded">Ctrl+Y</span>
          </div>
        </div>
      </div>
    </div>
  );
};
