"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";
import { ProjectFormValues, projectSchema } from "@/schemas/projectSchema";
import { useAuth } from "@/context/AuthContext";




type Props = {
  triggerButton?: React.ReactNode;
  initialValues?: ProjectFormValues & { id?: string };
  onSuccess?: () => void;
};

export function ProjectDialogForm({
  triggerButton,
  initialValues,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialValues?.id;
  const { user} = useAuth();

  console.log("user", user); // debug


  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      ...initialValues,
    },
  });

  useEffect(() => {
    if (open && initialValues) {
      form.reset(initialValues);
    }
  }, [open, initialValues, form]);

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const onSubmit = (values: { name: string; description: string }) => {

    if (isEditing && initialValues?.id) {
      updateProject.mutate(
        {
          id: initialValues.id,
          updates: {
            name: values.name,
            description: values.description,
          },
        },
        {
          onSuccess: () => {
            toast.success("Project updated");
            form.reset();
            setOpen(false);
            onSuccess?.();
          },
          onError: () => toast.error("Failed to update project"),
        }
      );
    } else {
      createProject.mutate({
        name: values.name,
        description: values.description,
        user_id: user!.id, 
      }, {
        onSuccess: () => {
          toast.success("Project created");
          form.reset();
          setOpen(false);
          onSuccess?.();
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ?? (
          <Button>{isEditing ? "Edit" : "Create"} Project</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Project Name" {...form.register("name")} onClick={(e) => e.stopPropagation()}/>
          <Input placeholder="Description" {...form.register("description")} onClick={(e) => e.stopPropagation()} />
          <Button
            type="submit"
            disabled={createProject.isPending || updateProject.isPending}
            onClick={(e) => e.stopPropagation()}
          >
            {createProject.isPending || updateProject.isPending
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
