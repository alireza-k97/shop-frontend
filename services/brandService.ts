import { API_URL } from "@/lib/api";

import type {
  Brand,
  BrandResponse,
  BrandsResponse,
  CreateBrandData,
  CreateBrandResponse,
  DeleteBrandResponse,
  UpdateBrandResponse,
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

export async function getBrandById(id: string): Promise<Brand | null> {
  const response = await fetch(`${API_URL}/api/brand/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 422) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch brand: ${response.status}`);
  }

  const result: BrandResponse = await response.json();
  return result;
}

export async function createBrand(
  data: CreateBrandData,
): Promise<CreateBrandResponse> {
  const response = await fetch(`${API_URL}/api/brand`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: CreateBrandResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateBrand(
  id: string,
  data: CreateBrandData,
): Promise<UpdateBrandResponse> {
  const response = await fetch(`${API_URL}/api/brand/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: UpdateBrandResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteBrand(id: string): Promise<DeleteBrandResponse> {
  const response = await fetch(`${API_URL}/api/brand/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result: DeleteBrandResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
