import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import { getDiaryList } from "@/lib/api/diaryApi.server";
import css from "./page.module.css";

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
