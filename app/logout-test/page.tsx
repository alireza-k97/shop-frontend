"use client";

import { useState } from "react";
import { signOut } from "@/services/authService";

export default function LogoutTestPage() {
  const [message, setMessage] = useState("");

  async function handleLogout() {
    try {
      const result = await signOut();

      setMessage(result.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Logout
      </h1>

      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-2 text-white"
      >
        خروج از حساب
      </button>

      {message && (
        <p className="mt-4">
          {message}
        </p>
      )}
    </main>
  );
}