"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand } from "@/services/brandService";

interface DeleteBrandButtonProps {
  brandId: string;
}

export default function DeleteBrandButton({ brandId }: DeleteBrandButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBrand,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },

    onError: (error) => {
      window.alert(error instanceof Error ? error.message : "خطا در حذف برند");
    },
  });

  function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این برند مطمئن هستید؟");

    if (!confirmed) return;

    mutation.mutate(brandId);
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
