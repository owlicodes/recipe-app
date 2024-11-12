import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Sidebar } from "@/features/common/sidebar";
import { auth } from "@/lib/auth";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session?.user.role !== "admin") redirect("/");

  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
}
