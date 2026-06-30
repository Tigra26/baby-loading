export const TOTAL_PREGNANCY_WEEKS = 40;

export const PREGNANCY_WEEKS: number[] = Array.from(
  { length: TOTAL_PREGNANCY_WEEKS },
  (_, index) => index + 1
);

export function getCurrentWeek(dueDate: string): number {
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksUntilDue =
    (new Date(dueDate).getTime() - Date.now()) / millisecondsPerWeek;
  const currentWeek = Math.round(TOTAL_PREGNANCY_WEEKS - weeksUntilDue);

  return Math.min(Math.max(currentWeek, 1), TOTAL_PREGNANCY_WEEKS);
}
