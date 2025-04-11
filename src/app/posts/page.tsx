"use client";

import { usePosts } from "@/hooks/usePosts";
import { postColumns } from "./columns";
import { useMemo, useState } from "react";
import { DataTableWithClientSidePagination } from "@/components/DataTableWithClientSidePagination";
import { Pagination } from "@/components/Pagination";

export default function PostsPage() {
  const { data, isLoading, error } = usePosts();
  const posts = useMemo(() => data?.posts ?? [], [data]);


  console.log("posts", posts);
 
  

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = useMemo(() => {
    return posts ? Math.ceil(posts.length / pageSize) : 0;
  }, [posts]);

  const currentData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return posts?.slice(start, end) || [];
  }, [posts, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <h1 className="text-lg font-bold mb-4">Client Side Pagination</h1>
      <DataTableWithClientSidePagination
        columns={postColumns}
        data={currentData}
        currentPage={page}
      />
      <Pagination
      currentPage={page}
      totalPages={totalPages}
      onNext={handleNext}
      onPrev={handlePrev}
    />
    </div>
  );
}
