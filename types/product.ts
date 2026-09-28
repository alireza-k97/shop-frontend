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