"use client";
import css from "./Sidebar.module.css";
import Logo from "@/components/shared/Logo/Logo";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import { useAuthStore } from "@/lib/store/authStore";
import { useSideBarStore } from "@/lib/store/sideBarStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { sideBarIsOpen, closeSideBar } = useSideBarStore();
  const { isAuthenticated, user } = useAuthStore();
  const handleBackDropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) closeSideBar();
  };
  const handleCloseSideBar = () => {
    closeSideBar();
  };

  return (
    <>
      <div
        onClick={handleBackDropClick}
        className={`${css.asideBackDrop} ${sideBarIsOpen ? css.openBackDrop : ""}`}
      ></div>
      <aside className={`${css.sideBar} ${sideBarIsOpen ? css.open : ""}`}>
        <div>
          <div className={css.asideHeader}>
            <Logo />
            <button type="button" onClick={handleCloseSideBar}>
              <SvgIcon name="close" />
            </button>
          </div>
          <nav className={css.asideNavigation}>
            <ul
              className={css.asideNavigationList}
              onClick={handleCloseSideBar}
            >
              <li>
                <Link href="/" className={css.asideNavigationItemLink}>
                  <SvgIcon name="today" />
                  <span className={css.asideLinkText}>Мій день</span>
                </Link>
              </li>
              <li>
                <Link href="/journey" className={css.asideNavigationItemLink}>
                  <SvgIcon name="conversion" />
                  <span className={css.asideLinkText}>Подорож</span>
                </Link>
              </li>
              <li>
                <Link href="/diary" className={css.asideNavigationItemLink}>
                  <SvgIcon name="book" />
                  <span className={css.asideLinkText}>Щоденик</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className={css.asideNavigationItemLink}>
                  <SvgIcon name="account" />
                  <span className={css.asideLinkText}>Профіль</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.asideFooter}>
          {isAuthenticated ? (
            <div className={css.asideFooterAuthLink}>
              <Link href="/auth/register" className={css.asideRegistrationLink}>
                Зареєстуватись
              </Link>
              <Link href="./auth/login" className={css.asideLoginLink}>
                Увійти
              </Link>
            </div>
          ) : (
            <div className={css.asideFooterProfile}>
              <div className={css.profileWrapper}>
                <div className={css.profileAvatar}>
                  <Image
                    width={40}
                    height={40}
                    src={user?.avatarUrl || "/images/defaultAvatar.png"}
                    alt="Profile avatar"
                  />
                </div>
                <div className={css.profileData}>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button type="button">
                <SvgIcon name="logout" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
