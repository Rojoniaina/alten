import { ProductAlreadyExistsError } from "../domain/errors/productAlreadyExistsError";
import {
  CreateProductInput,
  Product,
  ProductPaginatedResult,
  UpdateProductInput,
} from "../domain/models/product";
import { ProductRepository } from "../domain/ports/product.repository";

export class ProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async getProducts(
    page: number,
    limit: number
  ): Promise<ProductPaginatedResult> {
    return this.repository.findAll(page, limit);
  }

  async getProduct(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    const existing = await this.repository.findByCode(data.code);

    if (existing) {
      throw new ProductAlreadyExistsError(data.code);
    }

    return this.repository.create(data);
  }

  async updateProduct(
    id: string,
    data: UpdateProductInput
  ): Promise<Product | null> {
    const existing = await this.repository.findByCode(data.code);

    if (existing && existing?.id.toString() !== id) {
      throw new ProductAlreadyExistsError(data.code);
    }

    return this.repository.update(id, data);
  }

  async deleteProduct(id: string): Promise<Boolean | null> {
    return this.repository.delete(id);
  }
}
