"use client";

import { columns } from "./columns"; // your existing column definition
import { DataTableClient } from "@/components/DataTableClient";
import { Post } from "@/types/postResponseTypes";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { keepPreviousData } from "@tanstack/react-query";
export const ClientSidePagination = () => {

  const {
    data,
    isLoading,
    isError,
  } = useCustomQuery({
    apiPath: "posts",
    payload: { limit: 251},
    showToastMsg: "Posts fetched successfully",
    queryKey: ["posts", 1],
    placeholderData: keepPreviousData,
  });




  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading posts.</p>;

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Client Side Pagination</h1>
        <DataTableClient<Post, unknown>
          columns={columns}
          data={data?.posts ?? []}
        />
      </div>
    </div>
  );
};
