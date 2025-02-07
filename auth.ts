import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { z } from "zod";
import bcrypt from "bcrypt";

async function getUserByEmail(email: string) {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  // return user;
  return { email: email, password: "password" };
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          // const passwordMatch = await bcrypt.compare(password, user.password);
          // if (passwordMatch) return user;

          console.log("invalid credentials");
          return null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
