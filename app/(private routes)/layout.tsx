import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";

import css from "./layout.module.css";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className={css.layout}>
      <Header />

      <div className={css.contentWrapper}>
        <Sidebar />

        <main className={css.main}>
          <div className={css.mainInner}>
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
