"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { ChangePasswordSchema, type ChangePasswordState } from "./definitions";

export async function changePassword(
  _state: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await auth();
  const me = session?.user?.id;
  if (!me)
    return { message: "You need to be logged in.", timestamp: Date.now() };

  const result = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    password2: formData.get("password2")?.toString() ?? "",
  });
  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      timestamp: Date.now(),
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: me },
    select: { passwordHash: true },
  });
  const correct =
    user &&
    (await bcrypt.compare(result.data.currentPassword, user.passwordHash));
  if (!correct) {
    return {
      errors: { currentPassword: ["Your current password is incorrect."] },
      timestamp: Date.now(),
    };
  }

  await prisma.user.update({
    where: { id: me },
    data: { passwordHash: await bcrypt.hash(result.data.password, 10) },
  });

  return { success: true, timestamp: Date.now() };
}
