"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/services/productService";
import DeleteProductButton from "@/components/dashboard/DeleteProductButton";

export default function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (isLoading) {
    return <p className="rounded bg-gray-100 p-4">در حال دریافت محصولات...</p>;
  }

  if (isError) {
    return (
      <p className="rounded bg-red-100 p-4 text-red-700">
        {error instanceof Error ? error.message : "خطا در دریافت محصولات"}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100 text-right">
            <th className="border p-3">نام</th>
            <th className="border p-3">قیمت</th>
            <th className="border p-3">تخفیف</th>
            <th className="border p-3">دسته‌بندی</th>
            <th className="border p-3">برند</th>
            <th className="border p-3">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td className="border p-3">{product.name}</td>

              <td className="border p-3">
                {product.price.toLocaleString()} تومان
              </td>

              <td className="border p-3">{product.sale}٪</td>

              <td className="border p-3">
                {product.category?.name ?? "بدون دسته‌بندی"}
              </td>

              <td className="border p-3">
                {product.brand?.name ?? "بدون برند"}
              </td>

              <td className="border p-3">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/products/edit/${product._id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-white"
                  >
                    ویرایش
                  </Link>

                  <DeleteProductButton productId={product._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
