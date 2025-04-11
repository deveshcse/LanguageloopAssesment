'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/hooks/usePosts";

export const postColumns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
