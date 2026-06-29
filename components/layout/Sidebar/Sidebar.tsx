"use client";
import css from "./Sidebar.module.css";
import Logo from "@/components/shared/Logo/Logo";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import { logout } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useSideBarStore } from "@/lib/store/sideBarStore";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { sideBarIsOpen, closeSideBar } = useSideBarStore();

  const pathName = usePathname();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearIsAuthenticated();
      router.push("/auth/login");
      toast.success("Ви успішно вийшли. Лелека буде чекати вас");
    },
    onError: () => {
      toast.error("Ой шось пішло не так. Лелека каже спробуйте ще раз");
    },
  });

  const handleBackDropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) closeSideBar();
  };
  const handleCloseSideBar = () => {
    closeSideBar();
  };
  const handleClickOnLogout = () => {
    mutate();
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
            <button
              type="button"
              onClick={handleCloseSideBar}
              className={css.asideCloseButton}
            >
              <SvgIcon name="close" />
            </button>
          </div>
          <nav className={css.asideNavigation}>
            <ul
              className={css.asideNavigationList}
              onClick={handleCloseSideBar}
            >
              <li>
                <Link
                  href="/"
                  className={clsx(css.asideNavigationItemLink, {
                    [css.active]: pathName === "/",
                  })}
                >
                  <SvgIcon name="today" />
                  <span className={css.asideLinkText}>Мій день</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  className={clsx(css.asideNavigationItemLink, {
                    [css.active]: pathName === "/journey",
                  })}
                >
                  <SvgIcon name="conversion" />
                  <span className={css.asideLinkText}>Подорож</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/diary"
                  className={clsx(css.asideNavigationItemLink, {
                    [css.active]: pathName === "/diary",
                  })}
                >
                  <SvgIcon name="book" />
                  <span className={css.asideLinkText}>Щоденик</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={clsx(css.asideNavigationItemLink, {
                    [css.active]: pathName === "/profile",
                  })}
                >
                  <SvgIcon name="account" />
                  <span className={css.asideLinkText}>Профіль</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.asideFooter}>
          {!isAuthenticated ? (
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
                    width={44}
                    height={44}
                    src={user?.avatarUrl || "/images/defaultAvatar.png"}
                    alt="Profile avatar"
                    className={css.sidebarProfileAvatar}
                  />
                </div>
                <div className={css.profileData}>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClickOnLogout}
                className={css.asideLogoutButton}
              >
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
