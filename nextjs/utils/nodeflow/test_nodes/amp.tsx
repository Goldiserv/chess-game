import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import { useGenericNode } from "./NodeHooks";
import NodeHeader from "./NodeHeader";

const selector = (id) => (store) => ({
  setValue: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function NumberNode({ id, data }) {
  const { setValue } = useStore(selector(id), shallow);
  const { deleteNode } = useGenericNode(id);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <NodeHeader title="Number" onDelete={deleteNode} />

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Value</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="100"
          value={data.gain}
          onChange={setValue}
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
