import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import LineProvider from "next-auth/providers/line";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    LineProvider({
      clientId: process.env.LINE_ID,
      clientSecret: process.env.LINE_SECRET,
      authorization: {
        params: {
          scope: "profile openid email",
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
