"use client";


import { deleteMedia } from "@/services/mediaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteMediaButtonProps {
  mediaId: string;
}

export default function DeleteMediaButton({ mediaId }: DeleteMediaButtonProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medias"],
      });
    },
    onError: (error) => {
      window.alert(error instanceof Error ? error.message : "خطا در حذف رسانه");
    },
  });

  async function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این رسانه مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    mutation.mutate(mediaId);
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
