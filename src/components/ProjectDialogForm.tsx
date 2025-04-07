// components/ProjectDialogForm.tsx
"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/schemas/projectSchema";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  triggerButton?: React.ReactNode;
  initialValues?: ProjectFormValues & { id?: string };
  onSuccess?: () => void;
};

export function ProjectDialogForm({ triggerButton, initialValues, onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialValues ?? {
      name: "",
      description: "",
    },
  });

  const isEditing = !!initialValues;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      if (isEditing && initialValues?.id) {
        // Update existing project
        const res = await fetch(`/api/projects/${initialValues.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update project");
      } else {
        // Create new project
        const res = await fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create project");
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? "Project updated" : "Project created");
      onSuccess?.();
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ?? <Button>{isEditing ? "Edit" : "Create"} Project</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Project Name" {...form.register("name")} />
          <Input placeholder="Description" {...form.register("description")} />
          <Button type="submit" disabled={isPending}>
            {isPending ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
