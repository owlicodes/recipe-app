import { Header } from "@/features/common/header";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
