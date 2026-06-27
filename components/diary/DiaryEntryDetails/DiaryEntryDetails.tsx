import { getDiaryList } from "@/lib/api/diaryApi.server";
import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  id: string;
}

const DiaryEntryDetails = async ({ id }: DiaryEntryDetailsProps) => {
  const { diaryNotes } = await getDiaryList();

  const note = diaryNotes.find((note) => note._id === id);

  if (!note) {
    return <p>Запис не знайдено</p>;
  }
  return (
    <div className={css.card}>
      <div className={css.titleBlock}>
        <h2 className={css.title}>{note.title}</h2>
        <p>++</p>
      </div>
      <div className={css.dateBlock}>
        <p className={css.date}>{note.date}</p>
        <p>--</p>
      </div>
      <p className={css.description}>{note.description}</p>
      <div className={css.emotionsBlock}>
        {note.emotions.map((emotion) => (
          <p className={css.emotion} key={emotion._id}>
            {emotion.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntryDetails;
