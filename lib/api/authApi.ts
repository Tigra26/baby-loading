import { RegisterProps, LoginProps } from "@/types/auth";
import { apiClient } from "./client";

export const register = async (regData: RegisterProps) => {
  const response = await apiClient.post("auth/register", regData);
  return response;
};

export const login = async (loginData: LoginProps) => {
  const response = await apiClient.post("/auth/login", loginData);
  return response;
};
