import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { tw } from "twind";

// const selector = (id) => (store) => ({
//   getPreviousNodes: store.getPreviousValues,
//   storeValue: (e) => store.updateNode(id, { value: +e.target.value }),
// });

const selector = (store) => ({
  getPreviousNodes: store.getPreviousNodes,
  deleteEdge: store.deleteEdge,
});

export default function Out({ id, data }) {
  // const { getPreviousNodes, storeValue } = useStore(selector(id), shallow);
  const { getPreviousNodes, deleteEdge } = useStore(selector, shallow);

  const [value, setValue] = useState(0);

  return (
    <div className={tw("rounded-md bg-white shadow-xl px-4 py-2")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Result</p>
        <p className={tw("text-right text-xs")}>{data}</p>
      </label>

      <div className="block">
        <p>{value}</p>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 text-xs rounded"
          onClick={() => {
            const sourceNodes = getPreviousNodes(id);
            console.log(sourceNodes);

            const sum = sourceNodes.reduce((acc, node) => {
              if (node.data.gain && typeof node.data.gain === "number") {
                return acc + node.data.gain;
              }
              return acc;
            }, 0);

            setValue(sum);

            // console.log({ x: getPreviousNodes(id) });
          }}
        >
          refresh
        </button>

      </div>
    </div>
  );
}
