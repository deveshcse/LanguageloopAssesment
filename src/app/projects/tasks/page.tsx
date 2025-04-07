// app/project/tasks/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

const statusOptions = ["pending", "in_progress", "completed"];

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
        <Select defaultValue={task.status}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
    cell: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
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
        <Button>Create Task</Button>
      </div>

      <DataTable columns={columns} data={dummyTasks} />
    </div>
  );
}
