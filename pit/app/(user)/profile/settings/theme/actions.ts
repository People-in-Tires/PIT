// app/profile/settings/theme/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";            // adjust to your auth import
import { prisma } from "@/lib/prisma";    // adjust to your prisma import
import { THEME_IDS } from "@/lib/themes";

export type ThemeState = {
  success: boolean;
  error?: string;
  timestamp: number;
};

const ThemeSchema = z.object({
  theme: z.enum(THEME_IDS),
});

export async function updateTheme(
  _prevState: ThemeState,
  formData: FormData
): Promise<ThemeState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You need to be logged in.", timestamp: Date.now() };
  }

  const parsed = ThemeSchema.safeParse({ theme: formData.get("theme") });
  if (!parsed.success) {
    return { success: false, error: "Unknown theme.", timestamp: Date.now() };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { theme: parsed.data.theme },
  });

  // The theme lives in the root layout, so re-render from there
  revalidatePath("/", "layout");

  return { success: true, timestamp: Date.now() };
}
