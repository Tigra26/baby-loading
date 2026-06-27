import { DiaryProps } from "@/types/diary";
import { apiClient } from "./client";
import { cookies } from "next/headers";

export const getDiaryList = async (): Promise<DiaryProps> => {
  const cookieStore = await cookies();
  const response = await apiClient.get<DiaryProps>("/diary", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
