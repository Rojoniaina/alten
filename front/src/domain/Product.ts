import type { InfiniteData } from "@tanstack/react-query";

type INVENTORY_STATUS = "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  internalReference: string;
  shellId: number;
  inventoryStatus: INVENTORY_STATUS;
  rating: number;
  createdAt: number;
  updatedAt: number;
}

export type CreateProductInput = {
  code: string;
  name: string;
} & Partial<Omit<Product, "code" | "name" | "createdAt" | "updatedAt">>;

export type UpdateProductInput = {
  code: string;
  name: string;
} & Partial<Omit<Product, "id" | "code" | "name" | "createdAt" | "updatedAt">>;

export type ProductPaginatedResult = {
  data: Product[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type ProductInfiniteResult = InfiniteData<
  ProductPaginatedResult,
  number
>;
