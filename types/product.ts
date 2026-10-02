import type { Brand } from "./brand";
import type { Category } from "./category";
import type { Media } from "./media";

export interface  Product  {
  _id: string;
  name: string;
  price: number;
  sale: number;
  media: Media[];
  category: Category;
  brand: Brand;
  createdAt: string;
  updatedAt: string;
};
export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

export interface CreateProductData {
  name: string;
  price: number;
  sale: number;
  media: string[];
  category: string;
  brand: string;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  _id: string;
  name: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  productId: string;
  product: Product;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
  productId: string;
}