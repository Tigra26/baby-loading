import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import css from "./Auth.module.css";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

type Props = {
  params: Promise<{ authType: string }>;
};

const authMeta = {
  login: {
    title: "Вхід",
    description:
      "Увійдіть у свій акаунт Лелека, щоб перейти до особистого кабінету.",
  },
  register: {
    title: "Реєстрація",
    description: "Створіть акаунт у застосунку Лелека для майбутніх мам.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { authType } = await params;

  if (!(authType in authMeta)) {
    return {
      title: "Сторінку не знайдено",
    };
  }

  const meta = authMeta[authType as keyof typeof authMeta];

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

const Page = async ({ params }: Props) => {
  const { authType } = await params;

  const authTypeMap: Record<string, boolean> = {
    login: false,
    register: true,
  };

  if (!(authType in authTypeMap)) {
    notFound();
  }

  return (
    <section>
      <div className={`container ${css.authContainer}`}>
        {authTypeMap[authType] ? (
          <>
            <RegistrationForm />
            <Image
              width={720}
              height={900}
              className={css.authDecorImage}
              src="/images/stork.jpg"
              alt="Фон у вигляді фото лелеки"
              loading="eager"
            />
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
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
