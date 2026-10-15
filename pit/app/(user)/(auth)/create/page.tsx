import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import CreateUserForm from "./CreateUserForm";

export default async function CreateUserPage() {
  const session = await auth();

  if (session?.user?.id) redirect("/profile");

  return <CreateUserForm />;
}
