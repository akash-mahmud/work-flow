"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteJobFlow(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  await prisma.jobflow.delete({
    where: {
      userId,
      id,
    },
  });
  revalidatePath("/workflows");
}
