import { Sidebar } from "@/features/common/sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
}
