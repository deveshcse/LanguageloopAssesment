"use client";
import { ClientSidePagination } from "./ClientSidePagination";
import { ServerSidePagination } from "./ServerSidePagination";
export default function PaginatedPostsPage() {
  return (
    <div className="m-10">
      <ServerSidePagination />
      <ClientSidePagination />
    </div>
  );
}
