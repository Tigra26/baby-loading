import { WeeksGreeting } from "@/types/dashboard";
import { apiClient } from "./client";

export const getWeeksGreeting = async (): Promise<WeeksGreeting> => {
  const { data } = await apiClient.get<WeeksGreeting>("/weeks/greeting");

  return data;
};

export const getWeeksGreetingPublic = async (): Promise<WeeksGreeting> => {
  const { data } = await apiClient.get<WeeksGreeting>("/weeks/greeting/public");

  return data;
};
