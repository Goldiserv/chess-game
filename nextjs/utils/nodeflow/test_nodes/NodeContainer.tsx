/**
 * Node container should handle common node functions incl.
 * - Close / delete
 * - Side window
 * - Selected highlight
 **/
import React from "react";
import { tw } from "twind";
import { useGenericNode } from "./NodeHooks";
import NodeHeader from "./NodeHeader";

export type NodeContainerProps = {
  id: string;
  title: string;
  headerClassName?: string;
  children?: any;
};

export default function Node({ id, children, title, headerClassName }: NodeContainerProps) {
  const { deleteNode, isNodeSelected } = useGenericNode(id);

  return (
    <div
      className={tw(
        "rounded-md bg-white shadow-xl border-1",
        isNodeSelected() ? "border-2 border-gray-300" : ""
      )}
    >
      <NodeHeader
        title={title}
        onDelete={deleteNode}
        className={headerClassName ? headerClassName : "bg-green-500"}
      />

      {children}
    </div>
  );
}
