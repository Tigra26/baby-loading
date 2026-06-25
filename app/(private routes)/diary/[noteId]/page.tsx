import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

interface DiaryNotePage {
  id: Promise<{ id: string }>;
}

const DiaryNotePage = async ({ id }: DiaryNotePage) => {
  return (
    <>
      <DiaryEntryDetails params={id} />;
    </>
  );
};

export default DiaryNotePage;
