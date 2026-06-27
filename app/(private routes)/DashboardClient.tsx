"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksGreeting } from "@/lib/api/dashboardApi";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";

export default function DashboardClient() {
  const { data: weeksGreeting } = useQuery({
    queryKey: ["weeksGreeting"],
    queryFn: getWeeksGreeting,
  });

  return (
    <div className="flex flex-col justify-between">
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
    </div>
  );
}
