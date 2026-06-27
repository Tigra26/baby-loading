"use client";

import AddDiaryEntryModal from "@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./FeelingCheckCard.module.css";

import Modal from "@/components/shared/Modal/Modal";
import { useState } from "react";

const FeelingCheckCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Як ви себе почуваєте?</h2>

      <p className={css.text}>
        Рекомендація на сьогодні:
        <span className={css.textSecond}>
          Занотуйте незвичні відчуття у тілі.
        </span>
      </p>

      <button onClick={handleModalOpen} className={css.button}>
        Зробити запис у щоденник
      </button>

      {isOpen && (
        <Modal onClose={handleModalClose}>
          <AddDiaryEntryModal />
        </Modal>
      )}
    </div>
  );
};

export default FeelingCheckCard;
