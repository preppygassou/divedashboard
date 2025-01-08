import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import ProtectedLayoutComponent from "./_components/ProtectedLayoutComponent";
import { auth } from "@/auth";
import { headers } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async({ children }: LayoutProps) => {
  const session = await auth(); // Fetch the session
  const isLoggedIn = !!session;

  return <ProtectedLayoutComponent isLoggedIn={isLoggedIn}>{children}</ProtectedLayoutComponent>;
};

export default ProtectedLayout;
