"use server";

import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";
import { LoginFormState } from "./definitions";

export async function signin(state: LoginFormState, formData: FormData) {
  try {
    await signIn("credentials", {
      login: formData.get("login"),
      password: formData.get("password"),
      redirectTo: "/profile",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid username/email or password." };
    }
    throw error;
  }
}

export async function signInWith42() {
  await signIn("42-school");
}

export async function signInWithGitHub() {
  await signIn("github");
}