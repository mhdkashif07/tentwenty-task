import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy authentication for assessment
        const demo = {
          id: "1",
          name: "Demo User",
          email: "demo@tentwenty.com",
        };
        if (!credentials) return null;
        const { email, password } = credentials as {
          email?: string;
          password?: string;
        };
        if (email === "demo@tentwenty.com" && password === "password") {
          return demo;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
