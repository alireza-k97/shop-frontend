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

export interface CategoryWithProductsResponse {
  success: boolean;
  data: CategoryWithProducts;
}