"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) => {
  const cookieStore = await cookies();
  return cookieStore.set(key, value, options);
};

export const getCookie = async (key: string) => {
  return cookies().then((cookieStore) => cookieStore.get(key)?.value);
};

export const saveToken = async (token: string, expirationTime: number) => {
  const now = new Date().getTime() * 1000;
  const expires = new Date(now + expirationTime);

  await setCookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    expires,
    path: "/",
  });

  console.log("setcookie", await getCookie("accessToken"));
};

export const deleteToken = async () => {
  await setCookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  });
};
