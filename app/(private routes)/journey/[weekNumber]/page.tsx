"use client";

import { notFound, useParams } from "next/navigation";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
import { TOTAL_PREGNANCY_WEEKS } from "@/lib/utils/pregnancy";
import css from "./JourneyPage.module.css";

const JourneyWeekPage = () => {
  const params = useParams();
  const weekNumber = Number(params.weekNumber);

  const isValidWeek =
    Number.isInteger(weekNumber) &&
    weekNumber >= 1 &&
    weekNumber <= TOTAL_PREGNANCY_WEEKS;

  if (!isValidWeek) {
    notFound();
  }

  return (
    <div className={css.page}>
      <GreetingBlock />
      <WeekSelector selectedWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default JourneyWeekPage;
