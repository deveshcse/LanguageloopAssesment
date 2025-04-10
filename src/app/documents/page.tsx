"use client";

import { DataTable } from "@/components/DataTable"; // your shared component
import { columns } from "./columns";

const data = [
  { id: 1, name: "Document A", status: "Draft" },
  { id: 2, name: "Document B", status: "Published" },
  { id: 3, name: "Document C", status: "Archived" },
];



export default function DocumentPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
