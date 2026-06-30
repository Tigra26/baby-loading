"use client";

import { useState } from "react";
import { DiaryFormValues } from "@/types/diary";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";
import { SvgIcon } from "../../shared/SvgIcon/SvgIcon";
import css from "./EditDiaryButton.module.css";

interface EditDiaryButtonProps {
  noteId: string;
  initialValues: DiaryFormValues;
}

const EditDiaryButton = ({ noteId, initialValues }: EditDiaryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={openModal} aria-label="Редагувати запис">
        <SvgIcon name="edit" size={24} className={css.editIcon} />
      </button>

      {isModalOpen && (
        <AddDiaryEntryModal
          onClose={closeModal}
          noteId={noteId}
          initialValues={initialValues}
        />
      )}
    </>
  );
};

export default EditDiaryButton;
