"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createBrand, updateBrand } from "@/services/brandService";

import type { Brand } from "@/types/brand";

interface BrandFormProps {
  brand?: Brand;
}

export default function BrandForm({ brand }: BrandFormProps) {
  const router = useRouter();

  const isEditMode = Boolean(brand);

  const [name, setName] = useState(brand?.name ?? "");

  const [logo, setLogo] = useState(brand?.logo ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !logo) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name,
        logo,
      };

      if (isEditMode && brand) {
        await updateBrand(brand._id, data);

        setSuccess("برند با موفقیت ویرایش شد.");
        router.push("/dashboard/brand");
      } else {
        await createBrand(data);

        setSuccess("برند با موفقیت ایجاد شد.");

        setName("");
        setLogo("");
      }

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
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
        disabled={loading}
        className="mt-6 rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "در حال ذخیره..."
          : isEditMode
            ? "ذخیره تغییرات"
            : "ایجاد برند"}
      </button>
    </form>
  );
}
