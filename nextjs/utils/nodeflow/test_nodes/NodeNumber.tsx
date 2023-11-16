import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import NodeContainer from "./NodeContainer";

const selector = (id) => (store) => ({
  setValue: (e) => store.updateNode(id, { value: +e.target.value }),
});

export default function NumberNode({ id, data }) {
  const { setValue } = useStore(selector(id), shallow);

  return (
    <NodeContainer title={"Number"} id={id} headerClassName="bg-blue-500">
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

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
    </NodeContainer>
  );
}
