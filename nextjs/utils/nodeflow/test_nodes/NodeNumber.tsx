import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import { useGenericNode } from "./NodeHooks";
import NodeHeader from "./NodeHeader";

const selector = (id) => (store) => ({
  setValue: (e) => store.updateNode(id, { value: +e.target.value }),
  // setSelected: () => {
  //   console.log('test2', id);
  //   store.updateNode(id, { selected: true });
  // },
});

export default function NumberNode({ id, data }) {
  const { setValue } = useStore(
    selector(id),
    shallow
  );
  const { deleteNode, isNodeSelected } = useGenericNode(id);

  return (
    <div
      className={tw(
        "rounded-md bg-white shadow-xl border-1",
        isNodeSelected() ? "border-1 border-gray-300" : ""
      )}
    >
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <NodeHeader title="Number" onDelete={deleteNode} />

      <div>
        <label className={tw("flex flex-col px-2 pt-1 pb-4 ")}>
          <div className="flex justify-between">
            <p className={tw("text-xs font-bold mb-2")}>Value</p>
            <p className={tw("text-right text-xs")}>{data.value}</p>
          </div>
          {/* <p className={tw("text-right text-xs")}>
            {isNodeSelected() ? "selected" : "not selected"}
          </p> */}
          <input
            className="nodrag"
            type="range"
            min="0"
            max="100"
            value={data.value}
            onChange={setValue}
          />
        </label>
      </div>

      <Handle
        className={tw("w-2 h-2")}
        type="source"
        position={Position.Right}
      />
    </div>
  );
}
