import { DiaryFormValues, EmotionsProps, Note } from "@/types/diary";
import { apiClient } from "./client";

export const getEmotions = async (): Promise<EmotionsProps> => {
  const response = await apiClient.get<EmotionsProps>("/emotions");
  return response.data;
};

export const createDiaryNote = async (
  values: DiaryFormValues
): Promise<Note> => {
  const response = await apiClient.post<Note>("/diary", values);
  return response.data;
};
