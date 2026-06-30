"use client";

import AddDiaryEntryModal from "@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal";
import { useState } from "react";

import css from "./FeelCheckCard.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

const FeelingCheckCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const handleModalOpen = () => {
    if (user) {
      setIsOpen(true);
    } else {
      router.push("/auth/register");
    }
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

      {isOpen && <AddDiaryEntryModal onClose={handleModalClose} />}
    </div>
  );
};

export default FeelingCheckCard;
