"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import { CreateFormSchema, CreateFormState } from "./definitions";

z.config(z.locales.en()); //zod errors always in english

export async function signup(
  state: CreateFormState,
  formData: FormData,
): Promise<CreateFormState> {
  const day = formData.get("birthday-day") as string;
  const month = formData.get("birthday-month") as string;
  const year = formData.get("birthday-year") as string;
  const birthday =
    day && month && year
      ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      : "";

  const validatedFields = CreateFormSchema.safeParse({
    username: formData.get("username"),
    name: formData.get("name"),
    birthday,
    country: formData.get("country"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        username: formData.get("username") as string,
        name: formData.get("name") as string,
        day,
        month,
        year,
        country: formData.get("country") as string,
        email: formData.get("email") as string,
      },
      timestamp: Date.now(),
    };
  }

  const { username, name, country, email, password } = validatedFields.data;
  const [passwordHash] = await Promise.all([bcrypt.hash(password, 10)]);

  try {
    await prisma.user.create({
      data: {
        username,
        name,
        birthday: new Date(birthday),
        country,
        email,
        passwordHash,
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string | undefined;
      const field = target?.[0] ? "username" : "email";
      return {
        errors: { [field]: [`This ${field} is already taken.`] },
        values: {
          username:
            field === "username" ? "" : (formData.get("username") as string),
          name: formData.get("name") as string,
          day,
          month,
          year,
          country: formData.get("country") as string,
          email: field === "email" ? "" : (formData.get("email") as string),
        },
        timestamp: Date.now(),
      };
    }

    console.error("Error creating user:", error);
    return {
      message:
        "Something went wrong while creating your account. Please try again.",
    };
  }

  return { success: "Account created successfully!" };
}
