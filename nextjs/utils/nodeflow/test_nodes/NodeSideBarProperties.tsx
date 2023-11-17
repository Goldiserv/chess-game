import React, { useState, useEffect } from "react";
import { tw } from "twind";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
});

export default () => {
  const store = useStore(selector, shallow);
  
  const selectedNode = store.nodes.find((n) => n.selected === true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNodeProperties, setSelectedNodeProperties] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Update selected node properties when a new node is selected
  useEffect(() => {
    if (selectedNode) {
      // Example: Retrieve properties of the selected node (replace with your logic)
      setSelectedNodeProperties(selectedNode.data);
      // setIsSidebarOpen(true); // Open sidebar when a node is selected
    } else {
      setSelectedNodeProperties(null); // Clear properties if no node is selected
      // setIsSidebarOpen(false); // Close sidebar if no node is selected
    }
  }, [selectedNode]);

  return (
    <aside
      className={tw(
        "absolute top-0 right-0 z-10 h-full w-40 flex flex-col bg-gray-200 p-4",
        isSidebarOpen ? "" : "w-0" // Collapse sidebar by setting width to 0 when it's closed
      )}
    >
      {isSidebarOpen && (
        <>
          <h2 className={tw("mb-4 font-semibold")}>Node Properties</h2>
          {selectedNodeProperties && (
            // Display properties of the selected node
            <div className={tw("bg-white p-2 rounded-md shadow-md mb-2")}>
              <h3 className={tw("text-sm font-semibold mb-1")}>
                Selected Node
              </h3>
              {/* <p>id: {selectedNode.id}</p> */}

              <p>{selectedNodeProperties.value}</p>
            </div>
          )}
        </>
      )}
      <button
        onClick={toggleSidebar}
        className={tw("mt-auto bg-gray-300 p-2 rounded-md hover:bg-gray-400")}
      >
        {isSidebarOpen ? ">>" : "<<"}
      </button>
    </aside>
  );
};

