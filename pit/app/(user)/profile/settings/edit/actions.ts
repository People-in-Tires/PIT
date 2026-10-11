"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { EditFormSchema, EditFormState } from "./definitions";
import { Prisma } from "@/generated/prisma";

export async function editProfile(
  prevState: unknown,
  formData: FormData,
): Promise<EditFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const rawData = {
    username: formData.get("username") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const validated = EditFormSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      values: rawData,
    };
  }

  const { username, email } = validated.data;

  const taken = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      OR: [{ username }, { email }],
    },
    select: { username: true, email: true },
  });

  const usernameTaken = taken.some((u) => u.username === username);
  const emailTaken = taken.some((u) => u.email === email);

  if (usernameTaken || emailTaken) {
    return {
      errors: {
        ...(usernameTaken && { username: ["This username is already taken."] }),
        ...(emailTaken && { email: ["This email is already taken."] }),
      },
      values: {
        ...rawData,
        username: usernameTaken ? "" : rawData.username,
        email: emailTaken ? "" : rawData.email,
      },
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: validated.data,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        message: "That username or email is already taken. Please try another.",
        values: rawData,
      };
    }
    console.error("Error updating profile:", error);
    return { message: "Something went wrong. Please try again." };
  }

  return { success: true, timestamp: Date.now() };
}
