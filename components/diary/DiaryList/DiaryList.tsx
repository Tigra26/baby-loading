"use client";

import { DiaryProps } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface DiaryListProps {
  diary: DiaryProps;
}

const DiaryList = ({ diary }: DiaryListProps) => {
  console.log(diary);
  return (
    <>
      <div>
        <h2>Ваші записи</h2>
        <div>
          <p>Новий запис</p>
          <button type="submit">+</button>
        </div>
        <ul>
          {diary.diaryNotes.map((note) => (
            <li key={note._id}>
              <DiaryEntryCard note={note} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DiaryList;
