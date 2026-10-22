import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.id) redirect("/");

  const { error } = await searchParams;

  return <LoginForm oauthError={error} />;
}
