import React, { memo } from "react";
// import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import NodeContainer from "./NodeContainer";
import { Handle, Position, useStoreApi, useReactFlow } from "reactflow";
import NodeSection from "./NodeSection";

const selector = (id) => (store) => ({
  setValuePrompt: (e) => {
    store.updateNode(id, { prompt: e.target.value });
  },
  getPreviousNodes: (e) => {
    store.updateNode(id, { prompt: e.target.value });
  },
});

const options = [
  {
    value: "gpt4",
    label: "GPT4",
  },
];

const defaultNodeData = [
  {
    id: "prompt-generatedId",
    type: "prompt",
    data: {
      nodeSections: {
        "prompt-generatedId-handle-0": {
          label: "Prompt",
          value: "your prompt",
          type: "string",
        },
        "prompt-generatedId-handle-1": {
          label: "AI Engine",
          value: "gpt3",
          type: "dropdown",
        },
      },
    },
    position: { x: 0, y: 0 },
  },
];

const dataReporter = () => {
  const sections = defaultNodeData[0].data.nodeSections;

  const jsxElements = Object.keys(sections).map((key) => {
    const section = sections[key];
    return (
      <div key={key}>
        <label>{section.label}</label>
        <span>{section.value}</span>
      </div>
    );
  });
  return jsxElements;
};

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

function RenderSections({ sectionData, handleId, nodeId }) {
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
          {options.map((option) => (
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

function Node({ id, data }) {
  const { setValuePrompt } = useStore(selector(id), shallow);
  // const { getPreviousNodes } = useStore(selector, shallow);

  const getPreviousNodes = () => {
    return null;
  };

  return (
    <NodeContainer title={"Prompt"} id={id}>
      <div className={tw("flex flex-col pt-1 pb-4 ")}>
        {Object.keys(data.nodeSections).map((handleId) => (
          <RenderSections
            key={handleId}
            nodeId={id}
            sectionData={data.nodeSections[handleId]}
            handleId={handleId}
          />
        ))}
      </div>
    </NodeContainer>
  );
}

export default memo(Node);
