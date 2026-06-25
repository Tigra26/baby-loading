import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import { getDiaryList } from "@/lib/api/diaryApi";

const Diary = async () => {
  const diary = await getDiaryList();
  return;
  <>
    <GreetingBlock />
  </>;
};
