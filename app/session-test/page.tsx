import { cookies } from "next/headers";
import { getSession } from "@/services/authService";

export default async function SessionTestPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  let sessionId: string | null = null;

  try {
    const result = await getSession(cookie);
    sessionId = result.session.id;
  } catch {
    sessionId = null;
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Session</h1>

      {sessionId ? (
        <>
          <p>کاربر وارد شده است.</p>

          <p className="mt-2">User ID: {sessionId}</p>
        </>
      ) : (
        <p>کاربر وارد نشده است.</p>
      )}
    </main>
  );
}
