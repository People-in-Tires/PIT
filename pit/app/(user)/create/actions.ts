"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import {
  CompleteProfileSchema,
  CreateFormSchema,
  CreateFormState,
} from "./definitions";

z.config(z.locales.en()); //zod errors always in english

export async function signup(
  state: CreateFormState,
  formData: FormData,
): Promise<CreateFormState> {
  const session = await auth();

  if (session?.user?.id) {
    const validatedFields = CompleteProfileSchema.safeParse({
      username: formData.get("username"),
      name: formData.get("name"),
      birthday: formData.get("birthday"),
      country: formData.get("country"),
    });

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { username, name, birthday, country } = validatedFields.data;

    try {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { username, name, birthday: new Date(birthday), country },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return { errors: { username: ["This username is already taken."] } };
      }
      console.error("Error completing profile:", error);
      return { message: "Something went wrong. Please try again." };
    }

    redirect("/profile");
  }

  const validatedFields = CreateFormSchema.safeParse({
    username: formData.get("username"),
    name: formData.get("name"),
    birthday: formData.get("birthday"),
    country: formData.get("country"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
    question1: formData.get("question1"),
    question2: formData.get("question2"),
    answer1: formData.get("answer1"),
    answer2: formData.get("answer2"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        username: formData.get("username") as string,
        name: formData.get("name") as string,
        birthday: formData.get("birthday") as string,
        country: formData.get("country") as string,
        email: formData.get("email") as string,
        question1: formData.get("question1") as string,
        question2: formData.get("question2") as string,
      },
    };
  }

  const {
    username,
    name,
    birthday,
    country,
    email,
    password,
    question1,
    question2,
    answer1,
    answer2,
  } = validatedFields.data;
  const [passwordHash, answer1Hash, answer2Hash] = await Promise.all([
    bcrypt.hash(password, 10),
    bcrypt.hash(answer1, 10),
    bcrypt.hash(answer2, 10),
  ]);

  try {
    await prisma.user.create({
      data: {
        username,
        name,
        birthday: new Date(birthday),
        country,
        email,
        passwordHash,
        questions: {
          create: [
            { question: question1, answerHash: answer1Hash },
            { question: question2, answerHash: answer2Hash },
          ],
        },
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string | undefined;
      const field = target?.[0] ? "username" : "email";
      return { errors: { [field]: [`This ${field} is already taken.`] } };
    }

    console.error("Error creating user:", error);
    return {
      message:
        "Something went wrong while creating your account. Please try again.",
    };
  }

  return { success: "Account created successfully!" };
}
