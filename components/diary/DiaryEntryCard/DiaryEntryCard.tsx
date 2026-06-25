import { Note } from "@/types/diary";
import Link from "next/link";

interface DiaryEntryCardProps {
  note: Note;
}

const DiaryEntryCard = ({ note }: DiaryEntryCardProps) => {
  return (
    <>
      <Link href={`/books/${note._id}`}>
        <div>
          <h3>{note.title}</h3>
          <p>{note.date}</p>
        </div>

        <div>
          {note.emotions.map((emotion) => (
            <p key={emotion._id}>{emotion.title}</p>
          ))}
        </div>
      </Link>
    </>
  );
};

export default DiaryEntryCard;
