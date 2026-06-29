import { RegisterProps, LoginProps } from "@/types/auth";
import { apiClient } from "./client";
import { User } from "@/types/user";

interface LoginResponse {
  user: User;
}

interface SessionResponse {
  success: boolean;
}

export const register = async (regData: RegisterProps) => {
  const response = await apiClient.post("auth/register", regData);
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
