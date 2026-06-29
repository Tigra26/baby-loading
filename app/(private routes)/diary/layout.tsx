import css from "./layout.module.css";

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={css.wrapper}>{children}</div>;
}
