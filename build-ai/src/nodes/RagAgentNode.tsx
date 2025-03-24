import { useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { type RagAgentNode } from './types';

export function RagAgentNode({ id, data, selected }: NodeProps<RagAgentNode>) {
  const [nodeName, setNodeName] = useState(data.label || 'Rag Agent');
  const [agentConfig, setAgentConfig] = useState({
    model: data.model || 'gpt-3.5-turbo',
    temperature: data.temperature || 0.7,
    systemPrompt: data.systemPrompt || '',
  });

  const { setNodes } = useReactFlow();

  // Update node data when configurations change
  const updateNodeData = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: nodeName,
                ...agentConfig,
              },
            }
          : node
      )
    );
  }, [id, nodeName, agentConfig, setNodes]);

  // Handle changes to input fields
  const handleInputChange = (
    field: keyof typeof agentConfig,
    value: string
  ) => {
    const newConfig = { ...agentConfig, [field]: value };
    setAgentConfig(newConfig);
    updateNodeData();
  };

  return (
    <div
      className={`react-flow__node-default flex m-autop-4 rounded-md border-2 ${
        selected ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <input
        value={nodeName}
        onChange={(e) => {
          setNodeName(e.target.value);
          updateNodeData();
        }}
        className="w-full mb-2 px-2 py-1 border rounded"
        placeholder="Node Name"
      />

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <select
            value={agentConfig.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature
          </label>
          <input
            type="number"
            value={agentConfig.temperature}
            onChange={(e) => handleInputChange('temperature', e.target.value)}
            min="0"
            max="1"
            step="0.1"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            value={agentConfig.systemPrompt}
            onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            rows={3}
            placeholder="Enter system prompt..."
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={true}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
}
