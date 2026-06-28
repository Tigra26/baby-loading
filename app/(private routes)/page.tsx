import DashboardClient from "./DashboardClient";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Головна сторінка",
  description: "Лелека - головна сторінка",

  openGraph: {
    title: "Лелека - головна сторінка",
    description: "Лелека - головна сторінка",
    url: "https://baby-loading-nine.vercel.app/",
    siteName: "Лелека",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Лелека — персональний помічник для майбутніх мам",
      },
    ],
  },

  twitter: {
    title: "Лелека - головна сторінка",
    description: "Лелека - головна сторінка",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Лелека — персональний помічник для майбутніх мам",
      },
    ],
  },
};

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col pl-5 pr-5 ">
        <GreetingBlock />

        <div className="flex flex-col gap-8 min-[1440px]:flex-row">
          <DashboardClient />

          <div className="flex flex-col gap-8">
            <TaskReminderCard />

            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
