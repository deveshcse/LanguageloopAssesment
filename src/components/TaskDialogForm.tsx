// components/TaskDialogForm.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { taskSchema, TaskFormValues } from "@/schemas/taskSchema";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

type Props = {
  projectId: string;
  triggerButton?: React.ReactNode;
  initialValues?: TaskFormValues & { id?: string };
  onSuccess?: () => void;
};

export function TaskDialogForm({ triggerButton, initialValues, projectId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const isEditing = !!initialValues;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues ?? {
      title: "",
      status: "pending",
      project_id: projectId,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TaskFormValues) => {
      const endpoint = isEditing && initialValues?.id
        ? `/api/tasks/${initialValues.id}`
        : "/api/tasks";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");
    },
    onSuccess: () => {
      toast.success(isEditing ? "Task updated" : "Task created");
      setOpen(false);
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ?? <Button>{isEditing ? "Edit" : "Add"} Task</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Task Title" />
          <Select
            value={form.watch("status")}
            onValueChange={(val) => form.setValue("status", val as TaskFormValues["status"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isPending}>
            {isPending ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
