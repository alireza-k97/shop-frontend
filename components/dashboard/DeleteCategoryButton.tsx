"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "@/services/categoryService";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export default function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error) => {
      window.alert(
        error instanceof Error ? error.message : "خطا در حذف دسته‌بندی",
      );
    },
  });

  function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟");

    if (!confirmed) return;

    mutation.mutate(categoryId);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="rounded bg-red-600 px-3 py-1 text-white disabled:opacity-50"
    >
      {mutation.isPending ? "در حال حذف..." : "حذف"}
    </button>
  );
}
