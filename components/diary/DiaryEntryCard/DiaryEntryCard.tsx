import { Note } from "@/types/diary";
import Link from "next/link";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  note: Note;
}

const DiaryEntryCard = ({ note }: DiaryEntryCardProps) => {
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
    <>
      <Link href={`/diary/${note._id}`}>
        <div className={css.card}>
          <div className={css.main}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.date}>{formatDate(note.date)}</p>
          </div>

          <div className={css.emotionalBlock}>
            {note.emotions.map((emotion) => (
              <p className={css.emotional} key={emotion._id}>
                {emotion.title}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default DiaryEntryCard;
