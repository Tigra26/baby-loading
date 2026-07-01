"use client";

import { useState } from "react";
import DeleteDiaryModal from "../DeleteDiaryModal/DeleteDiaryModal";
import { SvgIcon } from "../../shared/SvgIcon/SvgIcon";
import css from "./DeleteDiaryButton.module.css";

interface DeleteDiaryButtonProps {
  noteId: string;
}

const DeleteDiaryButton = ({ noteId }: DeleteDiaryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={openModal} aria-label="Видалити запис">
        <SvgIcon name="delete" size={24} className={css.deleteIcon} />
      </button>

      {isModalOpen && <DeleteDiaryModal onClose={closeModal} noteId={noteId} />}
    </>
  );
};

export default DeleteDiaryButton;
