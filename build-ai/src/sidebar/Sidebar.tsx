import React from 'react';
import { useDnD } from '../context/DNDProvider';

export const Sidebar = () => {
  const [_, setType] = useDnD();
  console.log;

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    if (nodeType) setType!(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', nodeType);
  };

  return (
    <aside className="w-60 bg-gray-100 p-4 border-r">
      <div className="description mb-4">
        <h1 className="text-xl font-bold">Create your Agent</h1>
      </div>

      <div className="space-y-3">
        {[
          {
            type: 'rag-agent',
            label: 'Rag Agent Node',
            className: 'bg-purple-100 border-purple-500',
          },
        ].map(({ type, label, className }) => (
          <div
            key={type}
            className={`
              dndnode 
              p-3 
              border-2 
              rounded-md 
              cursor-grab 
              hover:opacity-80 
              active:cursor-grabbing 
              ${className}
            `}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
          >
            {label}
          </div>
        ))}
      </div>
    </aside>
  );
};
