import { useStore } from "./store";
import { shallow } from "zustand/shallow";

interface GenericEdgeHook {
  deleteEdge: () => void;
  deleteSelectedEdge: () => void;
}

export const useGenericEdge = (id: string): GenericEdgeHook => {
  const selector = (store) => ({
    deleteEdge: () => store.deleteEdge(id),
    deleteSelectedEdge: () => {
      const selectedEdges = store.getSelectedEdges();
      const selectedEdgeIds: string[] = selectedEdges.map((edge) => edge.id);
      if (selectedEdgeIds.includes(id)) store.deleteEdge(id);
    },
  });

  return useStore(selector, shallow);
};
