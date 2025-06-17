import { ProductImplRepository } from "../infrastructure/repositories/product-impl.repository";
import { ProductUseCase } from "../application/product.usecase";

const productRepository = new ProductImplRepository();
export const productServiceCase = new ProductUseCase(productRepository);
