import Header from "@/components/header";

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout = async({ children }: LayoutProps) => {
  return <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
    <Header/>
  {children}
  </main>;
};

export default UserLayout;
