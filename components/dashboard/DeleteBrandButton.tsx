"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteBrand } from "@/services/brandService";

interface DeleteBrandButtonProps {
  brandId: string;
}

export default function DeleteBrandButton({
  brandId,
}: DeleteBrandButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "آیا از حذف این برند مطمئن هستید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteBrand(brandId);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-3 py-1 text-white cursor-pointer disabled:opacity-50"
    >
      {loading ? "در حال حذف..." : "حذف"}
    </button>
  );
}