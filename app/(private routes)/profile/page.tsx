import { ProfileEditForm } from "@/components/profile/ProfileEditForm/ProfileEditForm";
import css from "./profilePage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Профіль користувача",

  openGraph: {
    title: "Профіль",
    description: "Профіль користувача",
    url: "https://baby-loading-nine.vercel.app/profile",
    siteName: "Лелека",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Лелека — персональний помічник для майбутніх мам",
      },
    ],
  },

  twitter: {
    title: "Профіль",
    description: "Профіль користувача",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Лелека — персональний помічник для майбутніх мам",
      },
    ],
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
