import type { Metadata } from "next";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

import { getDiaryList } from "@/lib/api/serverApi";

import css from "./page.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { diaryNotes } = await getDiaryList();

  const note = diaryNotes.find((note) => note._id === id);

  if (!note) {
    return {
      title: "Запис не знайдено",
      description: "Цей запис щоденника не знайдено.",
    };
  }

  const description =
    note.description.length > 140
      ? `${note.description.slice(0, 140)}...`
      : note.description;

  return {
    title: note.title,
    description,
    openGraph: {
      title: note.title,
      description,
      url: `/diary/${id}`,
      images: ["/images/og-image.png"],
    },
    twitter: {
      title: note.title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

const DiaryNotePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const diary = await getDiaryList();

  return (
    <>
      <div className={css.greeting}>
        <GreetingBlock />
      </div>

      <div className={css.wrapper}>
        <div className={css.list}>
          <DiaryList diary={diary} />
        </div>
        <div className={css.details}>
          {id ? (
            <DiaryEntryDetails id={id} />
          ) : (
            <div className={css.empty}>
              <p>Запис не знайдено.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DiaryNotePage;
