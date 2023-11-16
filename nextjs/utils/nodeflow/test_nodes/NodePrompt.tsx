import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import NodeContainer from "./NodeContainer";

const selector = (id) => (store) => ({
  setValue: (e) => {
    store.updateNode(id, { value: e.target.value });
  },
});

export default function Node({ id, data }) {
  const { setValue } = useStore(selector(id), shallow);

  const setType = () => {
    console.log("todo");
  };

  return (
    <NodeContainer title={"Prompt"} id={id}>
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
      />

      <div>
        <label className={tw("flex flex-col px-2 pt-1 pb-4 ")}>
          <div className="flex justify-between">
            <p className={tw("text-xs font-bold mb-2")}>Prompt</p>
          </div>
          <input
            className={tw("nodrag border-1 rounded pl-1")}
            type="text"
            defaultValue={data.value}
            onChange={setValue}
          />
        </label>

        <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
          <p className={tw("text-xs font-bold mb-2")}>AI tool</p>
          <select className="nodrag" value={data.type} onChange={setType}>
            {/* <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option> */}
            <option value="gpt4">GPT4</option>
          </select>
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

{
  /* <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Text</p>
        <select className="nodrag" value={data.type} onChange={setType}>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="gpt4">square</option>
        </select>
      </label> */
}
