import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import ProtectedLayoutComponent from "./_components/ProtectedLayoutComponent";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { LoginForm } from "@/components/auth/login-form";

interface LayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async({ children }: LayoutProps) => {
  const session = await auth(); // Fetch the session
  const isLoggedIn = !!session;

 /*  if (!isLoggedIn) {
    
    return <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500 to-blue-500"> <LoginForm /></div>
  }
 */

  return <ProtectedLayoutComponent isLoggedIn={isLoggedIn}>{children}</ProtectedLayoutComponent>;
};

export default ProtectedLayout;
