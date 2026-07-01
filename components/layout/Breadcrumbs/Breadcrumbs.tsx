"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SvgIcon } from "@/components/shared/SvgIcon/SvgIcon";
import css from "./Breadcrumbs.module.css";

type BreadcrumbsProps = {
  currentPageName?: string;
};

const routeLabels: Record<string, string> = {
  diary: "Щоденник",
  journey: "Подорож",
  profile: "Профіль",
  edit: "Редагування",
};

const Breadcrumbs = ({ currentPageName }: BreadcrumbsProps) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs =
    segments.length === 0
      ? [
          {
            href: "/",
            label: "Мій день",
            isLast: true,
          },
        ]
      : segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          let label = routeLabels[segment] ?? decodeURIComponent(segment);

          if (isLast && currentPageName) {
            label = currentPageName;
          }

          if (segments[index - 1] === "journey" && isLast && !currentPageName) {
            label = `Тиждень ${segment}`;
          }

          if (segments[index - 1] === "diary" && isLast && !currentPageName) {
            label = "Запис";
          }

          return {
            href,
            label,
            isLast,
          };
        });

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      <ol className={css.list}>
        <li className={css.item}>
          <Link href="/" className={css.link}>
            Лелека
          </Link>
        </li>

        {breadcrumbs.map(({ href, label, isLast }) => (
          <li className={css.item} key={href}>
            <SvgIcon name="separator" size={24} className={css.separatorIcon} />

            {isLast || href === "/journey" ? (
              <span
                className={isLast ? css.current : css.disabledCrumb}
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </span>
            ) : (
              <Link href={href} className={css.link}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
