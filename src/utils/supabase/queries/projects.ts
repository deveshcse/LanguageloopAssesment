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
    console.log(user); // Log the user ID for debugging

  const { data, error } = await supabase.from("projects").select("*");

  if (error) throw error;
  return data;
};

export const createProject = async (project: { name: string; description: string }) => {
  const { data, error } = await supabase.from("projects").insert({ ...project, user_id: user.id }).select().single();

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
