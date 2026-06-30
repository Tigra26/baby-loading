import { ProfileEditForm } from "@/components/profile/ProfileEditForm/ProfileEditForm";
import css from "./profilePage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль",
  description:
    "Переглядайте та редагуйте особисту інформацію у профілі користувача Лелека.",
  openGraph: {
    title: "Профіль",
    description:
      "Переглядайте та редагуйте особисту інформацію у профілі користувача Лелека.",
    url: "/profile",
    images: ["/images/og-image.png"],
  },
  twitter: {
    title: "Профіль",
    description:
      "Переглядайте та редагуйте особисту інформацію у профілі користувача Лелека.",
    images: ["/images/og-image.png"],
  },
};

const ProfilePage = () => {
  return (
    <main className={css.profilePageMain}>
      <ProfileEditForm />
    </main>
  );
};

export default ProfilePage;
