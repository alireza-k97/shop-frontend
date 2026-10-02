import { API_URL } from "@/lib/api";
import type {
  Category,
  CategoriesResponse,
  CategoryWithProducts,
  CategoryWithProductsResponse,
  DeleteCategoryResponse,
  UpdateCategoryResponse,
  CreateCategoryResponse,
  CreateCategoryData,
  CategoryResponse,
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

export async function getCategoryById(
  id: string
): Promise<Category | null> {
  const response = await fetch(
    `${API_URL}/api/category/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404 || response.status === 422) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch category: ${response.status}`
    );
  }

  const result: CategoryResponse =
    await response.json();

  return result;
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

  return result;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<CreateCategoryResponse> {
  const response = await fetch(`${API_URL}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: CreateCategoryResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateCategory(
  id: string,
  data: CreateCategoryData
): Promise<UpdateCategoryResponse> {
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: UpdateCategoryResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteCategory(
  id: string
): Promise<DeleteCategoryResponse> {
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result: DeleteCategoryResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}