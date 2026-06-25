import { RegisterProps, LoginProps } from "@/types/auth";
import { apiClient } from "./client";
import { User } from "@/types/user";

interface SessionResponse {
  success: boolean;
}

export const register = async (regData: RegisterProps) => {
  const response = await apiClient.post("auth/register", regData);
  return response.data;
};

export const login = async (loginData: LoginProps): Promise<User> => {
  const response = await apiClient.post<User>("/auth/login", loginData);
  return response.data;
};

export const refreshSession = async (): Promise<boolean> => {
  const response = await apiClient.get<SessionResponse>("/auth/session");
  return response.data.success;
};
