import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client";
import authConfig from "./auth.config"
import { getUserById } from "./lib/data/user";
import { getAccountByUserId } from "./lib/data/accounts";
import { getTwoFactorConfirmationByUserId } from "./lib/data/two-factor-confirmation";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(),status:"ACTIVE" },
      });
    },
  },
  callbacks: {
      async signIn({ user, account }) {
        // Allow OAuth without email verification
        if (account?.provider !== "credentials") {
        // Update lastLogin for OAuth sign-ins
        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });
        return true;
        }
    
        const existingUser = await getUserById(user.id);
    
        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;
    
        // 2FA check
        if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
    
        if (!twoFactorConfirmation) return false;
    
        // Delete the two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
        }
    
        // Update lastLogin for credentials sign-in
        await db.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
        });
    
        return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
    async jwt({ token,user,session,profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.phone = existingUser.phone;
      token.username = existingUser.username;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});