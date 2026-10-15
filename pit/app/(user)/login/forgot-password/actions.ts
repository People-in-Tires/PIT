"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { sendMail } from "@/app/lib/mail";
import { ForgotPasswordFormState, NewPasswordSchema } from "./definitions";

const CODE_LIFETIME_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 3;

async function findUser(login: string) {
  return prisma.user.findFirst({
    where: { OR: [{ username: login }, { email: login.toLowerCase() }] },
    select: { id: true, email: true },
  });
}

async function checkCode(email: string, code: string) {
  const identifier = `reset:${email}`;
  const record = await prisma.verificationToken.findFirst({
    where: { identifier },
  });

  if (!record || record.expires < new Date()) {
    return "This code has expired. Please request a new one.";
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    return "Too many attempts. Please request a new code.";
  }
  if (!(await bcrypt.compare(code, record.token))) {
    await prisma.verificationToken.updateMany({
      where: { identifier },
      data: { attempts: { increment: 1 } },
    });
    return "Incorrect code.";
  }
  return null;
}

async function sendCode(login: string): Promise<ForgotPasswordFormState> {
  if (!login) {
    return { step: "login", message: "Please enter a username or email." };
  }

  const user = await findUser(login);
  if (!user) {
    return { step: "code", login };
  }

  const code = crypto.randomInt(100000, 1000000).toString();
  const identifier = `reset:${user.email}`;

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: {
      identifier,
      token: await bcrypt.hash(code, 10),
      expires: new Date(Date.now() + CODE_LIFETIME_MS),
    },
  });

  try {
    await sendMail(
      user.email,
      "Your PIT reset code",
      `Your password reset code is: ${code}\n\nIt expires in 10 minutes. If you did not request this, you can ignore this email.`,
    );
  } catch {
    return {
      step: "login",
      message: "Could not send the email. Please try again later.",
    };
  }

  return { step: "code", login };
}

async function verifyCode(
  login: string,
  code: string,
): Promise<ForgotPasswordFormState> {
  const user = await findUser(login);
  if (!user) return { step: "login", message: "Something went wrong." };

  const error = await checkCode(user.email, code);
  if (error) return { step: "code", login, message: error };

  return { step: "password", login, code };
}

async function setNewPassword(
  login: string,
  code: string,
  password: string,
  confirm: string,
): Promise<ForgotPasswordFormState> {
  const user = await findUser(login);
  if (!user) return { step: "login", message: "Something went wrong." };

  // The client is not trusted: check the code again.
  const error = await checkCode(user.email, code);
  if (error) return { step: "code", login, message: error };

  const result = NewPasswordSchema.safeParse({ password, confirm });
  if (!result.success) {
    return {
      step: "password",
      login,
      code,
      errors: result.error.issues.map((issue) => issue.message),
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(result.data.password, 10) },
  });
  await prisma.verificationToken.deleteMany({
    where: { identifier: `reset:${user.email}` },
  });

  return { step: "done" };
}

export async function resetPassword(
  _state: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const step = formData.get("step")?.toString();
  const login = formData.get("login")?.toString().trim() ?? "";
  const code = formData.get("code")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirm = formData.get("confirm")?.toString() ?? "";

  if (step === "login") return sendCode(login);
  if (step === "code") return verifyCode(login, code);
  if (step === "password")
    return setNewPassword(login, code, password, confirm);

  return { step: "login", message: "Something went wrong." };
}
