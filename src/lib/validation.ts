import { z } from "zod"

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
});

export type JobFilterValue = z.infer<typeof jobFilterSchema>;