import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Fetch tasks for a specific project
export const fetchTasks = async (projectId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId);

  if (error) throw error;
  return data;
};

// Create a new task for a project (no user_id)
export const createTask = async (task: {
  title: string;
  status: "pending" | "in_progress" | "completed";
  project_id: string;
}) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update an existing task
export const updateTask = async (
  id: string,
  updates: {
    title?: string;
    status?: "pending" | "in_progress" | "completed";
  }
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a task
export const deleteTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;
  return true;
};
