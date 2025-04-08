// app/project/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { ProjectDialogForm } from "@/components/ProjectDialogForm";
import { DeleteDialog } from "@/components/DeleteDialog";
import { toast } from "sonner";
import { useDeleteProject, useProjects } from "@/hooks/useProjects";

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};





const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;
      

      return (
        <div className="flex gap-2">
          <ProjectDialogForm
            initialValues={{
              id: project.id,
              name: project.name,
              description: project.description,
            }}
            triggerButton={
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                Edit
              </Button>
            }
            //onSuccess={refetchProjects} // Make sure this is available in scope
          />

          <DeleteDialog
            onConfirm={() => handleDelete(project.id)} // or task.id
            triggerButton={
              <Button variant="destructive" size="sm" onClick={(e) => e.stopPropagation()}>
                Delete
              </Button>
            }
          />
        </div>
      );
    },
  },
];

export default function ProjectPage() {
  const router = useRouter();
  const { data: projects, isLoading, isError } = useProjects();


  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Failed to load projects</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <ProjectDialogForm />
      </div>
      <DataTable
        columns={columns}
        data={projects || []}
        onRowClick={(project) =>
          router.push(`/projects/tasks?id=${project.id}`)
        }
      />
    </div>
  );
}
