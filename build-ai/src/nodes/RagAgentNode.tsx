import { Handle, Position, type NodeProps } from '@xyflow/react';

import { type RagAgentNode } from './types';

export function RagAgentNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
}: NodeProps<RagAgentNode>) {
  const x = `${Math.round(positionAbsoluteX)}px`;
  const y = `${Math.round(positionAbsoluteY)}px`;

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <p style={{ backgroundColor: 'red' }}>Rag Agent Node</p>
      <div>
        {x} {y}
      </div>

      <Handle type="source" position={Position.Bottom} isConnectable={true} />
    </div>
  );
}
