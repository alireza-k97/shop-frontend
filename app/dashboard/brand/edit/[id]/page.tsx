import { notFound } from "next/navigation";

import { getBrandById } from "@/services/brandService";
import BrandForm from "@/components/dashboard/BrandForm";

interface EditBrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBrandPage({
  params,
}: EditBrandPageProps) {
  const { id } = await params;

  const brand = await getBrandById(id);

  if (!brand) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <BrandForm brand={brand} />
    </main>
  );
}
