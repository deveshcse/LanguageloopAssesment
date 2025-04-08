import { createClient } from "@/utils/supabase/client";


const supabase = createClient();
// const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();
//     // Check if user is logged in
//   if (userError) throw userError;
//   if (!user) throw new Error("User not found");


export const fetchProjects = async () => {

  const { data, error } = await supabase.from("projects").select("*");

  if (error) throw error;
  return data;
};

export const createProject = async (project: { name: string; description: string, user_id:string}) => {
  const { data, error } = await supabase.from("projects").insert(project).select().single();

  if (error) throw error;
  return data;
};

export const updateProject = async (id: string, updates: { name: string; description: string }) => {
  const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();
   
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
  return true;
};
