import React, { useState, useRef } from "react";

interface NodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  onConnect: () => void;
}

interface OutputNodeProps extends NodeProps {
  // additional props for OutputNode if needed
}

const OutputNode: React.FC<OutputNodeProps> = ({
  id,
  x,
  y,
  label,
  onConnect,
}) => {
  // const inputNodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    onConnect(); // Trigger the connection action
  };

  return (
    <div id={id} className="absolute" style={{ left: `${x}px`, top: `${y}px` }}>
      <svg width="100" height="20">
        <circle
          cx="85"
          cy="10"
          r="5"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <text x="0" y="15" className="select-none">
          {label}
        </text>
      </svg>
    </div>
  );
};

export default OutputNode;
