"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getWeeksGreeting,
  getWeeksGreetingPublic,
} from "@/lib/api/dashboardApi";
import { useAuthStore } from "@/lib/store/authStore";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";

const DashboardClient = () => {
  const user = useAuthStore((state) => state.user);

  const personalQuery = useQuery({
    queryKey: ["weeksGreeting"],
    queryFn: getWeeksGreeting,
    enabled: !!user,
  });

  const publicQuery = useQuery({
    queryKey: ["weeksGreetingPublic"],
    queryFn: getWeeksGreetingPublic,
    enabled: !user,
  });

  const activeQuery = user ? personalQuery : publicQuery;
  const weeksGreeting = activeQuery.data;
  const isError = activeQuery.isError;
  const isLoading = activeQuery.isLoading;

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

export default DashboardClient;