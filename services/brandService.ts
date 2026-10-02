import { API_URL } from "@/lib/api";

import type {
  Brand,
  BrandsResponse,
} from "@/types/brand";

export async function getBrands(): Promise<Brand[]> {
  const response = await fetch(`${API_URL}/api/brand`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch brands: ${response.status}`);
  }

  const result: BrandsResponse = await response.json();

  return result.data;
}