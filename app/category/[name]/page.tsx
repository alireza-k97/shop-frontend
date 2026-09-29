import { notFound } from "next/navigation";
import ProductCard from "@/components/productCard";
import { getCategoryByName } from "@/services/categoryService";
import { Product } from "@/types/product";

interface CategoryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { name } = await params;

  const category = await getCategoryByName(name);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-2 text-2xl font-bold">
        {category.name}
      </h1>

      <p className="mb-6 text-gray-500">
        {category.en_name}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {category.products.map((product : Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}