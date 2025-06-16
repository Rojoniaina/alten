import {
  AddProductInput,
  ProductPaginatedResult,
  Product,
  UpdateProductInput,
} from "../models/product";

export interface ProductRepository {
  findAll(page: number, limit: number): Promise<ProductPaginatedResult>;
  create(data: AddProductInput): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByCode(code: string): Promise<Product | null>;
  update(id: string, data: UpdateProductInput): Promise<Product | null>;
  delete(id: string): Promise<Boolean | null>;
}
