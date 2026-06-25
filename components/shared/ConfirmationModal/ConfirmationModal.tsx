"use client";

import { useEffect } from "react";
import css from "./ConfirmationModal.module.css";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";

type ConfirmationModalProps = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  return (
    <div className={css.backdrop} onClick={onCancel}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити модальне вікно"
        >
          <SvgIcon name="close" size={24} className={css.closeIcon} />
        </button>

        <h2 className={css.title}>{title}</h2>

        <div className={css.buttonsWrapper}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={css.confirmButton}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
