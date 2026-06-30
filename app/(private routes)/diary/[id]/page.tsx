import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

import { getDiaryList } from "@/lib/api/diaryApi.server";

import css from "./page.module.css";

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
