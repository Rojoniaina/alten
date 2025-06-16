export enum INVENTORY_STATUS {
  INSTOCK = "INSTOCK",
  LOWSTOCK = "LOWSTOCK",
  OUTOFSTOCK = "OUTOFSTOCK",
}

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

export type AddProductInput = {
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
