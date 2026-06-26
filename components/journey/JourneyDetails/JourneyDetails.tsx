"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeekBaby, getWeekMom } from "@/lib/api/journeyApi";
import { WeekBaby, WeekMom } from "@/types/journey";
import Loader from "@/components/shared/Loader/Loader";
import JourneyTabs from "./JourneyTabs/JourneyTabs";
import BabyTab from "./BabyTab/BabyTab";
import MomTab from "./MomTab/MomTab";
import css from "./JourneyDetails.module.css";

type Props = {
  weekNumber: number;
};

const JourneyDetails = ({ weekNumber }: Props) => {
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  const { data, isPending, isError } = useQuery<WeekBaby | WeekMom>({
    queryKey: ["week", weekNumber, tab],
    queryFn: () =>
      tab === "baby" ? getWeekBaby(weekNumber) : getWeekMom(weekNumber),
  });

  return (
    <div className={css.container}>
      <JourneyTabs activeTab={tab} onChange={setTab} />
      {isPending ? (
        <Loader variant="private" />
      ) : isError ? null : tab === "baby" ? (
        <BabyTab data={data as WeekBaby} />
      ) : (
        <MomTab data={data as WeekMom} />
      )}
    </div>
  );
};

export default JourneyDetails;
