import { User } from "@/types/user";
import { apiClient } from "./client";

export const getUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>("/users/current");

  return data;
};
