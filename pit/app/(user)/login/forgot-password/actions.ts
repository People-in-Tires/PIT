"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { ForgotPasswordFormState } from "./definitions";

export async function requestPasswordReset(
  state: ForgotPasswordFormState,
  formData: FormData,
) {
  const login = formData.get("login")?.toString().trim();

  if (!login) {
    return { message: "Please enter a username or email." };
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
    select: { username: true, email: true },
  });

  if (!user) {
    return { message: "No account found with this username or email." };
  }

  redirect(
    `/forgot-password/security-questions?login=${encodeURIComponent(login)}`,
  );
}
