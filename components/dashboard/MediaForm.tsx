"use client";

import { useState } from "react";

import { createMedia } from "@/services/mediaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMediaSchema } from "@/schemas/mediaSchema";

export default function MediaForm() {
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: createMedia,
    onSuccess: () => {
      setSuccess("رسانه با موفقیت ایجاد شد");
      setUrl("");
      queryClient.invalidateQueries({
        queryKey: ["medias"],
      });
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "خطا در ایجاد رسانه");
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setSuccess("");

  const result = addMediaSchema.safeParse({ url });

  if (!result.success) {
    setError(result.error.issues[0].message);
    return;
  }

  mutation.mutate(result.data);
}

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-bold">ایجاد رسانه جدید</h2>

      <div>
        <label className="mb-2 block">آدرس رسانه</label>

        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="w-full rounded border p-2"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {error && (
        <p className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
      )}

      {success && (
        <p className="mt-4 rounded bg-green-100 p-3 text-green-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-6 rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {mutation.isPending ? "در حال ذخیره..." : "ایجاد رسانه"}
      </button>
    </form>
  );
}
