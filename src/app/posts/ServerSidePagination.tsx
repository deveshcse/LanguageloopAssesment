
"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";


import React from 'react'

export const ServerSidePagination = () => {

    const [page, setPage] = useState(1);
    const limit = 10;
  
    const { data, isLoading, isError } = usePosts(page, limit);
  
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error fetching posts</div>;
  
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Server Side pagination</h1>
          <DataTable columns={columns} data={data.posts} />
    
          <div className="flex justify-between items-center">
            <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              disabled={(page * limit) >= data.total}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      );
}
