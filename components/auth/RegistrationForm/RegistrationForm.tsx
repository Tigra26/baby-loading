"use client";
import { register } from "@/lib/api/authApi";
import css from "./RegistrationForm.module.css";
import { RegisterProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerSchema } from "@/lib/validation/authSchemas";
import { isAxiosError } from "axios";
import Loader from "@/components/shared/Loader/Loader";
import { MoonLoader } from "react-spinners";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const [isRegError, setIsRegError] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      router.replace("/profile/edit");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.status === 409) {
          setIsRegError(true);
          return;
        }
      }
      toast.error("Лелека не знає що це за помилка, спробуйте ще раз");
    },
  });
  const handleRegister = (values: RegisterProps) => {
    mutate(values);
  };
  return (
    <div className={css.registrationPage}>
      <h1 className={css.registrationPageTitle}>Реєстрація</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={registerSchema}
      >
        <Form className={css.registrationForm}>
          <label className={css.registrationFormsLabel}>
            <span>Ім`я*</span>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Ім'я"
                  className={`${css.registrationFormsInput} ${meta.error && meta.touched ? css.registrationFormsInputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="name"
              className={css.errorMessage}
              component={"span"}
            />
          </label>
          <label className={css.registrationFormsLabel}>
            <span>Пошта*</span>
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="email"
                  placeholder="hello@leleka.com"
                  className={`${css.registrationFormsInput} ${meta.error && meta.touched ? css.registrationFormsInputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              className={css.errorMessage}
              component={"span"}
            />
          </label>
          <label className={css.registrationFormsLabel}>
            <span>Пароль*</span>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Пароль"
                  className={`${css.registrationFormsInput} ${meta.error && meta.touched ? css.registrationFormsInputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              className={css.errorMessage}
              component={"span"}
            />
          </label>

          <button type="submit" className={css.registrationFormsButton}>
            {isPending ? <MoonLoader size={15} /> : "Зареєструватись"}
          </button>
        </Form>
      </Formik>
      {isRegError && (
        <p className={css.regError}>
          Користувач з такою електроною поштою вже існує
        </p>
      )}
      <div className={css.authRedirect}>
        <p>Вже маєте аккаунт?</p>
        <Link href="/auth/login" className={css.redirectLink}>
          Увійти
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
