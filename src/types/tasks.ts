export type Task = {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "completed";
    created_at: string;
    project_id: string;
  };
  