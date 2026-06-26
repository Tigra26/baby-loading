"use client";

import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/userApi";
import { profileSchema } from "@/lib/validation/profileSchemas";
import css from "./ProfileEditForm.module.css";
import ArrowDownIcon from "@/assets/icons/keyboard_arrow_down.svg";
import ArrowUpIcon from "@/assets/icons/keyboard_arrow_up.svg";

const GENDER_OPTIONS = [
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
  { value: "unknown", label: "Ще не відомо" },
];

export const ProfileEditForm = () => {
  const { user, updateUserFields } = useAuthStore();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [dateInputType, setDateInputType] = useState("text");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      updateUserFields(updatedUser);
      toast.success("Профіль успішно оновлено!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    babyGender: user?.babyGender || "",
    dueDate: user?.dueDate || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={mutate}
      enableReinitialize={true}
    >
      {({ resetForm }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label htmlFor="name" className={css.fieldLabel}>
              Ім`я
            </label>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Ганна"
                  className={`${css.input} ${meta.error && meta.touched ? css.inputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="name"
              className={css.errorMessage}
              component="span"
            />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor="email" className={css.fieldLabel}>
              Пошта
            </label>
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="hanna@gmail.com"
                  className={`${css.input} ${meta.error && meta.touched ? css.inputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              className={css.errorMessage}
              component="span"
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.fieldLabel}>Стать дитини</label>
            <Field name="babyGender">
              {({ field, form, meta }: FieldProps) => {
                const currentOption = GENDER_OPTIONS.find(
                  (opt) => opt.value === field.value
                );

                return (
                  <div className={css.customSelectContainer} ref={selectRef}>
                    <div
                      className={`${css.selectTrigger} ${isSelectOpen ? css.selectTriggerOpen : ""} ${
                        !field.value ? css.placeholderColor : ""
                      } ${meta.error && meta.touched ? css.inputError : ""}`}
                      onClick={() =>
                        !isPending && setIsSelectOpen(!isSelectOpen)
                      }
                    >
                      <span>
                        {currentOption ? currentOption.label : "Оберіть стать"}
                      </span>
                      {/* Рендеримо іконку вгору або вниз залежно від стану сторінки */}
                      {isSelectOpen ? (
                        <ArrowUpIcon className={css.arrowIcon} />
                      ) : (
                        <ArrowDownIcon className={css.arrowIcon} />
                      )}
                    </div>

                    {isSelectOpen && (
                      <ul className={css.dropdownMenu}>
                        {GENDER_OPTIONS.map((option) => (
                          <li
                            key={option.value}
                            className={`${css.dropdownItem} ${field.value === option.value ? css.dropdownItemActive : ""}`}
                            onClick={() => {
                              form.setFieldValue("babyGender", option.value);
                              form.setFieldTouched("babyGender", true);
                              setIsSelectOpen(false);
                            }}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }}
            </Field>
            <ErrorMessage
              name="babyGender"
              className={css.errorMessage}
              component="span"
            />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor="dueDate" className={css.fieldLabel}>
              Планова дата пологів
            </label>
            <div className={css.selectWrapper}>
              <Field name="dueDate">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    id="dueDate"
                    type={dateInputType}
                    placeholder="16.07.2025"
                    onFocus={() => setDateInputType("date")}
                    onBlur={() => !field.value && setDateInputType("text")}
                    className={`${css.input} ${css.dateInput} ${!field.value ? css.placeholderColor : ""} ${
                      meta.error && meta.touched ? css.inputError : ""
                    }`}
                  />
                )}
              </Field>

              <ArrowDownIcon className={css.selectIcon} />
            </div>
            <ErrorMessage
              name="dueDate"
              className={css.errorMessage}
              component="span"
            />
          </div>

          <div className={css.btnGroup}>
            <button
              type="button"
              className={css.cancelBtn}
              onClick={() => resetForm()}
              disabled={isPending}
            >
              Відмінити зміни
            </button>
            <button type="submit" className={css.saveBtn} disabled={isPending}>
              {isPending ? "Збереження..." : "Зберегти зміни"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
