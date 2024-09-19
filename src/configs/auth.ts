import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { formSchemaLogin } from '../lib/zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = formSchemaLogin.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (!user || !user.password) {
          throw new Error("No user found");
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log('jwt callback', {token, user, session})
      if (trigger === 'update' && session?.user.image) {
        token.image = session.user.image
      }

      if (user) {
        token.role = user.role;
        token.id = user.id
        token.image = user.image
      }
      return token;
    },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      console.log('session callback', {token, user, session})
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id
        session.user.image = token.image
      }
      // return session;
      return {...session, user: {
        ...session.user,
        image: token.image
      }};
    },
  },

  secret: process.env.AUTH_SECRET,

  session: { strategy: "jwt" },

  pages: {
    signIn: "/signin",
  },
  trustHost: true,
}
)
