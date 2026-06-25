import { login } from "@/lib/api/authApi";
import css from "./LoginForm.module.css";
import { LoginProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthStore from "@/lib/store/authStore";
import { loginSchema } from "@/lib/validation/authSchemas";
import { User } from "@/types/user";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: User) => {
      setUser(data);
      router.replace("/");
    },
    onError: (error) => {
      toast.error(error.message);
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
            Вхід
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
