import { useStore } from "./store";
import { shallow } from "zustand/shallow";

interface GenericNodeHook {
  deleteNode: () => void;
}

export const useGenericNode = (id: string): GenericNodeHook => {
  const selector = (store) => ({
    deleteNode: () => store.deleteNodeAndConnectedEdges(id),
  });

  return useStore(selector, shallow);
};