import { IconName } from "@/components/shared/SvgIcon/SvgIcon";

export const getComfortIcon = (category: string): IconName => {
  if (category.startsWith("Активність")) return "fitness";
  if (category.startsWith("Відпочинок")) return "chair";
  return "food";
};
