// app/project/tasks/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";

import { TaskDialogForm } from "@/components/TaskDialogForm";
import { DeleteDialog } from "@/components/DeleteDialog";
import { toast } from "sonner";

type Task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  project_id: string;
};

const dummyTasks: Task[] = [
  {
    id: "t1",
    title: "Design schema",
    status: "pending",
    created_at: "2025-04-01",
    project_id: "1",
  },
  {
    id: "t2",
    title: "Implement CRUD",
    status: "in_progress",
    created_at: "2025-04-02",
    project_id: "1",
  },
];

const handleDelete = async (id: string) => {
  try {
    // Example: await deleteProject(id) or deleteTask(id)
    toast.success("Deleted successfully");
    // refetch your data here
  } catch (error) {
    toast.error("Failed to delete");
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
      return <span className="capitalize">{task.status.replace("_", " ")}</span>;
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
            projectId={task.id}
            initialValues={task}
            triggerButton={
              <Button variant="outline" size="sm">
                Edit
              </Button>
            }
            onSuccess={() => console.log("Refetch tasks")}
          />
         <DeleteDialog
  onConfirm={() => handleDelete(project.id)} // or task.id
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


export default function TaskPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  console.log("Project ID from URL:", projectId);


  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Tasks for Project ID: {projectId}
        </h1>
        <TaskDialogForm projectId={projectId!} />
        </div>

      <DataTable columns={columns} data={dummyTasks} />
    </div>
  );
}
