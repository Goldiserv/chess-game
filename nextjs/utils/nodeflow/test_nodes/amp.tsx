import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
  deleteNode: () => store.deleteNodeAndConnectedEdges(id),
});

export default function Osc({ id, data }) {
  const { setGain, deleteNode } = useStore(selector(id), shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <div
       className={tw(
        "flex rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm justify-between"
      )}
      >
        <p className="flex-1">Number</p>
        <button
          className={tw(
            "bg-gray-500 hover:bg-red-700 text-white px-1 text-xs rounded"
          )}
          onClick={() => {
            console.log("delete");
            deleteNode();
            // store.addAmp();
            // store.addOsc();
          }}
        >
          x
        </button>
      </div>

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Add</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="100"
          value={data.gain}
          onChange={setGain}
        />
        <p className={tw("text-right text-xs")}>{data.gain}</p>
      </label>

      <Handle
        className={tw("w-2 h-2")}
        type="source"
        position={Position.Right}
      />
    </div>
  );
}
