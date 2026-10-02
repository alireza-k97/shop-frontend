import { notFound } from "next/navigation";

import { getProductById } from "@/services/productService";
import ProductForm from "@/components/dashboard/ProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <ProductForm product={product} />
    </main>
  );
}