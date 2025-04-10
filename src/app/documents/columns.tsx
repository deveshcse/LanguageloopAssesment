import type { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "./ActionButtons"; // adjust path

export const columns: ColumnDef<{ id: number; name: string; status: string }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionButtons item={row.original} />,
  },
];
