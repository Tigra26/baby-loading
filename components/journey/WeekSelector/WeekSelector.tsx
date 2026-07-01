"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { getGreeting } from "@/lib/api/clientApi";
import { PREGNANCY_WEEKS, getCurrentWeek } from "@/lib/utils/pregnancy";
import css from "./WeekSelector.module.css";

type Props = { selectedWeek: number };

const WeekSelector = ({ selectedWeek }: Props) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "baby";
  const dueDate = useAuthStore((state) => state.user?.dueDate);
  const { data: greeting } = useQuery({
    queryKey: ["greeting"],
    queryFn: getGreeting,
  });
  const currentWeek =
    greeting?.curWeekToPregnant ?? (dueDate ? getCurrentWeek(dueDate) : 0);
  const hasCurrentWeek = currentWeek > 0;

  return (
    <ul className={css.list}>
      {PREGNANCY_WEEKS.map((week) => {
        const isActive = week === selectedWeek;
        const isDisabled = hasCurrentWeek && week > currentWeek;

        if (isDisabled) {
          return (
            <li key={week}>
              <div className={`${css.cell} ${css.cellDisabled}`}>
                <span className={css.number}>{week}</span>
                <span className={css.label}>Тиждень</span>
              </div>
            </li>
          );
        }

        return (
          <li key={week}>
            <Link
              href={`/journey/${week}?tab=${currentTab}`}
              className={`${css.cell}${isActive ? ` ${css.cellActive}` : ""}`}
            >
              <span className={css.number}>{week}</span>
              <span className={css.label}>Тиждень</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WeekSelector;
