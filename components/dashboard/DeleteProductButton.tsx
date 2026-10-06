"use client";


import { deleteProduct } from "@/services/productService";
import { useMutation , useQueryClient } from "@tanstack/react-query";

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      window.alert(error instanceof Error ? error.message : "خطا در حذف محصول");
    },
  });


  async function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

   mutation.mutate(productId)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="rounded bg-red-600 px-3 py-1 text-white cursor-pointer disabled:opacity-50"
    >
      {mutation.isPending ? "در حال حذف..." : "حذف"}
    </button>
  );
}
