import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import { getDiaryList } from "@/lib/api/diaryApi";
import css from "./Diary.module.css";

const Diary = async () => {
  const diary = await getDiaryList();

  return (
    <>
      <GreetingBlock />
      <DiaryList diary={diary} />
    </>
  );
};

export default Diary;
