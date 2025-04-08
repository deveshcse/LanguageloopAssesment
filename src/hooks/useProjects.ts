import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/utils/supabase/queries/projects";
import { ProjectFormValues } from "@/schemas/projectSchema";

export const useProjects = () => {
  return useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ProjectFormValues }) => updateProject(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    onError: (error) => {
        console.error("Error updating project:", error);
        }

  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};
