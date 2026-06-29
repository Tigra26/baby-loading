import Modal from "@/components/shared/Modal/Modal";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";
import { DiaryFormValues } from "@/types/diary";

interface AddDiaryEntryModalProps {
  initialValues?: DiaryFormValues;
  noteId?: string;
  onClose: () => void;
}

const AddDiaryEntryModal = ({
  initialValues,
  noteId,
  onClose,
}: AddDiaryEntryModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.modal}>
        <h2 className={css.modalTitle}>
          {noteId ? "Редагувати запис" : "Новий запис"}
        </h2>
        <AddDiaryEntryForm
          initialValues={initialValues}
          noteId={noteId}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};
export default AddDiaryEntryModal;
