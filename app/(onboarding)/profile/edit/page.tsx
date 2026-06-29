import Image from "next/image";
import { OnboardingForm } from "@/components/auth/OnboardingForm/OnboardingForm";
import css from "./pageEdit.module.css";

export default function OnboardingPage() {
  return (
    <main className={css.page}>
      <div className={`container ${css.onboardingContainer}`}>
        <div className={css.formColumn}>
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
