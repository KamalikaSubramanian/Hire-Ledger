// src/validators/application.validator.ts

import { z } from "zod";

export const ApplicationSchema = z.object({
  company: z.string().min(2, "Company is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  location: z.string().min(2, "Location is required"),
  appliedDate: z.date(),
});

export type ApplicationFormValues =
  z.infer<typeof ApplicationSchema>;
  
  
// z.infer<typeof ApplicationSchema>
// This tells Zod:
// "Look at this schema and generate the matching TypeScript type."