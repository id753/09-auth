// C: \Users\Admin\Desktop\project_new\homework\07 - routing - nextjs\components\Modal\Modal.tsx

import { createPortal } from "react-dom";
// import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import React, { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  // onPageChange: (page: number) => void;
  children: React.ReactNode;
}
const Modal = ({ onClose, children }: ModalProps) => {
  // console.log("k");
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden"; //Заборона прокрутки фону
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = ""; //Заборона прокрутки фону -
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      onClick={handleBackDropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {/* <NoteForm onClose={onClose} onPageChange={onPageChange} /> */}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
