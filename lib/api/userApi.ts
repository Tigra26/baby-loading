import { User } from "@/types/user";
import { apiClient } from "./client";

export const getUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>("/users/current");

  return data;
};

export const updateProfile = async (
  data: Partial<Omit<User, "_id" | "avatarUrl">>
): Promise<User> => {
  const response = await apiClient.patch<User>("/users/current", data);
  return response.data;
};

export const updateAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await apiClient.patch<User>(
    "/users/current/avatars",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
