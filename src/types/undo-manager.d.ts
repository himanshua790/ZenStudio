declare module "undo-manager" {
  export default class UndoManager {
    constructor();

    /**
     * Add an undo/redo command
     */
    add(command: {
      undo: () => void;
      redo: () => void;
      groupId?: string;
    }): void;

    /**
     * Undo the last command
     */
    undo(): void;

    /**
     * Redo the last undone command
     */
    redo(): void;

    /**
     * Check if there are undo commands
     */
    hasUndo(): boolean;

    /**
     * Check if there are redo commands
     */
    hasRedo(): boolean;

    /**
     * Clear all commands
     */
    clear(): void;

    /**
     * Set a callback to be called on changes
     */
    setCallback(callback: () => void): void;

    /**
     * Get current index
     */
    getIndex(): number;

    /**
     * Get all commands
     */
    getCommands(groupId?: string): Array<{
      undo: () => void;
      redo: () => void;
      groupId?: string;
    }>;

    /**
     * Set maximum number of undo steps
     */
    setLimit(limit: number): void;
  }
}
