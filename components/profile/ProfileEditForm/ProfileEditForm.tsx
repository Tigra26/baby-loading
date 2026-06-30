"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/userApi";
import { profileSchema } from "@/lib/validation/profileSchemas";
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar";

import css from "./ProfileEditForm.module.css";
import ArrowDownIcon from "@/assets/icons/keyboard_arrow_down.svg";
import { CustomDatePicker } from "@/components/shared/Calendar/CustomDatePicker";

const GENDER_OPTIONS = [
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
  { value: "unknown", label: "Ще не відомо" },
];

export const ProfileEditForm = () => {
  const { user, updateUserFields } = useAuthStore();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
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
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Помилка оновлення профілю"
      );
    },
  });

  const initialValues = useMemo(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
      babyGender: user?.babyGender ?? "",
      dueDate: user?.dueDate ?? "",
    }),

    [user]
  );

  const handleFormSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  if (!user) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
    >
      {({ resetForm }) => (
        <Form className={css.form}>
          <ProfileAvatar profilePhotoUrl={user?.avatarUrl} />
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
                  disabled
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

                      <ArrowDownIcon
                        className={`${css.arrowIcon} ${isSelectOpen ? css.active : ""}`}
                      />
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
            <Field name="dueDate">
              {({ field, form, meta }: FieldProps) => {
                const selectedDate = field.value ? new Date(field.value) : null;

                return (
                  <CustomDatePicker
                    id="dueDate"
                    selected={selectedDate}
                    error={Boolean(meta.error && meta.touched)}
                    placeholderText="16.07.2025"
                    className={css.input}
                    minDate={new Date()}
                    onChange={(date: Date | null) => {
                      form.setFieldValue(
                        "dueDate",
                        date ? date.toISOString().split("T")[0] : ""
                      );
                      form.setFieldTouched("dueDate", true);
                    }}
                  />
                );
              }}
            </Field>
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
