import { Task, Tasks } from "@/types/task";
import { apiClient } from "./client";

export interface TaskCreationProps {
  name: string;
  date: string;
}

interface ToggleTaskStatus {
  taskId: string;
  isDone: boolean;
}

interface GetTasksParams {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}

export const getTasks = async ({
  page = 1,
  limit = 100,
  sortOrder = "asc",
}: GetTasksParams = {}): Promise<Task[]> => {
  const safeLimit = Math.min(100, Math.max(1, limit));
  const safePage = Math.max(1, page);

  const { data } = await apiClient.get<Tasks>("/tasks", {
    params: { page: safePage, limit: safeLimit, sortOrder },
  });

  return data.tasks;
};

export const createTask = async (task: TaskCreationProps): Promise<Task> => {
  const { data } = await apiClient.post<Task>("/tasks", task);

  return data;
};

export const updateTask = async ({
  taskId,
  isDone,
}: ToggleTaskStatus): Promise<Task> => {
  const { data } = await apiClient.patch<Task>(`/tasks/status/${taskId}`, {
    isDone,
  });

  return data;
};
