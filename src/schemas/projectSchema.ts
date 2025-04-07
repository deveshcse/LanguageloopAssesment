import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
