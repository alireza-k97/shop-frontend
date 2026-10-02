"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  updateCategory,
} from "@/services/categoryService";

import type { Category } from "@/types/category";

interface CategoryFormProps {
  category?: Category;
}

export default function CategoryForm({
  category,
}: CategoryFormProps) {
  const router = useRouter();

  const isEditMode = Boolean(category);

  const [name, setName] = useState(
    category?.name ?? ""
  );

  const [enName, setEnName] = useState(
    category?.en_name ?? ""
  );

  const [image, setImage] = useState(
    category?.image ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !enName || !image) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name,
        en_name: enName,
        image,
      };

      if (isEditMode && category) {
        await updateCategory(category._id, data);

        setSuccess(
          "دسته‌بندی با موفقیت ویرایش شد."
        );
        router.push("/dashboard/category")
      } else {
        await createCategory(data);

        setSuccess(
          "دسته‌بندی با موفقیت ایجاد شد."
        );

        setName("");
        setEnName("");
        setImage("");
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
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg border p-6"
    >
      <h2 className="mb-6 text-xl font-bold">
        {isEditMode
          ? "ویرایش دسته‌بندی"
          : "ایجاد دسته‌بندی جدید"}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block">
            نام دسته‌بندی
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="w-full rounded border p-2"
            placeholder="مثلاً گوشی موبایل"
          />
        </div>

        <div>
          <label className="mb-2 block">
            نام انگلیسی
          </label>

          <input
            type="text"
            value={enName}
            onChange={(event) =>
              setEnName(event.target.value)
            }
            className="w-full rounded border p-2"
            placeholder="مثلاً mobile"
          />
        </div>

        <div>
          <label className="mb-2 block">
            آدرس تصویر
          </label>

          <input
            type="text"
            value={image}
            onChange={(event) =>
              setImage(event.target.value)
            }
            className="w-full rounded border p-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded bg-red-100 p-3 text-red-700">
          {error}
        </p>
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
            : "ایجاد دسته‌بندی"}
      </button>
    </form>
  );
}