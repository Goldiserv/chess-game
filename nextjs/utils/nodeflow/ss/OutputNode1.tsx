import React from 'react';

interface OutputNodeProps {
  label: string;
  onDragStart: () => void;
}

const OutputNode: React.FC<OutputNodeProps> = ({ label, onDragStart }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart();
    // Set data to be transferred during drag
    const dataTransfer = { type: 'output' };
    event.dataTransfer.setData('text/plain', JSON.stringify(dataTransfer));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ padding: '8px', border: '1px solid darkblue', marginBottom: '8px' }}
    >
      {label}
    </div>
  );
};

export default OutputNode;
