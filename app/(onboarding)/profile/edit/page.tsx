import type { Metadata } from "next";
import Image from "next/image";
import { OnboardingForm } from "@/components/auth/OnboardingForm/OnboardingForm";
import Logo from "@/components/shared/Logo/Logo";
import css from "./pageEdit.module.css";

export const metadata: Metadata = {
  title: "Онбординг",
  description:
    "Заповніть базову інформацію профілю, щоб персоналізувати застосунок Лелека.",
  openGraph: {
    title: "Онбординг",
    description:
      "Заповніть базову інформацію профілю, щоб персоналізувати застосунок Лелека.",
    url: "/profile/edit",
    images: ["/images/og-image.png"],
  },
  twitter: {
    title: "Онбординг",
    description:
      "Заповніть базову інформацію профілю, щоб персоналізувати застосунок Лелека.",
    images: ["/images/og-image.png"],
  },
};

export default function OnboardingPage() {
  return (
    <main className={css.page}>
      <div className={`container ${css.onboardingContainer}`}>
        <div className={css.formColumn}>
          <div className={css.logoWrapper}>
            <Logo />
          </div>

          <div className={css.formWrapper}>
            <OnboardingForm />
          </div>
        </div>
        <Image
          width={720}
          height={900}
          className={css.decorImage}
          src="/images/sprout.jpg"
          alt="Зображення молодого паростка як символ зародження нового життя"
          priority
        />
      </div>
    </main>
  );
}
