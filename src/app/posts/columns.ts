
import { Post } from "@/types/postResponseTypes";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "reactions.likes",
    header: "Likes",
    cell: ({ row }) => row.original.reactions.likes,
  },
  {
    accessorKey: "reactions.dislikes",
    header: "Dislikes",
    cell: ({ row }) => row.original.reactions.dislikes,
  },
];
