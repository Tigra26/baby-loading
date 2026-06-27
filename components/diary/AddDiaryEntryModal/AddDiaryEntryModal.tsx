import Modal from "@/components/shared/Modal/Modal";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";

interface AddDiaryEntryModalProps {
  onClose: () => void;
}

const AddDiaryEntryModal = ({ onClose }: AddDiaryEntryModalProps) => {
  return (
    <div className={css.modal}>
      <Modal onClose={onClose}>
        <h2 className={css.modalTitle}>Новий запис</h2>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          X
        </button>
        <AddDiaryEntryForm onClose={onClose} />
      </Modal>
    </div>
  );
};
export default AddDiaryEntryModal;
