import Link from "next/link";

export function changePassword() {
  return (
    <Link href="/profile/change-password">
      <button type="button">Change Password</button>
    </Link>
  );
}
