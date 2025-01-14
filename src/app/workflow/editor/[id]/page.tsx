import { waitFor } from "@/lib/helper/waitFor";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const { userId } = await auth();
  if (!userId) {
    return <>Unauthorized</>;
  }
  const jobflow = await prisma.jobflow.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!jobflow) {
    return <div>JobFlow not found!</div>;
  }
  return <Editor jobflow={jobflow} />;
};

export default page;
