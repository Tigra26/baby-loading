import css from "./RegistrationForm.module.css";
import { registerSchema } from "@/schema/registerSchema";
import { RegisterProps } from "@/types/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const handleRegister = (values: RegisterProps) => {
    console.log(values);
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
            <Field
              name="name"
              as="input"
              type="text"
              className={css.registrationFormsInput}
              placeholder="Ваше ім'я"
            />
            <ErrorMessage name="name" />
          </label>
          <label className={css.registrationFormsLabel}>
            <span>Email*</span>
            <Field
              name="email"
              as="input"
              type="email"
              className={css.registrationFormsInput}
              placeholder="hello@leleka.com"
            />
            <ErrorMessage name="email" />
          </label>
          <label className={css.registrationFormsLabel}>
            <span>Пароль*</span>
            <Field
              name="password"
              as="input"
              type="password"
              className={css.registrationFormsInput}
              placeholder="********"
            />
            <ErrorMessage name="password" />
          </label>

          <button type="submit" className={css.registrationFormsButton}>
            Зареєструватись
          </button>
        </Form>
      </Formik>
      <div className={css.authRedirect}>
        <p>Вже маєте аккаунт?</p>
        <Link href="./auth/login">Увійти</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
