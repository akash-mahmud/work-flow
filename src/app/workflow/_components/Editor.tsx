"use client";
import { Jobflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "reactflow";
import FlowEditor from "./FlowEditor";
const Editor = ({ jobflow }: { jobflow: Jobflow }) => {
  return (
    <ReactFlowProvider>
      <div className=" flex flex-col overflow-hidden h-full w-full">
        <section className=" flex h-full overflow-auto">
          <FlowEditor jobflow={jobflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
