import { login } from "@/lib/api/authApi";
import css from "./LoginForm.module.css";
import { loginSchema } from "@/schema/authSchema";
import { LoginProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
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
                  type="text"
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
            Зареєструватись
          </button>
        </Form>
      </Formik>
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
