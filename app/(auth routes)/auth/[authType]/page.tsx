"use client";
import { notFound, useParams } from "next/navigation";
import css from "./Auth.module.css";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Image from "next/image";

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
        {authTypeMap[slug] ? (
          <>
            <RegistrationForm />
            <Image
              width={720}
              height={900}
              className={css.authDecorImage}
              src="/images/stork.jpg"
              alt="Фон у вигляді фото лелеки"
              loading="eager"
            ></Image>
          </>
        ) : (
          <>
            <LoginForm />
            <Image
              width={720}
              height={900}
              className={css.authDecorImage}
              src="/images/eggs.jpg"
              alt="Фон у вигляді фото лелеки"
              loading="eager"
            ></Image>
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
