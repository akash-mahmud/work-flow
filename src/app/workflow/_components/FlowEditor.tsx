"use client";
import { Jobflow } from "@prisma/client";
import React from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
const FlowEditor = ({ jobflow }: { jobflow: Jobflow }) => {
  const [nodes, setNodes, onNodeChange] = useNodesState([]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  return (
    <main className=" h-full w-full">
      <ReactFlow
        edges={edges}
        nodes={nodes}
        onEdgesChange={onEdgeChange}
        onNodesChange={onNodeChange}
      >
        <Controls position={"top-left"} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={2} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
