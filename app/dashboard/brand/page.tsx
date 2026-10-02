import Link from "next/link";

import { getBrands } from "@/services/brandService";
import BrandForm from "@/components/dashboard/BrandForm";
import DeleteBrandButton from "@/components/dashboard/DeleteBrandButton";

export default async function DashboardBrandPage() {
  const brands = await getBrands();

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت برندها
      </h1>

      <BrandForm />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="border p-3">
                نام
              </th>

              <th className="border p-3">
                لوگو
              </th>

              <th className="border p-3">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td className="border p-3">
                  {brand.name}
                </td>

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

                    <DeleteBrandButton brandId={brand._id}/>
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