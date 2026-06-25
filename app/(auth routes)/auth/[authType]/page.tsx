"use client";
import { notFound, useParams } from "next/navigation";
import css from "./Auth.module.css";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

const Page = () => {
  const { authType } = useParams();
  const slug = authType as string;

  const authTypeMap: Record<string, boolean> = {
    login: false,
    register: true,
  };

  if (!(slug in authTypeMap)) {
    notFound();
  }
  return (
    <section>
      <div className={`container ` + css.authContainer}>
        {authTypeMap[slug] ? <RegistrationForm /> : <LoginForm />}
      </div>
    </section>
  );
};

export default Page;
