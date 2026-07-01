import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
import { TOTAL_PREGNANCY_WEEKS } from "@/lib/utils/pregnancy";
import css from "./JourneyPage.module.css";

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { weekNumber: rawWeek } = await params;
  const weekNumber = Number(rawWeek);

  const isValidWeek =
    Number.isInteger(weekNumber) &&
    weekNumber >= 1 &&
    weekNumber <= TOTAL_PREGNANCY_WEEKS;

  if (!isValidWeek) {
    return {
      title: "Тиждень не знайдено",
      description: "Інформацію про цей тиждень вагітності не знайдено.",
    };
  }

  const title = `${weekNumber} тиждень вагітності`;
  const description = `Дізнайтесь корисну інформацію, поради та деталі розвитку дитини на ${weekNumber} тижні вагітності.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/journey/${weekNumber}`,
      images: ["/images/og-image.png"],
    },
    twitter: {
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

const JourneyWeekPage = async ({ params }: Props) => {
  const { weekNumber: rawWeek } = await params;
  const weekNumber = Number(rawWeek);

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
