import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  // MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";

import { useStore } from "../utils/nodeflow/test_nodes/store";
import Osc from "../utils/nodeflow/test_nodes/osc";
import Amp from "../utils/nodeflow/test_nodes/amp";
import Out from "../utils/nodeflow/test_nodes/out";
import EdgeButton from "../utils/nodeflow/test_nodes/EdgeButton";

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

const edgeTypes = {
  edgebutton: EdgeButton,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOsc: () => store.createNode("osc"),
  addAmp: () => store.createNode("amp"),
});

export default function App() {
  const store = useStore(selector, shallow);

  const listEdges = () => {
    return (
      <ul>
        {store.edges.map((edge) => (
          <li key={edge.id} className="flex  justify-between">
            <span className="mr-10 flex-1">{edge.id}:</span>
            {`${edge.source} -> ${edge.target}. Selected: ${edge.selected}`}
          </li>
        ))}
      </ul>
    );
  };

  const listNodes = () => {
    return (
      <ul>
        {store.nodes.map((n) => (
          <li key={n.id} className="flex  justify-between">
            <span className="mr-10 flex-1">{n.id}:</span>
            {`Selected: ${n.selected}`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onNodesDelete={store.onNodesDelete}
          onEdgesChange={store.onEdgesChange}
          onEdgesDelete={store.onEdgesDelete}
          onConnect={store.addEdge}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>

      <button
        className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 text-xs rounded"
        onClick={() => {
          store.addAmp();
          // store.addOsc();
        }}
      >
        Add Node
      </button>

      <div className="absolute top-20 right-5">Edges:<br/>{listEdges()}</div>
      <div className="absolute top-20 left-5">Nodes:<br/>{listNodes()}</div>
    </ReactFlowProvider>
  );
}
