// schemas/taskSchema.ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["pending", "in_progress", "completed"]),
  project_id: z.string().uuid(), // Ensure you pass this in
});

export type TaskFormValues = z.infer<typeof taskSchema>;
