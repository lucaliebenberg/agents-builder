import React from 'react';
import { useDnD } from '../context/DNDProvider';

export const Sidebar = () => {
  const [_, setType] = useDnD();
  console.log(_);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    if (nodeType) setType!(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">
        <h1>Create your Agent</h1>
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
      <div
        className="dndnode rag-agent"
        onDragStart={(event) => onDragStart(event, 'rag-agent')}
        draggable
      >
        Rag Agent Node
      </div>
    </aside>
  );
};
