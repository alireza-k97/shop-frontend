"use client";

import { useState } from "react";
import { signUp } from "@/services/authService";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const result = await signUp({
        name,
        email,
        password,
      });

      setMessage(result.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">
        ثبت نام
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-3 text-white"
        >
          ثبت نام
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm">
          {message}
        </p>
      )}
    </main>
  );
}