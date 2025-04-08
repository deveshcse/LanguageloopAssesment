import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/utils/supabase/queries/tasks";
import { TaskFormValues } from "@/schemas/taskSchema";

//  Get all tasks for a given project ID
export const useTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(projectId),
    enabled: !!projectId, // only runs if projectId is available
  });
};

//  Create task
export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });
};

//  Update task
export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: TaskFormValues;
    }) => updateTask(id, updates),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }),
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};

//  Delete task
export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};
