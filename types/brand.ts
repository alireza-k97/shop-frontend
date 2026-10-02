export interface Brand {
  _id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
}

export interface CreateBrandData {
  name: string;
  logo: string;
}

export interface CreateBrandResponse {
  success: boolean;
  message: string;
  data: Brand;
}

export interface UpdateBrandResponse {
  success: boolean;
  message: string;
  brandId: string;
  brand: Brand;
}

export interface DeleteBrandResponse {
  success: boolean;
  message: string;
  brandId: string;
}