import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

interface Edge {
  id: string;
  source: string;
  target: string;
}

export const useStore = create((set: any, get: any) => ({
  nodes: [
    {
      id: "osc",
      type: "osc",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },
    {
      id: "amp",
      type: "amp",
      data: { gain: 10 },
      position: { x: 200, y: 100 },
      dragHandle: '.header-drag-handle',
    },
    {
      id: "amp2",
      type: "amp",
      data: { gain: 15 },
      position: { x: 200, y: 250 },
      dragHandle: '.header-drag-handle',
    },
    { id: "output", type: "out", position: { x: 400, y: 250 } },
  ],
  edges: [
    { id: "osc->amp", source: "osc", target: "amp" },
    { id: "amp->output", source: "amp", target: "output", type: 'edgebutton' },
    { id: "amp2->output", source: "amp2", target: "output", type: 'edgebutton' },
  ],
  getSelectedEdges() {
    const edges = get().edges;

    const filteredEdges = edges.filter((edge) => edge.selected === true);

    return filteredEdges;
  },
  

  // calculations
  getPreviousNodes(nodeId: string) {
    const edges = get().edges;
    const nodes = get().nodes;

    const filteredEdges = edges.filter((edge) => edge.target === nodeId);
    const sourceIds = filteredEdges.map((edge) => edge.source);
    const sourceNodes = nodes.filter((node) => sourceIds.includes(node.id));

    return sourceNodes;
  },

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  createNode(type, x, y) {
    const id = nanoid();

    switch (type) {
      case "osc": {
        const data = { frequency: 440, type: "sine" };
        const position = { x: 0, y: 0 };
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }

      case "amp": {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
    }
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: Object.assign(node.data, data) }
          : node
      ),
    });
  },

  onNodesDelete(deleted) {
    for (const { id } of deleted) {
    }
  },

  deleteNodeAndConnectedEdges(nodeId) {
    // get and delete node
    const updatedNodes = get().nodes.filter((node) => node.id !== nodeId);
    set({ nodes: updatedNodes });

    // get and delete connected edges
    const getConnectedEdges = (nodeId: string) => {
      const connectedEdges = get().edges.filter(
        (edge) => edge.source === nodeId || edge.target === nodeId
      );
      return connectedEdges;
    };

    const connectedEdges = getConnectedEdges(nodeId);
    const edgeIds = connectedEdges.map((edge) => edge.id);   
    get().deleteEdge(edgeIds);

  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data, type: 'edgebutton' };
    set({ edges: [edge, ...get().edges] });
    // add code below for on connect code if required
  },

  deleteEdge(edgeIds: string | string[]) {
    const edgesToDelete = Array.isArray(edgeIds) ? edgeIds : [edgeIds];

    const updatedEdges = get().edges.filter(
      (edge) => !edgesToDelete.includes(edge.id)
    );
    set({ edges: updatedEdges });
  },

  onEdgesDelete(deleted: Edge[]) {
    console.log("onEdgesDelete");
    for (const { source, target } of deleted) {
      // onAudioDisconnect(source, target);
      console.log("onEdgesDelete", { source, target });
    }
  },
}));
