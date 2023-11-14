// NodeHeader.tsx
import React from "react";
import { tw } from "twind";

interface NodeHeaderProps {
  title: string;
  onDelete: () => void;
  // onDragStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const NodeHeader: React.FC<NodeHeaderProps> = ({ title, onDelete }) => {
  return (
    <div
      className={tw(
        "flex rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm justify-between",
        // " cursor-grab",
        "header-drag-handle"
      )}
      // onMouseDown={onDragStart} // Handle drag start event
    >
      <p className="flex-1">{title}</p>
      <button
        className={tw(
          "flex items-center justify-center border border-gray-400 hover:bg-red-800 text-white px-1 pb-[1px] text-xs rounded"
        )}
        onClick={onDelete}
      >
        ×
      </button>
    </div>
  );
};

export default NodeHeader;
