import { z } from "zod";
export const createJobFlowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});
export type createJobFlowSchemaType = z.infer<typeof createJobFlowSchema>;
