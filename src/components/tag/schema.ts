import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  type: z.string(),
  organizationId: z.number(),
  userId: z.number(),
});
