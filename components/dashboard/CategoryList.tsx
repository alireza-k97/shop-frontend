"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/categoryService";

import DeleteCategoryButton from "@/components/dashboard/DeleteCategoryButton";

export default function CategoryList() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isLoading) {
    return (
      <p className="rounded bg-gray-100 p-4">
        در حال دریافت دسته‌بندی‌ها...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="rounded bg-red-100 p-4 text-red-700">
        {error instanceof Error
          ? error.message
          : "خطا در دریافت دسته‌بندی‌ها"}
      </p>
    );
  }

  return (
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
          {categories?.map((category) => (
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

                  <DeleteCategoryButton
                    categoryId={category._id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}