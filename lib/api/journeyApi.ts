import { WeekBaby, WeekGreeting, WeekMom } from "@/types/journey";
import { apiClient } from "./client";

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
