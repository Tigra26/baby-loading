import { createPortal } from "react-dom";

import css from "./Modal.module.css";
import useModalHook from "@/hooks/useModalHook";
import { SvgIcon } from "../SvgIcon/SvgIcon";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const { backdropProps } = useModalHook({ onClose });

  return createPortal(
    <div className={css.backdrop} {...backdropProps}>
      <div className={css.modal}>
        <button
          className={css.modalCloseButton}
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <SvgIcon name="close" aria-label="Close modal" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
