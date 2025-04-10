'use client';



import { ColumnDef } from "@tanstack/react-table";
import { AclButton } from "@/components/AclButton";
import { Item } from "@/types/item";

// type Item = {
//     id: string;
//     name: string;
//     description: string;
//     created_at: string;
//   };

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div className="flex gap-2">
          <AclButton action="view" subject="documents" onClick={() => alert(`Viewing ${doc.title}`)}>
            View
          </AclButton>
          <AclButton action="create" subject="documents" onClick={() => alert(`Viewing ${doc.title}`)}>
            create
          </AclButton>
          <AclButton action="update" subject="documents" onClick={() => alert(`Editing ${doc.title}`)}>
            Edit
          </AclButton>
          <AclButton action="delete" subject="documents" variant="destructive" onClick={() => alert(`Deleting ${doc.title}`)}>
            Delete
          </AclButton>
        </div>
      );
    },
  },
];
