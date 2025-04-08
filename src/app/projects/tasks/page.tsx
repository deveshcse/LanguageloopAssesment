"use client";

import { useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { TaskDialogForm } from "@/components/TaskDialogForm";
import { DeleteDialog } from "@/components/DeleteDialog";
import { toast } from "sonner";

import {
  useTasks,
  useDeleteTask,
} from "@/hooks/useTasks"; // <-- use your hooks here

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  project_id: string;
};

export default function TaskPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const { data: tasks, isLoading, isError } = useTasks(projectId || "");
  const deleteMutation = useDeleteTask(projectId || "");

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <span className="capitalize">{task.status.replace("_", " ")}</span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const task = row.original;

        return (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <TaskDialogForm
              projectId={task.project_id}
              initialValues={task}
              triggerButton={
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              }
              onSuccess={() => console.log("Refetch tasks")}
            />

            <DeleteDialog
              onConfirm={() => handleDelete(task.id)}
              triggerButton={
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  if (!projectId) return <div>No project ID found in URL</div>;
  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Failed to load tasks</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Tasks for Project ID: {projectId}
        </h1>
        <TaskDialogForm
          projectId={projectId}
          triggerButton={
            <Button variant="default" size="sm">
              + Add Task
            </Button>
          }
        />
      </div>

      <DataTable columns={columns} data={tasks || []} />
    </div>
  );
}
