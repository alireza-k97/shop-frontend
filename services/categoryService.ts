import { API_URL } from "@/lib/api";
import type {
  Category,
  CategoriesResponse,
  CategoryWithProducts,
  CategoryWithProductsResponse,
} from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/category`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch categories: ${response.status}`
    );
  }

  const result: CategoriesResponse = await response.json();

  return result.data;
}

export async function getCategoryByName(
  categoryName: string
): Promise<CategoryWithProducts | null> {
  const response = await fetch(
    `${API_URL}/api/product/category/${categoryName}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch category: ${response.status}`
    );
  }

  const result: CategoryWithProductsResponse =
    await response.json();

  return result.data;
}