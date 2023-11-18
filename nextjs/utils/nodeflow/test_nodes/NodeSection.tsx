import React from "react";
import { Handle, Position, useReactFlow, useStoreApi } from "reactflow";
// import { shallow } from "zustand/shallow";
import { tw } from "twind";
// import { useStore } from "./store";

function RenderHandle(handleId, sectionData) {
  if (!sectionData || !sectionData.handle) return <></>;

  if (sectionData.handle === "target") {
    return (
      <Handle
        className={tw("w-2 h-2")}
        type="target"
        position={Position.Left}
        id={handleId}
      />
    );
  }

  if (sectionData.handle === "source") {
    return (
      <Handle
        className={tw("w-2 h-2")}
        type="source"
        position={Position.Right}
        id={handleId}
      />
    );
  }
}


export function RenderSections({ dropdownOptions, sectionData, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            nodeSections: {
              ...node.data.nodeSections,
              [handleId]: evt.target.value,
            },
          };
        }
        return node;
      })
    );
  };

  if (sectionData.sectionType === "textbox") {
    return (
      <div className="relative flex mb-10">
        <label className={tw("flex flex-col px-2 pt-1 pb-4 ")}>
          <div className="flex justify-between">
            <p className={tw("text-xs font-bold mb-2")}>{sectionData.label}</p>
          </div>
          <input
            className={tw("nodrag border-1 rounded pl-1")}
            type="text"
            defaultValue={sectionData.value}
            onChange={onChange}
          />
        </label>

        {RenderHandle(handleId, sectionData)}
      </div>
    );
  }

  if (sectionData.sectionType === "dropdown") {
    return (
      <div className="relative flex mb-10">
        <div className="ml-2">{sectionData.label}: </div>
        <select className="nodrag mr-2" onChange={onChange} value={sectionData}>
          {dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {RenderHandle(handleId, sectionData)}
      </div>
    );
  }
}


// interface NodeSectionProps {
//   parentId: string;
//   id: string;
//   label: string;
//   data: any;
//   setValue: any;
//   hasSourceHandle?: boolean;
//   hasTargetHandle?: boolean;
// }

// export default function NodeSection({
//   parentId,
//   id,
//   label,
//   data,
//   setValue,
//   hasSourceHandle,
//   hasTargetHandle,
// }: NodeSectionProps) {
//   const { getPreviousNodes } = useStore(selector(id), shallow);
//   // const { getPreviousNodes } = useStore(selector2, shallow);

//   // if connected, get

  

//   return (
//     <div>

//       {hasSourceHandle && (
//         <Handle
//           className={tw("w-2 h-2")}
//           type="target"
//           position={Position.Left}
//         />
//       )}

//       {hasTargetHandle && (
//         <Handle
//           className={tw("w-2 h-2")}
//           type="source"
//           position={Position.Right}
//         />
//       )}

//       <div>
//         <label className={tw("flex flex-col px-2 pt-1 pb-4 ")}>
//           <div className="flex justify-between">
//             <p className={tw("text-xs font-bold mb-2")}>{label}</p>
//             <p className={tw("text-xs mb-2")}>
//               prevNodes: {getPreviousNodes(parentId).length}
//             </p>
//           </div>
//           <input
//             className={tw("nodrag border-1 rounded pl-1")}
//             type="text"
//             defaultValue={data.value}
//             onChange={setValue}
//           />
//         </label>
//       </div>
//     </div>
//   );
// }
