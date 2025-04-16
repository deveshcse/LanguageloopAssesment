import { z } from "zod";

export const itemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  items: z.array(itemSchema).min(1, "At least one item is required"),
});

export const formSchema = z.object({
  title: z.string().min(1, "Form title is required"),
  id: z.string(),
  sections: z.array(sectionSchema).min(1, "At least one section is required"),
});


export type FormValues = z.infer<typeof formSchema>;