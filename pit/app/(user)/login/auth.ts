"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { LoginFormState, LoginFormSchema } from "./definitions";

z.config(z.locales.en()); //zod errors always in english

export async function signin(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    login: formData.get("login"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { login, password } = validatedFields.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: login.toLowerCase() }, { username: login }],
    },
  });

  if (!user) {
    return { message: "User not found" };
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return { message: "Incorrect password!" };
  }

  return { success: "Entering the PIT" };
}
