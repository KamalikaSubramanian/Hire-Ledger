import { z } from "zod";

export const jobDescriptionSchema = z.object({
  jobDescription: z
    .string()
    .min(100, "Job description should be at least 100 characters."),
});

export type JobDescriptionFormValues =
  z.infer<typeof jobDescriptionSchema>;