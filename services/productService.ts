import { API_URL } from "@/lib/api";
import type { Product, ProductsResponse } from "@/types/product";

export async function getProducts( revalidate?:number ): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/product`, {
    ...(revalidate
      ? { next: { revalidate } }
      : { cache: "no-store" }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const result: ProductsResponse = await response.json();
  return result.data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/api/product/${id}`, {
    cache: "no-store",
  });

  if (response.status === 422) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }
  const result: Product = await response.json();
  
  return result;
}
