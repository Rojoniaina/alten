import type { Cart, CartItemInput, CountCardItem } from "../../domain/Cart";

import { BASE_URL } from "../constant";
import { apiFetch } from "../utils";

const API_URL = `${BASE_URL}/api/v1/carts`;

export const getCart = async (): Promise<Cart> => {
  return apiFetch<Cart>(`${API_URL}`);
};

export const getCartItemCount = async (): Promise<CountCardItem> => {
  return apiFetch<CountCardItem>(`${API_URL}/count`);
};

export const addItemToCart = async (data: CartItemInput): Promise<Cart> => {
  return apiFetch<Cart>(`${API_URL}/items`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateQuantityItem = async (
  data: CartItemInput
): Promise<Cart> => {
  return apiFetch<Cart>(`${API_URL}/items`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const clearCart = async (): Promise<boolean> => {
  return apiFetch<boolean>(`${API_URL}`, {
    method: "DELETE",
  });
};

export const deleteItem = async (id: string): Promise<Cart> => {
  return apiFetch<Cart>(`${API_URL}/items/${id}`, {
    method: "DELETE",
  });
};
