import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type RagAgentNode = Node<{ label: string }, 'rag-agent'>;
export type AppNode = BuiltInNode | PositionLoggerNode | RagAgentNode;
