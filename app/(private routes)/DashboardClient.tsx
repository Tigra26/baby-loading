"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksGreeting } from "@/lib/api/dashboardApi";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";

export default function DashboardClient() {
  const {
    data: weeksGreeting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weeksGreeting"],
    queryFn: getWeeksGreeting,
  });

  return (
    <>
      <GreetingBlock />

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Не вдалося завантажити дані</p>}

      {weeksGreeting && (
        <>
          <StatusBlock
            curWeekToPregnant={weeksGreeting.curWeekToPregnant}
            daysBeforePregnant={weeksGreeting.daysBeforePregnant}
          />
          <BabyTodayCard babyToday={weeksGreeting.babyToday} />
          <MomTipCard momHint={weeksGreeting.momHint} />
        </>
      )}
    </>
  );
}
