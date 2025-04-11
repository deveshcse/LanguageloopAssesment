"use client";

import { usePosts } from "@/hooks/usePosts";
import { columns } from "./columns"; // your existing column definition
import { DataTableClient } from '@/components/DataTableClient';
import { Post } from '@/types/postResponseTypes';



export const ClientSidePagination = () => {


    const { data, isLoading, isError } = usePosts();

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading posts.</p>;

  return (
    <div> <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Client Side Pagination</h1>
      <DataTableClient<Post, unknown> columns={columns} data={data?.posts || []} />
    </div></div>
  )
}
