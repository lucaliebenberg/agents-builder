import type { Node, BuiltInNode } from '@xyflow/react';

export type RagAgentNode = Node<
  {
    label: string;
    model: string;
    temperature: number;
    systemPrompt: string;
  },
  'rag-agent'
>;

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type AppNode = BuiltInNode | PositionLoggerNode | RagAgentNode;
