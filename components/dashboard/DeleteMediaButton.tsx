"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteMedia } from "@/services/mediaService";

interface DeleteMediaButtonProps {
  mediaId: string;
}

export default function DeleteMediaButton({ mediaId }: DeleteMediaButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این رسانه مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteMedia(mediaId);

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
