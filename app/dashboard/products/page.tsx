import DeleteProductButton from "@/components/dashboard/DeleteProductButton";
import ProductForm from "@/components/dashboard/ProductForm";
import { getProducts } from "@/services/productService";
import Link from "next/link";

export default async function DashboardProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">مدیریت محصولات</h1>
      <ProductForm />
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
            {products.map((product) => (
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
                    <DeleteProductButton productId={product._id}/>
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
