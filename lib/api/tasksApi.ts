import { Task } from "@/types/task";
import { apiClient } from "./client";

export const clientGetTasks = async (): Promise<Task[]> => {
  const { data } = await apiClient.get<Task[]>("/tasks");

  return data;
};
