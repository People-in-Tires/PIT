"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { FormState, NewUserFormSchema } from "@/app/lib/definitions";

z.config(z.locales.en()); //zod errors always in english

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = NewUserFormSchema.safeParse({
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    birthday: formData.get("birthday"),
    country: formData.get("country"),
    city: formData.get("city"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, firstname, lastname, birthday, country, email, password, password2 } =
    validatedFields.data;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        firstName: firstname,
        lastName: lastname,
        birthday: new Date(birthday),
        country,
        email,
        passwordHash,
      },
    });
  } catch (error: any) {
    // Prisma error code P2002 = unique constraint violation
    // (username of email bestaat al)
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] as string | undefined;
      return {
        errors: {
          [field ?? "username"]: [`This ${field ?? "value"} is already taken.`],
        },
      };
    }

    console.error("Error creating user:", error);
    return {
      message: "Something went wrong while creating your account. Please try again.",
    };
  }

  return { message: "Account created successfully!" };
}