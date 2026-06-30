import {
  DeleteDiaryResponse,
  DiaryFormValues,
  EmotionsProps,
  Note,
} from "@/types/diary";
import { apiClient } from "./client";

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
