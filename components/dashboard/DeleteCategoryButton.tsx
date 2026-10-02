"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteCategory } from "@/services/categoryService";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export default function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "آیا از حذف این دسته‌بندی مطمئن هستید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteCategory(categoryId);

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
      className="rounded bg-red-600 px-3 py-1 text-white disabled:opacity-50"
    >
      {loading ? "در حال حذف..." : "حذف"}
    </button>
  );
}