import { Task } from "@/types/task";
import { apiClient } from "./client";

export interface TaskCreationProps {
  name: string;
  date: string;
}

export const createTask = async (task: TaskCreationProps): Promise<Task> => {
  const { data } = await apiClient.post<Task>("/tasks", task);

  return data;
};
