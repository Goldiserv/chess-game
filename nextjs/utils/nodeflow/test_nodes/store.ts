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
      id: "prompt",
      type: "prompt",
      data: {
        nodeSections: {
          "prompt-generatedId-handle-0": {
            label: "Prompt",
            value: "your prompt",
            dataType: "string",
            sectionType: "textbox",
            handle: "target",
          },
          "prompt-generatedId-handle-1": {
            label: "AI Engine",
            value: "gpt4",
            dataType: "string",
            sectionType: "dropdown",
            // handle: "none",
          },
          "prompt-generatedId-handle-2": {
            label: "Output",
            value: "output",
            dataType: "string",
            sectionType: "textbox",
            handle: "source",
          },
        },
      },
      position: { x: -100, y: 0 },
    },
    {
      id: "amp",
      type: "amp",
      selected: true,
      data: { value: 10 },
      position: { x: 200, y: 100 },
      // dragHandle: '.header-drag-handle',
    },
    {
      id: "amp2",
      type: "amp",
      data: { value: 15 },
      position: { x: 200, y: 250 },
    },
    {
      id: "output",
      type: "out",
      data: { value: 0 },
      position: { x: 400, y: 250 },
    },
    {
      id: "text1",
      type: "text",
      data: { value: "my text" },
      position: { x: -350, y: 50 },
    },
  ],
  edges: [
    // { id: "prompt->amp", source: "prompt", target: "amp", type: "edgebutton" },
    { id: "text->prompt", source: "text1", target: "prompt", targetHandle: "prompt-generatedId-handle-0", type: "edgebutton" },
    { id: "amp->output", source: "amp", target: "output", type: "edgebutton" },
    {
      id: "amp2->output",
      source: "amp2",
      target: "output",
      type: "edgebutton",
    },
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

  createNode(type, positionData) {
    const id = nanoid();

    switch (type) {
      case "prompt": {
        const data = { value: "your prompt", type: "gpt4" };
        const position = positionData ? positionData : { x: 0, y: 0 };
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }

      case "amp":
      case "out": {
        const data = { value: 0 };
        const position = positionData ? positionData : { x: 0, y: 0 };
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }

      case "text": {
        const data = { value: "your text" };
        const position = positionData ? positionData : { x: 0, y: 0 };
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
    // console.log({ data });
    const id = nanoid(6);
    const edge = { id, ...data, type: "edgebutton" };
    set({ edges: [edge, ...get().edges] });
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

  isNodeSelected(id) {
    const foundNode = get().nodes.find((node) => node.id === id);
    if (foundNode && foundNode.selected) return foundNode.selected;
    else return false;
  },

  // Function to save data to a file
  saveDataToFile: async () => {
    const storeData = get(); // Get the current store data

    try {
      // Convert store data to a string or format suitable for saving to a file
      const serializedData = JSON.stringify(storeData);

      // Use browser APIs or libraries to save the data to a file (e.g., using FileSaver.js)
      // Example using FileSaver.js:
      // import { saveAs } from 'file-saver';
      // const blob = new Blob([serializedData], { type: 'application/json' });
      // saveAs(blob, 'storeData.json');

      // Replace the above code with your preferred method of saving data to a file
    } catch (error) {
      console.error("Error saving data:", error);
    }
  },

  // Function to load data from a file
  loadDataFromFile: async (file) => {
    try {
      // Use browser APIs or libraries to read the file content (e.g., FileReader)
      // Example using FileReader:
      // const fileContent = await new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.onload = (event) => resolve(event.target.result);
      //   reader.onerror = (error) => reject(error);
      //   reader.readAsText(file);
      // });

      // Replace the above code with your preferred method of reading file content
      // After reading the file content, parse the data and update the store
      // For example:
      // const parsedData = JSON.parse(fileContent);
      // set(parsedData);

      // Simulated loading for demonstration purposes (replace with your logic)
      const parsedData = {
        /* Your parsed data */
      };
      set(parsedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
}));
