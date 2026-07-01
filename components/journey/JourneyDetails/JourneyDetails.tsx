"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getWeekBaby, getWeekMom } from "@/lib/api/clientApi";
import { WeekBaby, WeekMom, isWeekBaby } from "@/types/journey";
import Loader from "@/components/shared/Loader/Loader";
import JourneyTabs from "./JourneyTabs/JourneyTabs";
import BabyTab from "./BabyTab/BabyTab";
import MomTab from "./MomTab/MomTab";
import css from "./JourneyDetails.module.css";

type Props = {
  weekNumber: number;
};

type JourneyTab = "baby" | "mom";

const JourneyDetails = ({ weekNumber }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab: JourneyTab = searchParams.get("tab") === "mom" ? "mom" : "baby";

  const handleTabChange = (nextTab: JourneyTab) => {
    router.replace(`/journey/${weekNumber}?tab=${nextTab}`, {
      scroll: false,
    });
  };

  const { data, isPending, isError } = useQuery<WeekBaby | WeekMom>({
    queryKey: ["week", weekNumber, tab],
    queryFn: () =>
      tab === "baby" ? getWeekBaby(weekNumber) : getWeekMom(weekNumber),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Не вдалося завантажити дані тижня");
    }
  }, [isError]);

  return (
    <div className={css.container}>
      <JourneyTabs activeTab={tab} onChange={handleTabChange} />

      {isPending ? (
        <Loader variant="private" />
      ) : isError ? (
        <p className={css.error}>
          Не вдалося завантажити дані. Спробуйте пізніше.
        </p>
      ) : !data ? null : isWeekBaby(data) ? (
        <BabyTab data={data} />
      ) : (
        <MomTab data={data} />
      )}
    </div>
  );
};

export default JourneyDetails;
