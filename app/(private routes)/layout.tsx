import  Header  from "@/components/(layout)/Header/Header";
import  SideBar  from "@/components/(layout)/Sidebar/Sidebar";
import  Breadcrumbs  from "@/components/(layout)/Breadcrumbs/Breadcrumbs";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <Header />
      <SideBar />

      <main>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}