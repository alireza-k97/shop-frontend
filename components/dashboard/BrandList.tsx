"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getBrands } from "@/services/brandService";
import DeleteBrandButton from "@/components/dashboard/DeleteBrandButton";

export default function BrandList() {
  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return <p className="rounded bg-gray-100 p-4">در حال دریافت برندها...</p>;
  }

  if (isError) {
    return (
      <p className="rounded bg-red-100 p-4 text-red-700">
        {error instanceof Error ? error.message : "خطا در دریافت برندها"}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100 text-right">
            <th className="border p-3">نام</th>
            <th className="border p-3">لوگو</th>
            <th className="border p-3">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {brands?.map((brand) => (
            <tr key={brand._id}>
              <td className="border p-3">{brand.name}</td>

              <td className="border p-3">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-12 rounded object-contain"
                  />
                ) : (
                  "بدون لوگو"
                )}
              </td>

              <td className="border p-3">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/brand/edit/${brand._id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-white"
                  >
                    ویرایش
                  </Link>

                  <DeleteBrandButton brandId={brand._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
