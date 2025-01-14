"use server";

import { prisma } from "@/lib/prisma";
import { createJobFlowSchema, createJobFlowSchemaType } from "@/schema/jobflow";
import { auth } from "@clerk/nextjs/server";
import { JobFlowStatus } from "@/types/joobflow";
import { redirect } from "next/navigation";

export async function CreateJobFlow(form: createJobFlowSchemaType) {
  const { data, success } = createJobFlowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  const result = await prisma.jobflow.create({
    data: {
      userId,
      definition: "TODO",
      status: JobFlowStatus.DRAFT,
      ...form,
    },
  });
  if (!result) {
    throw new Error("Failed to create the jobflow");
  }
  redirect(`/workflow/editor/${result.id}`);
}
