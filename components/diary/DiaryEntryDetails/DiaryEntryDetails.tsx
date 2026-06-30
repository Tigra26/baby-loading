import { getDiaryList } from "@/lib/api/diaryApi.server";
import css from "./DiaryEntryDetails.module.css";
import { DiaryFormValues } from "@/types/diary";
import EditDiaryButton from "../EditDiaryButton/EditDiaryButton";
import DeleteDiaryButton from "../DeleteDiaryButton/DeleteDiaryButton";

interface DiaryEntryDetailsProps {
  id: string;
}

const DiaryEntryDetails = async ({ id }: DiaryEntryDetailsProps) => {
  const { diaryNotes } = await getDiaryList();

  const note = diaryNotes.find((note) => note._id === id);

  if (!note) {
    return <p>Запис не знайдено</p>;
  }
  const initialValues: DiaryFormValues = {
    title: note.title,
    description: note.description,
    emotions: note.emotions.map((emotion) => emotion._id),
  };
  const formatDate = (date: string) => {
    const d = new Date(date);

    const day = d.getDate();
    const month = new Intl.DateTimeFormat("uk-UA", {
      month: "long",
    }).format(d);
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div className={css.card}>
      <div className={css.headerBlock}>
        <div className={css.titleBlock}>
          <h2 className={css.title}>{note.title}</h2>
          <EditDiaryButton noteId={note._id} initialValues={initialValues} />
        </div>
        <div className={css.dateBlock}>
          <p className={css.date}>{formatDate(note.date)}</p>
          <DeleteDiaryButton noteId={note._id} />
        </div>
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
