"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct, updateProduct } from "@/services/productService";

import { getCategories } from "@/services/categoryService";
import { getBrands } from "@/services/brandService";
import { getMedias } from "@/services/mediaService";

import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import type { Media } from "@/types/media";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductSchema, updateProductSchema } from "@/schemas/productSchema";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setSuccess("محصول با موفقیت ایجاد شد");

      setName("");
      setPrice("");
      setSale("");
      setBrand("");
      setCategory("");
      setSelectedMedias([]);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      setError(error instanceof Error ? error.message : "خطا در ایجاد محصول");
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
        price: number;
        sale: number;
        media: string[];
        category: string;
        brand: string;
      };
    }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      router.push("/dashboard/products");
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "خطا در ویرایش محصول");
    },
  });

  const isEditMode = Boolean(product);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [sale, setSale] = useState(product ? String(product.sale) : "");

  const [category, setCategory] = useState(product?.category?._id ?? "");

  const [brand, setBrand] = useState(product?.brand?._id ?? "");

  const [selectedMedias, setSelectedMedias] = useState<string[]>(
    product?.media.map((item) => item._id) ?? [],
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesData, brandsData, mediasData] = await Promise.all([
          getCategories(),
          getBrands(),
          getMedias(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
        setMedias(mediasData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }

    loadData();
  }, []);

  function handleMediaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(event.target.selectedOptions).map(
      (option) => option.value,
    );

    setSelectedMedias(values);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const data = {
      name,
      price,
      sale,
      media: selectedMedias,
      category,
      brand,
    };

    if (isEditMode && product) {
      const result = updateProductSchema.safeParse(data);

      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      updateMutation.mutate({
        id: product._id,
        data: result.data,
      });
    } else {
      const result = addProductSchema.safeParse(data);

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
        {isEditMode ? "ویرایش محصول" : "ایجاد محصول جدید"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* نام */}
        <div>
          <label className="mb-2 block">نام محصول</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="نام محصول"
          />
        </div>

        {/* قیمت */}
        <div>
          <label className="mb-2 block">قیمت</label>

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="قیمت"
          />
        </div>

        {/* تخفیف */}
        <div>
          <label className="mb-2 block">تخفیف</label>

          <input
            type="number"
            value={sale}
            onChange={(event) => setSale(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="درصد تخفیف"
          />
        </div>

        {/* دسته‌بندی */}
        <div>
          <label className="mb-2 block">دسته‌بندی</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">انتخاب دسته‌بندی</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* برند */}
        <div>
          <label className="mb-2 block">برند</label>

          <select
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">انتخاب برند</option>

            {brands.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* رسانه */}
        <div>
          <label className="mb-2 block">رسانه</label>

          <select
            multiple
            value={selectedMedias}
            onChange={handleMediaChange}
            className="h-32 w-full rounded border p-2"
          >
            {medias.map((item) => (
              <option key={item._id} value={item._id}>
                {item.url}
              </option>
            ))}
          </select>

          <p className="mt-1 text-sm text-gray-500">
            برای انتخاب چند رسانه، Ctrl را نگه دارید.
          </p>
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
            : "ایجاد محصول"}
      </button>
    </form>
  );
}
