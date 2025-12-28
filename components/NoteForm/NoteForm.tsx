"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNoteData } from "../../lib/api/api";
// import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "../../lib/store/noteStore";

interface NoteFormProps {
  onClose: () => void;
  // onPageChange: (page: number) => void;
}

// const initialValues: CreateNoteData = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter(); // Залишаємо для редиректу після успіху
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
    },
  });

  // const handleSubmit = (values: CreateNoteData, actions: any) => {
  //   mutate(values);
  //   actions.resetForm();
  // };
  const handleSubmit = (formData: FormData) => {
    // Отримуємо кожне поле окремо
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as CreateNoteData["tag"]; // вариант записи

    //  об'єкт для відправки
    const newNote: CreateNoteData = {
      title,
      content,
      tag,
    };

    mutate(newNote);
  };

  const fieldId = useId();

  // const validationSchema = Yup.object().shape({
  //   title: Yup.string()
  //     .min(3, "Title too short")
  //     .max(50, "Title too long")
  //     .required("Title is required"),
  //   content: Yup.string().max(500, "Content too long"),
  //   tag: Yup.string()
  //     .oneOf(["Shopping", "Meeting", "Personal", "Work", "Todo"], "Invalid tag")
  //     .required("Tag is required"),
  // });

  return (
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={validationSchema}
    //   onSubmit={handleSubmit}
    // >
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          type="text"
          required // Аналог .required() у Yup
          minLength={3} // Аналог .min(3) у Yup
          maxLength={50} // Аналог .max(50) у Yup
          className={css.input}
        />
        {/* <ErrorMessage name="title" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          // as="textarea"
          id={`${fieldId}-content`}
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
        />
        {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          // as="select"
          required // Аналог .required() у Yup
          id={`${fieldId}-tag`}
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" disabled={isPending} className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
    // </Formik>
  );
};

export default NoteForm;
// використовувати не Formik, а стандартні HTML-форми з formAction, щоб надалі зручно інтегрувати збереження чернетки через Zustand не створюючи зайву і складну логіку.
