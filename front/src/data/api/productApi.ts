import type {
  CreateProductInput,
  Product,
  ProductPaginatedResult,
  UpdateProductInput,
} from "../../domain/Product";
import { BASE_URL } from "../constant";
import { apiFetch } from "../utils";

const API_URL = `${BASE_URL}/api/v1/products`;

export const fetchProducts = async (
  page: number
): Promise<ProductPaginatedResult> => {
  return apiFetch<ProductPaginatedResult>(`${API_URL}?page=${page}&limit=2`);
};

export const getProduct = async (id: string): Promise<Product> => {
  return apiFetch<Product>(`${API_URL}/${id}`);
};

export const createProduct = async (
  data: CreateProductInput
): Promise<Product> => {
  return apiFetch<Product>(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProduct = async (
  id: string,
  data: UpdateProductInput
): Promise<Product> => {
  return apiFetch<Product>(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteProduct = async (id: string): Promise<Boolean> => {
  return apiFetch<Boolean>(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
