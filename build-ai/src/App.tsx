import { useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel,
  NodeTypes,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { Sidebar } from './sidebar/Sidebar';
import { DnDProvider, useDnD } from './context/DNDProvider';
import { AppNode } from './nodes/types';
import { RagAgentNode } from './nodes/RagAgentNode';

// Define node types
const nodeTypes: NodeTypes = {
  'rag-agent': RagAgentNode,
  // Add other custom node types here
};

export const initialNodes: AppNode[] = [
  // Your existing nodes...
  {
    id: 'e',
    type: 'rag-agent',
    position: { x: 0, y: 100 },
    data: {
      label: 'Rag Agent',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      systemPrompt: 'You are a helpful AI assistant.',
    },
  },
];

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, setViewport, zoomIn, zoomOut } = useReactFlow();
  const [type] = useDnD();

  const handleTransform = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  const onConnect = useCallback(
    // @ts-ignore
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `dndnode_${nodes.length + 1}`,
        type,
        position,
        data:
          type === 'rag-agent'
            ? {
                label: 'New Rag Agent',
                model: 'gpt-3.5-turbo',
                temperature: 0.7,
                systemPrompt: 'You are a helpful AI assistant.',
              }
            : { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, nodes.length, setNodes]
  );

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
