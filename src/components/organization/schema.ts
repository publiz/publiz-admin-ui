import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string(),
  verified: z.boolean(),
  ownerId: z.number(),
});
