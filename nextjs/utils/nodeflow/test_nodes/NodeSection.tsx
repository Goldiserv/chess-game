import React from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";

const selector = (id) => (store) => ({
  getPreviousNodes: (id) => store.getPreviousNodes(id),
  setValue: (e) => {
    store.updateNode(id, { value: e.target.value });
  },
});

interface NodeSectionProps {
  parentId: string;
  id: string;
  label: string;
  data: any;
  setValue: any;
  hasSourceHandle?: boolean;
  hasTargetHandle?: boolean;
}

export default function NodeSection({
  parentId,
  id,
  label,
  data,
  setValue,
  hasSourceHandle,
  hasTargetHandle,
}: NodeSectionProps) {
  const { getPreviousNodes } = useStore(selector(id), shallow);
  // const { getPreviousNodes } = useStore(selector2, shallow);

  // if connected, get

  return (
    <div>

      {hasSourceHandle && (
        <Handle
          className={tw("w-2 h-2")}
          type="target"
          position={Position.Left}
        />
      )}

      {hasTargetHandle && (
        <Handle
          className={tw("w-2 h-2")}
          type="source"
          position={Position.Right}
        />
      )}

      <div>
        <label className={tw("flex flex-col px-2 pt-1 pb-4 ")}>
          <div className="flex justify-between">
            <p className={tw("text-xs font-bold mb-2")}>{label}</p>
            <p className={tw("text-xs mb-2")}>
              prevNodes: {getPreviousNodes(parentId).length}
            </p>
          </div>
          <input
            className={tw("nodrag border-1 rounded pl-1")}
            type="text"
            defaultValue={data.value}
            onChange={setValue}
          />
        </label>
      </div>
    </div>
  );
}
