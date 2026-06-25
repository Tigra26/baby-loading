"use client";

import css from "./DiaryList.module.css";
import { DiaryProps } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface DiaryListProps {
  diary: DiaryProps;
}

const DiaryList = ({ diary }: DiaryListProps) => {
  console.log(diary);
  return (
    <>
      <div className={css.diaryList}>
        <div className={css.diaryHeader}>
          <h2 className={css.diaryTitle}>Ваші записи</h2>
          <div className={css.diaryCreate}>
            <p className={css.diaryCreateText}>Новий запис</p>
            <button className={css.diaryCreateBtn} type="submit">
              +
            </button>
          </div>
        </div>
        {diary.diaryNotes.length === 0 ? (
          <p className={css.diaryEmptyMessage}>
            Наразі записи у щоденнику відсутні
          </p>
        ) : (
          <ul>
            {diary.diaryNotes.map((note) => (
              <li key={note._id}>
                <DiaryEntryCard note={note} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DiaryList;
