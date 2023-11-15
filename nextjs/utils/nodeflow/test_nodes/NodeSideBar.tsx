import React, { useState } from 'react';
import { tw } from 'twind';

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className={tw(
      "absolute top-0 left-0 z-10 h-full w-40 flex flex-col bg-gray-200 p-4",
      isSidebarOpen ? '' : 'w-0' // Collapse sidebar by setting width to 0 when it's closed
    )}>
      {isSidebarOpen && (
        <>
          <h2 className={tw("mb-4 font-semibold")}>Node Menu</h2>
          <div className={tw("bg-white p-2 rounded-md shadow-md mb-2")} 
            onDragStart={(event) => onDragStart(event, 'prompt')} draggable>
            Prompt Node
          </div>
          <div className={tw("bg-white p-2 rounded-md shadow-md mb-2")} 
            onDragStart={(event) => onDragStart(event, 'amp')} draggable>
            Number Node
          </div>
          <div className={tw("bg-white p-2 rounded-md shadow-md mb-2")} 
            onDragStart={(event) => onDragStart(event, 'out')} draggable>
            Sum Node
          </div>
        </>
      )}
      <button 
        onClick={toggleSidebar} 
        className={tw("mt-auto bg-gray-300 p-2 rounded-md hover:bg-gray-400")}
      >
        {isSidebarOpen ? '<<' : '>>'}
      </button>
    </aside>
  );

};
