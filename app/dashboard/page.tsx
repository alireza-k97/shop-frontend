import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/services/authService";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  let sessionId: string | null = null;

  try {
    const result = await getSession(cookie);
    sessionId = result.session.id;
  } catch {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        داشبورد
      </h1>

      <p>خوش آمدید</p>

      <p className="mt-2 text-gray-500">
        User ID: {sessionId}
      </p>
      <LogoutButton /> 
    </main>
  );
}