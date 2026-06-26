import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

interface DiaryNotePage {
  params: Promise<{
    id: string;
  }>;
}

const DiaryNotePage = async ({ params }: DiaryNotePage) => {
  const { id } = await params;

  return (
    <>
      <DiaryEntryDetails id={id} />;
    </>
  );
};

export default DiaryNotePage;
