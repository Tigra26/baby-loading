"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile, uploadImage } from "@/lib/api/userApi";
import { CustomDatePicker } from "@/components/shared/Calendar/CustomDatePicker";

import ArrowDownIcon from "@/assets/icons/keyboard_arrow_down.svg";
import ArrowUpIcon from "@/assets/icons/keyboard_arrow_up.svg";
import AvatarIcon from "@/assets/icons/avatar_icon.svg";

import css from "./OnboardingForm.module.css";

const GENDER_OPTIONS = [
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
  { value: "unknown", label: "Ще не знаю" },
];

type OnboardingFormValues = {
  babyGender: string;
  dueDate: string;
};

type OnboardingFormErrors = Partial<Record<keyof OnboardingFormValues, string>>;

const validateOnboardingForm = (
  values: OnboardingFormValues
): OnboardingFormErrors => {
  const errors: OnboardingFormErrors = {};

  if (!values.babyGender) {
    errors.babyGender = "Оберіть стать дитини";
  }

  if (values.dueDate) {
    const selectedDate = new Date(values.dueDate);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.dueDate = "Дата пологів не може бути в минулому";
    }
  }

  return errors;
};

export const OnboardingForm = () => {
  const router = useRouter();
  const { user, updateUserFields } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [localPreview, setLocalPreview] = useState("");
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const initialValues: OnboardingFormValues = {
    babyGender: user?.babyGender || "",
    dueDate: user?.dueDate || "",
  };

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      updateUserFields(updatedUser);
      toast.success("Дані успішно збережено!");
      router.push("/");
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      toast.error(
        err.response?.data?.message || err.message || "Помилка збереження даних"
      );
    },
  });

  const handleSubmit = (values: OnboardingFormValues) => {
    mutate(values);
  };

  const handleUploadButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Можна завантажувати лише зображення");
      e.target.value = "";
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Файл занадто великий. Максимальний розмір — 1 МБ");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setLocalPreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    try {
      setIsUploading(true);

      const updatedUser = await uploadImage(file);

      updateUserFields(updatedUser);

      if (updatedUser.avatarUrl) {
        setUploadedAvatarUrl(updatedUser.avatarUrl);
      }

      toast.success("Фото успішно завантажено!");
      setLocalPreview("");
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Не вдалося завантажити фото"
      );

      setLocalPreview("");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const avatarSrc = localPreview || uploadedAvatarUrl;

  return (
    <section className={css.card}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>
      <div className={css.avatarBlock}>
        <button
          type="button"
          className={css.avatarWrapper}
          onClick={handleUploadButtonClick}
          disabled={isUploading}
          aria-label="Завантажити фото"
        >
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={user?.name || "Фото користувача"}
              fill
              className={css.avatarImage}
              unoptimized
            />
          ) : (
            <AvatarIcon className={css.avatarIcon} aria-hidden="true" />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={css.hiddenInput}
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <button
          type="button"
          className={css.uploadButton}
          onClick={handleUploadButtonClick}
          disabled={isUploading}
        >
          {isUploading ? "Завантаження..." : "Завантажити фото"}
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validateOnboardingForm}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.fieldsBlock}>
            <div className={css.fieldWrapper}>
              <label className={css.label}>Стать дитини</label>

              <Field name="babyGender">
                {({ field, form, meta }: FieldProps) => {
                  const currentOption = GENDER_OPTIONS.find(
                    (option) => option.value === field.value
                  );

                  return (
                    <div className={css.customSelectContainer} ref={selectRef}>
                      <button
                        type="button"
                        className={`${css.selectTrigger} ${
                          isSelectOpen ? css.selectTriggerOpen : ""
                        } ${!field.value ? css.placeholderColor : ""} ${
                          meta.error && meta.touched ? css.inputError : ""
                        }`}
                        onClick={() =>
                          !isPending && setIsSelectOpen((prev) => !prev)
                        }
                        disabled={isPending}
                      >
                        <span>
                          {currentOption
                            ? currentOption.label
                            : "Оберіть стать"}
                        </span>

                        {isSelectOpen ? (
                          <ArrowUpIcon
                            className={css.arrowIcon}
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowDownIcon
                            className={css.arrowIcon}
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {isSelectOpen && (
                        <ul className={css.dropdownMenu}>
                          {GENDER_OPTIONS.map((option) => (
                            <li
                              key={option.value}
                              className={`${css.dropdownItem} ${
                                field.value === option.value
                                  ? css.dropdownItemActive
                                  : ""
                              }`}
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
                component="span"
                className={css.errorMessage}
              />
            </div>

            <div className={css.fieldWrapper}>
              <label htmlFor="dueDate" className={css.label}>
                Планова дата пологів
              </label>

              <Field name="dueDate">
                {({ field, form, meta }: FieldProps) => {
                  const selectedDate = field.value
                    ? new Date(field.value)
                    : null;

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
                          date ? format(date, "yyyy-MM-dd") : ""
                        );
                        form.setFieldTouched("dueDate", true);
                      }}
                    />
                  );
                }}
              </Field>

              <ErrorMessage
                name="dueDate"
                component="span"
                className={css.errorMessage}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending || isUploading}
            >
              {isPending ? "Збереження..." : "Зберегти"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
