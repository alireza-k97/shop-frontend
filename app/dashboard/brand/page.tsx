import BrandForm from "@/components/dashboard/BrandForm";
import BrandList from "@/components/dashboard/BrandList";

export default function DashboardBrandPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت برندها
      </h1>

      <BrandForm />

      <BrandList />
    </main>
  );
}