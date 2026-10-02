import { notFound } from "next/navigation";

import { getCategoryById } from "@/services/categoryService";
import CategoryForm from "@/components/dashboard/CategoryForm";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <CategoryForm category={category} />
    </main>
  );
}
