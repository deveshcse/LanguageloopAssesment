"use client";

import { usePosts } from "@/hooks/usePosts";
import { columns } from "./columns"; // your existing column definition
import { DataTableClient } from "@/components/DataTableClient";
import { Post } from "@/types/postResponseTypes";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import page from "../dashboard/page";
import { keepPreviousData } from "@tanstack/react-query";
export const ClientSidePagination = () => {
  const { data, isLoading, isError } = usePosts();

  // const {
  //   data: posts,

  // } = useCustomQuery({
  //   apiPath: "posts",
  //   payload: { limit: 20},
  //   showToastMsg: "Posts fetched successfully",
  //   queryKey: ["posts", page],
  //   placeholderData: keepPreviousData,
  // });

  //console.log("posts", posts);

  const {
    data: postsnew,

  } = useCustomQuery({
    apiPath: "posts",
    payload: { limit: 10, skip: 20 },
    showToastMsg: "Posts fetched successfully",
    queryKey: ["posts", page],
    placeholderData: keepPreviousData,
  });

  //console.log("postsnew", postsnew);


  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading posts.</p>;

  return (
    <div>
      {" "}
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Client Side Pagination</h1>
        <DataTableClient<Post, unknown>
          columns={columns}
          data={data?.posts || []}
        />
      </div>
    </div>
  );
};
