"use client";
import { login } from "@/lib/api/authApi";
import css from "./LoginForm.module.css";
import { LoginProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginSchema } from "@/lib/validation/authSchemas";
import { useAuthStore } from "@/lib/store/authStore";
import { isAxiosError } from "axios";
import { MoonLoader } from "react-spinners";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      router.replace("/");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          setIsAuthError(true);
          return;
        }
      }
      toast.error("Лелека не знає що це за помилка, спробуйте ще раз");
    },
  });

  const handleLogin = (values: LoginProps) => {
    mutate(values);
  };
  return (
    <div className={css.loginPage}>
      <h1 className={css.loginPageTitle}>Вхід</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form className={css.loginForm}>
          <div className={css.fieldWrapper}>
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="email"
                  placeholder="hello@leleka.com"
                  className={`${css.loginFormsInput} ${meta.error && meta.touched ? css.loginFormsInputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              className={css.errorMessage}
              component={"span"}
            />
          </div>
          <div className={css.fieldWrapper}>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Пароль"
                  className={`${css.loginFormsInput} ${meta.error && meta.touched ? css.loginFormsInputError : ""}`}
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              className={css.errorMessage}
              component={"span"}
            />
          </div>
          <button type="submit" className={css.loginFormsButton}>
            {isPending ? <MoonLoader size={15} /> : "Увійти"}
          </button>
        </Form>
      </Formik>
      {isAuthError && (
        <p className={css.authErrorAuth}>Невірний логін або пароль</p>
      )}
      <div className={css.authRedirect}>
        <p>Немає аккаунту?</p>
        <Link href="/auth/register" className={css.redirectLink}>
          Зареєструватися
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
