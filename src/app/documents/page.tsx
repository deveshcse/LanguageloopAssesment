import { Item } from "@/types/item";
import { columns } from "./columns"; // Assuming you export them
import { DataTable } from "@/components/DataTable";

export default function DocumentsPage() {


  const documentsData: Item[] = [
    {
      id: "doc_001",
      title: "Employee Handbook",
      description: "Company policies and procedures.",
      createdAt: "2025-04-10",
    },
    {
      id: "doc_002",
      title: "Project Plan Q2",
      description: "Objectives and timeline for Q2 project.",
      createdAt: "2025-04-09",
    },
    {
      id: "doc_003",
      title: "Budget Report",
      description: "Detailed expense report for March.",
      createdAt: "2025-04-08",
    },]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <DataTable columns={columns} data={documentsData} />
    </div>
  );
}
