"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { CreateFormSchema, CreateFormState } from "./definitions";

z.config(z.locales.en()); //zod errors always in english

export async function signup(state: CreateFormState, formData: FormData) {
  const validatedFields = CreateFormSchema.safeParse({
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    birthday: formData.get("birthday"),
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
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        birthday: formData.get("birthday") as string,
        country: formData.get("country") as string,
        city: formData.get("city") as string,
        email: formData.get("email") as string,
      },
    };
  }

  const { username, firstname, lastname, birthday, country, email, password } =
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
	// CHECK DEZE CODE NOG EVEN!
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
      message:
        "Something went wrong while creating your account. Please try again.",
    };
  }

  return { success: "Account created successfully!" };
}
