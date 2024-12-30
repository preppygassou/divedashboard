import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'
import Unauthorized from '@/components/unauthorized'

interface ProtectedRouteLayoutProps {
  children: React.ReactNode;
};

const AminRouteLayout = async ({ children }: ProtectedRouteLayoutProps) => {

  const user = await currentUser() 

  if (!user) {
    return redirect('/')
  }

  const getAdminPermission = async () => {
     const session = user
     const isAdmin = session && (session?.role === "ADMIN" );
     return isAdmin;
   }; 
   
  const isAdmin = await getAdminPermission();
  if(!isAdmin)return <Unauthorized />
  
  return (
    <>
        {children}
    </>

  );
}

export default AminRouteLayout;