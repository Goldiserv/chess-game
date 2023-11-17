import React, { useState, memo } from "react";
import { Handle, Position, getIncomers } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { tw } from "twind";
import NodeContainer from "./NodeContainer";

const selector = (store) => ({
  getPreviousNodes: (id) => store.getPreviousNodes(id),
  storeValue: (id, data) => {
    store.updateNode(id, data);
  },
  nodes: store.nodes,
});

function Node({ id, data }) {
  // const { getPreviousNodes, storeValue } = useStore(selector(id), shallow);
  const { nodes, getPreviousNodes, storeValue } = useStore(selector, shallow);

  const [value, setValue] = useState(0);

  return (
    <NodeContainer title={"Sum"} id={id} headerClassName="bg-blue-500">
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <div className={tw("rounded-md bg-white shadow-xl px-4 py-2")}>
        <div className="flex justify-between">
          <p className={tw("text-xs font-bold mb-2")}>Result</p>
          <p className={tw("text-right text-xs")}>{value}</p>
        </div>

        <div className="block">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 text-xs rounded"
            onClick={() => {
              const sourceNodes = getPreviousNodes(id);
              // console.log(sourceNodes);

              const sum = sourceNodes.reduce((acc, node) => {
                if (node.data.value && typeof node.data.value === "number") {
                  return acc + node.data.value;
                }
                return acc;
              }, 0);

              setValue(sum);
              storeValue(id, { value: sum });
            }}
          >
            refresh
          </button>
        </div>
        <Handle
          className={tw("w-2 h-2")}
          type="source"
          position={Position.Right}
        />
      </div>
    </NodeContainer>
  );
}

export default memo(Node);
