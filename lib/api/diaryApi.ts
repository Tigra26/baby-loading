import { DiaryProps } from "@/types/diary";
import { apiClient } from "./client";

export const getDiaryList = async (): Promise<DiaryProps> => {
  const response = await apiClient.get("/diary");
  return response.data;
};
