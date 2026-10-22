"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { avatarFile } from "@/app/lib/avatars";
import {
  EditProfileSchema,
  type EditProfileState,
  type EditProfileValues,
} from "./definitions";

function readValues(formData: FormData): EditProfileValues {
  const get = (key: string) => formData.get(key)?.toString() ?? "";
  return {
    username: get("username"),
    name: get("name"),
    country: get("country"),
    day: get("birthday-day"),
    month: get("birthday-month"),
    year: get("birthday-year"),
  };
}

function toIsoDate({ day, month, year }: EditProfileValues): string {
  if (!day || !month || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export async function updateProfile(
  _state: EditProfileState,
  formData: FormData,
): Promise<EditProfileState> {
  const session = await auth();
  const me = session?.user?.id;
  if (!me)
    return { message: "You need to be logged in.", timestamp: Date.now() };

  const values = readValues(formData);
  const result = EditProfileSchema.safeParse({
    username: values.username,
    name: values.name,
    country: values.country,
    birthday: toIsoDate(values),
    avatar: formData.get("avatar"),
    theme: formData.get("theme"),
    themeMode: formData.get("themeMode"),
  });
  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      values,
      timestamp: Date.now(),
    };
  }

  const { username, name, country, birthday, avatar, theme, themeMode } =
    result.data;

  const taken = await prisma.user.findFirst({
    where: { username, id: { not: me } },
    select: { id: true },
  });
  if (taken) {
    return {
      errors: { username: ["This username is already taken."] },
      values,
      timestamp: Date.now(),
    };
  }

  try {
    await prisma.user.update({
      where: { id: me },
      data: {
        username,
        name,
        country,
        birthday: new Date(birthday),
        ...(avatar ? { image: avatarFile(avatar) } : {}),
        theme,
        themeMode,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        errors: { username: ["This username is already taken."] },
        values,
        timestamp: Date.now(),
      };
    }
    console.error("Error updating profile:", error);
    return {
      message: "Something went wrong. Please try again.",
      values,
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");
  return { success: true, timestamp: Date.now() };
}
