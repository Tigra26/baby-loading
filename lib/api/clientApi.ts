import { RegisterProps, LoginProps } from "@/types/auth";
import { apiClient } from "./client";
import { User } from "@/types/user";
import {
  DeleteDiaryResponse,
  DiaryFormValues,
  EmotionsProps,
  Note,
} from "@/types/diary";
import { WeeksGreeting } from "@/types/dashboard";
import { WeekBaby, WeekGreeting, WeekMom } from "@/types/journey";
import { Task, Tasks } from "@/types/task";

interface LoginResponse {
  user: User;
}
interface RegisterResponse {
  status: number;
}

interface SessionResponse {
  success: boolean;
}

export const register = async (
  regData: RegisterProps
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "auth/register",
    regData
  );
  return response.data;
};

export const login = async (loginData: LoginProps): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    loginData
  );
  return response.data;
};

export const refreshSession = async (): Promise<boolean> => {
  const response = await apiClient.get<SessionResponse>("/auth/session");
  return response.data.success;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getWeeksGreeting = async (): Promise<WeeksGreeting> => {
  const { data } = await apiClient.get<WeeksGreeting>("/weeks/greeting");

  return data;
};

export const getWeeksGreetingPublic = async (): Promise<WeeksGreeting> => {
  const { data } = await apiClient.get<WeeksGreeting>("/weeks/greeting/public");

  return data;
};

export const getEmotions = async (
  page: number,
  limit: number
): Promise<EmotionsProps> => {
  const response = await apiClient.get<EmotionsProps>("/emotions", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const createDiaryNote = async (
  values: DiaryFormValues
): Promise<Note> => {
  const response = await apiClient.post<Note>("/diary", values);
  return response.data;
};

export const updateDiaryNote = async (
  noteId: string,
  values: DiaryFormValues
): Promise<Note> => {
  const response = await apiClient.patch<Note>(`/diary/${noteId}`, values);
  return response.data;
};

export const deleteDiaryNote = async (
  noteId: string
): Promise<DeleteDiaryResponse> => {
  const response = await apiClient.delete<DeleteDiaryResponse>(
    `/diary/${noteId}`
  );
  return response.data;
};

export const getGreeting = async (): Promise<WeekGreeting> => {
  const { data } = await apiClient.get<WeekGreeting>("/weeks/greeting");
  return data;
};

export const getWeekBaby = async (weekNumber: number): Promise<WeekBaby> => {
  const { data } = await apiClient.get<WeekBaby>(`/weeks/${weekNumber}/baby`);
  return data;
};

export const getWeekMom = async (weekNumber: number): Promise<WeekMom> => {
  const { data } = await apiClient.get<WeekMom>(`/weeks/${weekNumber}/mom`);
  return data;
};

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

export const getUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>("/users/current");
  return data;
};

export const uploadImage = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.patch<User>(
    "/users/current/avatars",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProfile = async (
  data: Partial<Omit<User, "_id">>
): Promise<User> => {
  const response = await apiClient.patch<User>("/users/current", data);
  return response.data;
};
