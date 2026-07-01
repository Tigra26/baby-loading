import type { Metadata } from "next";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import { getDiaryList } from "@/lib/api/serverApi";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Щоденник",
  description:
    "Переглядайте особисті записи, емоції та важливі моменти під час вагітності.",
  openGraph: {
    title: "Щоденник",
    description:
      "Переглядайте особисті записи, емоції та важливі моменти під час вагітності.",
    url: "/diary",
    images: ["/images/og-image.png"],
  },
  twitter: {
    title: "Щоденник",
    description:
      "Переглядайте особисті записи, емоції та важливі моменти під час вагітності.",
    images: ["/images/og-image.png"],
  },
};

const DiaryPage = async () => {
  const diary = await getDiaryList();

  return (
    <>
      <GreetingBlock />
      <div className={css.wrapper}>
        <DiaryList diary={diary} />
        <div className={css.empty}>
          <p>Оберіть запис зі списку.</p>
        </div>
      </div>
    </>
  );
};

export default DiaryPage;
