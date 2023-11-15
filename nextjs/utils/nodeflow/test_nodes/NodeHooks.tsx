import { useStore } from "./store";
import { shallow } from "zustand/shallow";

interface GenericNodeHook {
  deleteNode: () => void;
  isNodeSelected: () => boolean;
}

export const useGenericNode = (id: string): GenericNodeHook => {
  const selector = (store) => ({
    deleteNode: () => store.deleteNodeAndConnectedEdges(id),
    isNodeSelected: () => store.isNodeSelected(id),
  });

  return useStore(selector, shallow);
};