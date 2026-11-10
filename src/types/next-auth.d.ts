import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      demo?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    demo?: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string;
    demo?: boolean;
  }
}
