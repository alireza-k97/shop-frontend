import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice =
    product.price - (product.price * product.sale) / 100;

  const imageUrl = product.media[0]?.url;

  return (
    <Link
      href={`/product/${product._id}`}
      className="block overflow-hidden rounded-lg border bg-white p-4 transition hover:shadow-md"
    >
      {/* Image */}
      <div className="mb-4 flex h-48 items-center justify-center bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-gray-400">بدون تصویر</span>
        )}
      </div>

      {/* Product name */}
      <h2 className="mb-2 font-bold">
        {product.name}
      </h2>

      {/* Price */}
      {product.sale > 0 ? (
        <div>
          <p className="text-sm text-gray-400 line-through">
            {product.price.toLocaleString()} تومان
          </p>

          <p className="font-bold text-green-600">
            {finalPrice.toLocaleString()} تومان
          </p>

          <p className="mt-1 text-sm text-red-500">
            {product.sale}% تخفیف
          </p>
        </div>
      ) : (
        <p className="font-bold">
          {product.price.toLocaleString()} تومان
        </p>
      )}
    </Link>
  );
}