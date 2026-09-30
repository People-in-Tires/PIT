import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import CreateUserForm from "./CreateUserForm";

export default async function CreateUserPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <CreateUserForm mode="signup" />;
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");
  if (user.username) redirect("/profile");

  return (
    <CreateUserForm
      mode="complete"
      prefill={{ name: user.name ?? "", email: user.email }}
    />
  );
}
