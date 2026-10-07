"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createBrand, updateBrand } from "@/services/brandService";

import type { Brand } from "@/types/brand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBrandSchema, updateBrandSchema } from "@/schemas/brandSchema";

interface BrandFormProps {
  brand?: Brand;
}

export default function BrandForm({ brand }: BrandFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBrand,

    onSuccess: () => {
      setSuccess("برند با موفقیت ایجاد شد.");

      setName("");
      setLogo("");

      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },

    onError: (error) => {
      setError(error instanceof Error ? error.message : "خطا در ایجاد برند");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        logo: string;
      };
    }) => updateBrand(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      router.push("/dashboard/brand");
    },

    onError: (error) => {
      setError(error instanceof Error ? error.message : "خطا در ویرایش برند");
    },
  });
  const isEditMode = Boolean(brand);

  const [name, setName] = useState(brand?.name ?? "");

  const [logo, setLogo] = useState(brand?.logo ?? "");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const data = {
      name ,
      logo ,
    };

    if (isEditMode && brand) {
      const result = updateBrandSchema.safeParse(data);

      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      updateMutation.mutate({
        id: brand._id,
        data: result.data,
      });
    } else {
      const result = addBrandSchema.safeParse(data);

      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      createMutation.mutate(result.data);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-bold">
        {isEditMode ? "ویرایش برند" : "ایجاد برند جدید"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block">نام برند</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="مثلاً سامسونگ"
          />
        </div>

        <div>
          <label className="mb-2 block">آدرس لوگو</label>

          <input
            type="text"
            value={logo}
            onChange={(event) => setLogo(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="https://example.com/logo.png"
          />
        </div>
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
        disabled={createMutation.isPending || updateMutation.isPending}
        className="mt-6 rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {createMutation.isPending || updateMutation.isPending
          ? "در حال ذخیره..."
          : isEditMode
            ? "ذخیره تغییرات"
            : "ایجاد برند"}
      </button>
    </form>
  );
}
