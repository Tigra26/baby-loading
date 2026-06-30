import css from "./layout.module.css";

const DiaryLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.wrapper}>{children}</div>;
};

export default DiaryLayout;
