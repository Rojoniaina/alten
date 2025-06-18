import type { Product } from "./Product";

export type ProductCart = {
  code: string;
  name: string;
} & Partial<Omit<Product, "code" | "name" | "createdAt" | "updatedAt">>;

export interface CartItem {
  product: ProductCart;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface CartItemInput {
  productId: string;
  quantity: number;
}

export type CountCardItem = {
  count: number;
};
