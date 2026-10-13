"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import {
  CreateFormSchema,
  CreateFormState,
  CreateFormValues,
} from "./definitions";

z.config(z.locales.en()); // zod errors always in english

function readValues(formData: FormData): CreateFormValues {
  const get = (key: string) => String(formData.get(key) ?? "");

  return {
    username: get("username"),
    name: get("name"),
    day: get("birthday-day"),
    month: get("birthday-month"),
    year: get("birthday-year"),
    country: get("country"),
    email: get("email"),
  };
}

export async function signup(
  _state: CreateFormState,
  formData: FormData,
): Promise<CreateFormState> {
  const values = readValues(formData);
  const { day, month, year } = values;
  const birthday =
    day && month && year
      ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      : "";

  const result = CreateFormSchema.safeParse({
    username: values.username,
    name: values.name,
    birthday,
    country: values.country,
    email: values.email,
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      values,
      timestamp: Date.now(),
    };
  }

  const { username, name, country, email, password } = result.data;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        name,
        birthday: new Date(result.data.birthday),
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
      const usernameTaken = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });

      return usernameTaken
        ? {
            errors: { username: ["This username is already taken."] },
            values: { ...values, username: "" },
            timestamp: Date.now(),
          }
        : {
            errors: { email: ["This email is already taken."] },
            values: { ...values, email: "" },
            timestamp: Date.now(),
          };
    }

    console.error("Error creating user:", error);
    return {
      message:
        "Something went wrong while creating your account. Please try again.",
      values,
      timestamp: Date.now(),
    };
  }

  return { success: "Account created successfully!" };
}