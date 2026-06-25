"use client";

import css from "./AddDiaryEntryModal.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";

const AddDiaryEntryModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [closeModal]);

    return createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={css.modal}>{isModalOpen && <AddDiaryEntryForm />}</div>
      </div>,
      document.body
    );
  }
};
export default AddDiaryEntryModal;
