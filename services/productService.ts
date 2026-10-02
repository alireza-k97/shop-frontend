import { API_URL } from "@/lib/api";
import type {
  Product,
  ProductsResponse,
  CreateProductData,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@/types/product";

export async function getProducts(revalidate?: number): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/product`, {
    ...(revalidate ? { next: { revalidate } } : { cache: "no-store" }),
    credentials: "include",
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

export async function createProduct(data: CreateProductData) {
  const response = await fetch(`${API_URL}/api/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: CreateProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateProduct(
  id: string,
  data: CreateProductData,
): Promise<UpdateProductResponse> {
  const response = await fetch(`${API_URL}/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: UpdateProductResponse = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteProduct(
  id: string,
): Promise<DeleteProductResponse> {
  const response = await fetch(`${API_URL}/api/product/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result: DeleteProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
