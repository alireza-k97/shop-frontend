"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/services/authService";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
    >
      خروج از حساب
    </button>
  );
}