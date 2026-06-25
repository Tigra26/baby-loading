"use client";

import { getDiaryList } from "@/lib/api/diaryApi";

interface DiaryEntryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const DiaryEntryDetails = async ({ params }: DiaryEntryDetailsProps) => {
  const { id } = await params;
  const { diaryNotes } = await getDiaryList();

  const note = diaryNotes.find((note) => note._id === id);

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
