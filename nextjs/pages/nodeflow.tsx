import React, { useCallback, useState } from "react";
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
import Osc from "../utils/nodeflow/test_nodes/NodePrompt";
import Amp from "../utils/nodeflow/test_nodes/NodeNumber";
import Out from "../utils/nodeflow/test_nodes/NodeSum";
import EdgeButton from "../utils/nodeflow/test_nodes/EdgeButton";

import Sidebar from "../utils/nodeflow/test_nodes/NodeSideBar";

const nodeTypes = {
  prompt: Osc,
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
  addOsc: () => store.createNode("prompt"),
  addAmp: () => store.createNode("amp"),
  addNode: (type, position) => store.createNode(type, position),
  updateNode: (id, data) => store.updateNode(id, data),
});

export default function App() {
  const store = useStore(selector, shallow);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showNodeEdgeData, setShowNodeEdgeData] = useState(false);
  const toggleShowNodeEdgeData = () => {
    setShowNodeEdgeData(!showNodeEdgeData);
  };

  const listEdges = () => {
    return (
      <ul>
        {store.edges.map((edge) => (
          <li key={edge.id} className="flex  justify-between">
            <span className="mr-10 flex-1">{edge.id}:</span>
            {`${edge.source} -> ${edge.target}`}
            {/* {` Selected: ${edge.selected}`} */}
          </li>
        ))}
      </ul>
    );
  };

  const listNodes = () => {
    const getValue = (node) => {
      if (node.data && node.data.value) return node.data.value;
      else return undefined;
    };
    return (
      <ul>
        {store.nodes.map((n) => (
          <li key={n.id} className="flex  justify-between">
            <span className="mr-10 flex-1">{n.id}:</span>
            <span className="mr-10 flex-1">{`Selected: ${n.selected}`}</span>
            <span className="mr-10 flex-1">{`Value: ${getValue(n)}`}</span>
          </li>
        ))}
      </ul>
    );
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        console.log("undefined");
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: "getId()",
        type,
        position,
        data: { value: 1 },
      };

      console.log({ type, position });

      // store.setNodes((nds) => nds.concat(newNode));
      store.addNode(type, position);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <Sidebar />
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
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onConnect={store.addEdge}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>

      <button
        className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 text-xs rounded"
        onClick={() => {
          toggleShowNodeEdgeData();
        }}
      >
        Show Node/Edge data
      </button>

      {/* <button
        className="absolute top-5 right-28 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 text-xs rounded"
        onClick={() => {
          const data = store.nodes.find((n) => n.id === "amp");
          data.selected = true;
          store.updateNode("id", data);
          // store.addOsc();
        }}
      >
        Edit Node
      </button> */}

      {showNodeEdgeData && (
        <div className="absolute top-20 right-5 text-xs">
          Edges:
          <br />
          {listEdges()}
          <br />
          Nodes:
          <br />
          {listNodes()}
        </div>
      )}
    </ReactFlowProvider>
  );
}
