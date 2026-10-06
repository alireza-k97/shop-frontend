import MediaForm from "@/components/dashboard/MediaForm";
import MediaList from "@/components/dashboard/MediaList";

export default function DashboardMediaPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت رسانه‌ها
      </h1>

      <MediaForm />

      <MediaList />
    </main>
  );
}