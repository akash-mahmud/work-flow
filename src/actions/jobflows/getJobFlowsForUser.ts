"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetUserJobFlows() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return await prisma.jobflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
