"use server";

import * as z from "zod";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { ALLOWED_AVATARS } from "@/app/lib/avatars";
import { UPLOAD_DIR } from "@/app/lib/upload";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_FORMATS = ["jpeg", "png", "webp"];

export async function uploadAvatar(
  formData: FormData,
): Promise<{ image?: string, error?: string }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  const userId = session.user.id;

  const file = formData.get("avatar");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be smaller than 2 MB." };
  }

  let output: Buffer;
  try {
    const input = sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 24_000_000,
    });
    const meta = await input.metadata();
    if (!ALLOWED_FORMATS.includes(meta.format ?? "")) {
      return { error: "Only PNG, JPG or WebP images are allowed." };
    }
    output = await input
      .rotate()
      .resize(256, 256, { fit: "cover" })
      .webp({ quality: 85 })
      .toBuffer();
  } catch {
    return { error: "That file is not a valid image." };
  }

  const name = `${randomUUID()}.webp`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), output);

  await prisma.user.update({
    where: { id: userId },
    data: { image: `uploads/${name}` },
  });

  return { image: `uploads/${name}` };
}

export async function updateAvatar(file: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const parsed = z.enum(ALLOWED_AVATARS).safeParse(file);
  if (!parsed.success) return { error: "Invalid avatar." };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: parsed.data },
  });
  return {};
}
