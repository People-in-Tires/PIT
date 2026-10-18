"use server";

import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";
import { LoginFormSchema, LoginFormState } from "./definitions";

export async function signin(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const login = String(formData.get("login") ?? "");

  const result = LoginFormSchema.safeParse({
    login,
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      message: "Please fill in you username/email and password.",
      values: { login },
      timestamp: Date.now(),
    };
  }

  try {
    await signIn("credentials", {
      ...result.data,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: "Invalid username/email or password.",
        values: { login },
        timestamp: Date.now(),
      };
    }
    throw error;
  }
  return undefined;
}

export async function signInWith42() {
  await signIn("42-school", { redirectTo: "/" });
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/" });
}
