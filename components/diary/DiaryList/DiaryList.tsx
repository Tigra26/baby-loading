"use client";

import css from "./DiaryList.module.css";
import { DiaryProps } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";
import { useState } from "react";
import { SvgIcon } from "../../shared/SvgIcon/SvgIcon";

interface DiaryListProps {
  diary: DiaryProps;
}

const DiaryList = ({ diary }: DiaryListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={css.diary}>
        <div className={css.diaryHeader}>
          <h2 className={css.diaryTitle}>Ваші записи</h2>
          <div className={css.diaryCreate}>
            <p className={css.diaryCreateText}>Новий запис</p>
            <button
              type="button"
              className={css.diaryCreateBtn}
              onClick={openModal}
              aria-label="Додати новий запис"
            >
              <SvgIcon
                name="add_circle_icon"
                size={24}
                className={css.addIcon}
              />
            </button>
          </div>
        </div>
        {diary.diaryNotes.length === 0 ? (
          <p className={css.diaryEmptyMessage}>
            Наразі записи у щоденнику відсутні
          </p>
        ) : (
          <ul className={css.diaryList}>
            {diary.diaryNotes.map((note) => (
              <li key={note._id}>
                <DiaryEntryCard note={note} />
              </li>
            ))}
          </ul>
        )}
        {isModalOpen && <AddDiaryEntryModal onClose={closeModal} />}
      </div>
    </>
  );
};

export default DiaryList;
