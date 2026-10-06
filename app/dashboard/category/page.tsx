import CategoryForm from "@/components/dashboard/CategoryForm";
import CategoryList from "@/components/dashboard/CategoryList";

export default async function DashboardCategoryPage() {

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">مدیریت دسته‌بندی‌ها</h1>

      <CategoryForm />

      <CategoryList />
    </main>
  );
}
