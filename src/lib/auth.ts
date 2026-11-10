import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getPrisma, hasDatabase } from "@/lib/prisma";

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
}

/**
 * JWT sessions so the app can sign in without a database.
 * Set AUTH_SECRET in production. The fallback only keeps a local demo buildable.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "huyen-tam-demo-secret",
  session: { strategy: "jwt" },
  pages: { signIn: "/dang-nhap" },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      authorize: async (credentials) => {
        const email = text(credentials.email).toLowerCase();
        const password = text(credentials.password);
        if (!validEmail(email) || password.length < 6 || password.length > 72) return null;

        if (!hasDatabase()) {
          const name = email.split("@")[0] || "Khách";
          return { id: `demo:${email}`, email, name, role: "USER", demo: true };
        }

        const prisma = getPrisma();
        if (!prisma) return null;

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user?.passwordHash) return null;
          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            demo: false,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.demo = user.demo;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role;
        session.user.demo = token.demo === true;
      }
      return session;
    },
  },
});
