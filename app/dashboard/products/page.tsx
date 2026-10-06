import ProductForm from "@/components/dashboard/ProductForm";
import ProductList from "@/components/dashboard/ProductList";

export default function DashboardProductsPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        مدیریت محصولات
      </h1>

      <ProductForm />

      <ProductList />
    </main>
  );
}