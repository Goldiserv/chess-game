import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const NodeType = 'DAG_NODE';

const DragNode = ({ value, onDrop, initialX, initialY }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [{ isDragging }, drag] = useDrag({
    type: NodeType,
    item: { type: NodeType, x: position.x, y: position.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDrag = (e) => {
    const { clientX, clientY } = e;
    console.log({ clientX, clientY });
    // setPosition({
    //   x: clientX - offset.x,
    //   y: clientY - offset.y,
    // });
  };

  return (
    <div
      ref={(node) =>
        drag(node, {
          onDragStart: (e) => {
            const boundingBox = node.getBoundingClientRect();
            const offsetX = boundingBox.x - position.x;
            const offsetY = boundingBox.y - position.y;
            setOffset({ x: offsetX, y: offsetY });
          },
        })
      }
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #000',
        padding: '8px',
        margin: '4px',
        cursor: 'move',
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseMove={(e) => {
        if (e.buttons === 1) {
          handleDrag(e);
        }
      }}
    >
      {value}
    </div>
  );
};

export default DragNode;
