import Link from "next/link";

import { getCategories } from "@/services/categoryService";
import CategoryForm from "@/components/dashboard/CategoryForm";
import DeleteCategoryButton from "@/components/dashboard/DeleteCategoryButton";

export default async function DashboardCategoryPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت دسته‌بندی‌ها
      </h1>

      <CategoryForm />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="border p-3">
                نام
              </th>

              <th className="border p-3">
                نام انگلیسی
              </th>

              <th className="border p-3">
                تصویر
              </th>

              <th className="border p-3">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border p-3">
                  {category.name}
                </td>

                <td className="border p-3">
                  {category.en_name}
                </td>

                <td className="border p-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    "بدون تصویر"
                  )}
                </td>

                <td className="border p-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/category/edit/${category._id}`}
                      className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                      ویرایش
                    </Link>

                    <DeleteCategoryButton categoryId={category._id}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}