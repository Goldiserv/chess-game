import React from 'react';

export interface ConnectionProps {
  inputNode: React.RefObject<HTMLElement>;
  outputNode: React.RefObject<HTMLElement>;
}

const ConnectionComponent: React.FC<ConnectionProps> = ({ inputNode, outputNode }) => {
  const drawConnection = () => {
    if (inputNode.current && outputNode.current) {
      const inputRect = inputNode.current.getBoundingClientRect();
      const outputRect = outputNode.current.getBoundingClientRect();

      const startX = inputRect.left + inputRect.width / 2;
      const startY = inputRect.top + inputRect.height / 2;

      const endX = outputRect.left + outputRect.width / 2;
      const endY = outputRect.top + outputRect.height / 2;

      return (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="black"
          strokeWidth="2"
        />
      );
    }

    return null;
  };

  return <svg width="100%" height="100%">{drawConnection()}</svg>;
};

export default ConnectionComponent;
