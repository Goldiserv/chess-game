import React, { memo } from "react";
// import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "./store";
import NodeContainer from "./NodeContainer";
import { Handle, Position, useStoreApi, useReactFlow } from "reactflow";
import { RenderSections } from "./NodeSection";

const selector = (id) => (store) => ({
  setValuePrompt: (e) => {
    store.updateNode(id, { prompt: e.target.value });
  },
  getPreviousNodes: (e) => {
    store.updateNode(id, { prompt: e.target.value });
  },
});

const dropdownOptions = [
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
            dropdownOptions={dropdownOptions}
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
