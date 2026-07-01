"use client";

import { useRouter } from "next/navigation";
import css from "./DeleteDiaryModal.module.css";
import Modal from "@/components/shared/Modal/Modal";
import { deleteDiaryNote } from "@/lib/api/clientApi";
import { toast } from "react-toastify";

interface DeleteDiaryModalProps {
  onClose: () => void;
  noteId: string;
}

const DeleteDiaryModal = ({ onClose, noteId }: DeleteDiaryModalProps) => {
  const router = useRouter();

  const deleteNote = async () => {
    await deleteDiaryNote(noteId);
    onClose();
    toast.success("Нотатку видалено");
    router.back();
    router.refresh();
  };
  return (
    <>
      <Modal onClose={onClose}>
        <div className={css.modal}>
          <h2 className={css.modalTitle}>Ви точно хочете видалити?</h2>
          <div className={css.btnBlock}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Ні
            </button>
            <button type="button" className={css.agreeBtn} onClick={deleteNote}>
              Так
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DeleteDiaryModal;
