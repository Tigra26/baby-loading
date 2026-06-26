import { getDiaryList } from "@/lib/api/diaryApi.server";

interface DiaryEntryDetailsProps {
  id: string;
}

const DiaryEntryDetails = async ({ id }: DiaryEntryDetailsProps) => {
  const { diaryNotes } = await getDiaryList();

  const note = diaryNotes.find((note) => note._id === id);

  console.log("id:", id);
  console.log("notes:", diaryNotes);

  if (!note) {
    return <p>Запис не знайдено</p>;
  }
  return (
    <>
      <div>
        <h2>{note.title}</h2>
        <p>button add</p>
      </div>
      <div>
        <p>{note.date}</p>
        <p>button delete</p>
      </div>
      <p>{note.description}</p>
      <div>
        {note.emotions.map((emotion) => (
          <p key={emotion._id}>{emotion.title}</p>
        ))}
      </div>
    </>
  );
};

export default DiaryEntryDetails;
