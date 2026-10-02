import type { Product } from "@/types/product";

export interface Category {
  _id: string;
  name: string;
  en_name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface CategoryWithProductsResponse extends CategoryWithProducts {
  success: boolean;
}

export interface CreateCategoryData {
  name: string;
  en_name: string;
  image: string;
}

export interface CreateCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface UpdateCategoryResponse {
  success: boolean;
  message: string;
  categoryId: string;
  category: Category;
}

export interface DeleteCategoryResponse {
  success: boolean;
  message: string;
  categoryId: string;
}

export interface CategoryResponse extends Category {
  success: boolean;
}