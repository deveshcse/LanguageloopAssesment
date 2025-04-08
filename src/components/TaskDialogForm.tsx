// components/TaskDialogForm.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { TaskFormValues, taskSchema } from "@/schemas/taskSchema";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";

type Props = {
  projectId: string;
  triggerButton?: React.ReactNode;
  initialValues?: TaskFormValues & { id?: string };
  onSuccess?: () => void;
};

export function TaskDialogForm({
  triggerButton,
  initialValues,
  projectId,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const isEditing = !!initialValues?.id;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues ?? {
      title: "",
      status: "pending",
      project_id: projectId,
    },
  });

  const createTask = useCreateTask(projectId);
  const updateTask = useUpdateTask(projectId);

  const onSubmit = (values: TaskFormValues) => {
    const payload = { ...values, project_id: projectId };

    const mutation = isEditing
      ? updateTask.mutateAsync({ id: initialValues.id!, updates: payload })
      : createTask.mutateAsync(payload);

    mutation
      .then(() => {
        toast.success(isEditing ? "Task updated" : "Task created");
        form.reset();
        setOpen(false);
        onSuccess?.();
      })
      .catch(() => toast.error("Something went wrong"));
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
            onValueChange={(val) =>
              form.setValue("status", val as TaskFormValues["status"])
            }
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

          <Button type="submit" disabled={createTask.isPending || updateTask.isPending}>
            {createTask.isPending || updateTask.isPending
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
