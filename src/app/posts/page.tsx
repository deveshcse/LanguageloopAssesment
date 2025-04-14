"use client";
import { ClientSidePagination } from "./ClientSidePagination";
import { ServerSidePagination } from "./ServerSidePagination";
import SheetExample from "./SheetExample";
export default function PaginatedPostsPage() {
  return (
    <div className="m-10">
      <SheetExample />
      <ServerSidePagination />
      <ClientSidePagination />
    </div>
  );
}
